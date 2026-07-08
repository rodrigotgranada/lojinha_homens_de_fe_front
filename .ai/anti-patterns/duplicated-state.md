# Granada Anti-Patterns: Duplicated and Redundant Local States

Este documento define os padrões de refatoração, contraexemplos práticos de engenharia, regras de sincronização síncrona e diretrizes estruturais para erradicar o antipadrão de Estado Duplicado ou Redundante (Duplicated and Redundant Local States) em toda a plataforma.

O armazenamento local de dados que podem ser calculados síncronamente a partir de estados já existentes é tratado como uma falha grave de arquitetura.

O objetivo deste documento não é apenas reduzir o consumo de memória do cliente.

O objetivo é evitar:
* dessincronização de interface (state drift) onde a tela exibe informações contraditórias
* re-renderizações em cascata e obsolescência de dados em redes ou interações rápidas
* complexidade desnecessária com múltiplos gatilhos de atualização (`useState` e `useEffect` combinados)
* bugs de ciclo de vida onde sub-estados retêm valores antigos (stale values) após o reset do estado pai
* AI-friendly predictable state graphs baseados estritamente no conceito de estado derivado puro (Derived State)

A interface deve computar dinamicamente suas ramificações visuais a partir da menor representação de estado possível.

---

# A Anatomia do Antipadrão

O antipadrão de estado duplicado ocorre quando um engenheiro cria uma variável de `useState` para reter o resultado de uma operação (como uma contagem, uma filtragem, uma validação ou uma busca de item) realizada sobre outro estado primário.

No React 19, criar estados redundantes força o desenvolvedor a gerenciar manualmente a sincronização de ambos os nós de dados. 

Sempre que o estado primário muda, o estado secundário precisa ser atualizado explicitamente (seja em manipuladores de eventos ou via efeitos colaterais), abrindo margem para esquecimentos e falhas críticas de consistência visual.

Evite armazenar em estados locais qualquer valor que possa ser deduzido em tempo de execução através de cálculos síncronos simples.

---

# Cenário Proibido (The Redundant State Nightmare)

O exemplo abaixo retrata a falha arquitetural: um componente de gerenciamento de membros que cria estados locais específicos para armazenar a lista filtrada, a contagem de itens selecionados e o status de validação do lote, sincronizando tudo de forma frágil.

```tsx
// FORBIDDEN - O pesadelo do estado duplicado (Dessincronização massiva e código imperativo)
import { useState, useEffect } from 'react';
import { Box, Input, Checkbox, Text, VStack, Button } from '@chakra-ui/react';

interface Member { id: string; name: string; role: string; }

export const TeamManagerGrid = ({ members }: { members: Member[] }) => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Falhas Críticas: Criação de estados locais redundantes e duplicados
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isBulkActionAllowed, setIsBulkActionAllowed] = useState(false);

  // Efeito 1: Sincroniza a filtragem de forma reativa tardia
  useEffect(() => {
    setFilteredMembers(
      members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [members, search]);

  // Efeito 2: Sincroniza a contagem duplicando a informação do tamanho do array
  useEffect(() => {
    setSelectedCount(selectedIds.length);
  }, [selectedIds]);

  // Efeito 3: Sincroniza a validação lógica baseada em regras de negócio
  useEffect(() => {
    setIsBulkActionAllowed(selectedIds.length > 0 && search === '');
  }, [selectedIds, search]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <VStack align="stretch" gap={4}>
      <Input value={search} onChange={e => setSearch(e.target.value)} />
      <Text>Selecionados: {selectedCount}</Text>
      
      {filteredMembers.map(member => (
        <Box key={member.id} p={3} border="1px solid">
          <Checkbox 
            checked={selectedIds.includes(member.id)} 
            onCheckedChange={() => handleToggleSelect(member.id)}
          >
            {member.name} - {member.role}
          </Checkbox>
        </Box>
      ))}

      <Button disabled={!isBulkActionAllowed}>Remover em Massa</Button>
    </VStack>
  );
};
```

---

# Análise de Degradação de Código

O componente `TeamManagerGrid` insere riscos sistêmicos na UI por 4 motivos operacionais:
1. Renderizações Triplas: Quando o usuário digita uma letra no campo de busca, o React renderiza a tela para processar o `setSearch`. Em seguida, o `useEffect` 1 percebe a mudança e dispara o `setFilteredMembers`, gerando a segunda renderização. O `useEffect` 3 percebe a atualização e dispara o `setIsBulkActionAllowed`, executando a terceira renderização em milissegundos.
2. Estado Fantasma (Stale State): Durante a primeira renderização do ciclo acima, a tabela mapeia o array `filteredMembers` velho com o `search` novo, exibindo dados inconsistentes por uma fração de tempo.
3. Complexidade de Refatoração: Se a regra para permitir a ação em massa mudar (ex: administradores não podem ser removidos), o engenheiro precisará modificar o efeito colateral interno e garantir que todas as variáveis de dependência estejam mapeadas perfeitamente.
4. Sobrecarga Cognitiva para a IA: O agente de IA precisa ler e monitorar 3 fluxos de efeitos assíncronos locais para entender uma regra que deveria ser uma linha de lógica pura.

---

# O Padrão de Refatoração: Estado Derivado Síncrono (Derived State Pattern)

Para corrigir o antipadrão, eliminamos completamente os ganchos de `useState` secundários e seus respectivos `useEffect`. 

Os cálculos de filtragem, contagem e validação passam a ser executados de forma síncrona diretamente no corpo da função de renderização. Se as operações sobre o array forem computacionalmente pesadas, protegemos o pipeline utilizando o gancho `useMemo` nativo do React.

---

# Código Corrigido via Estado Derivado Puro

```tsx
// PREFERRED - Arquitetura de estado derivado síncrono (Zero useEffect, performance instantânea)
import { useState, useMemo } from 'react';
import { Box, Input, Checkbox, Text, VStack, Button } from '@chakra-ui/react';

interface Member { id: string; name: string; role: string; }

export const TeamManagerGrid = ({ members }: { members: Member[] }) => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Solução 1: A filtragem é calculada em tempo real síncrono (derivada do estado base)
  const filteredMembers = useMemo(() => {
    const formattedSearch = search.trim().toLowerCase();
    if (!formattedSearch) return members;
    return members.filter(m => m.name.toLowerCase().includes(formattedSearch));
  }, [members, search]);

  // Solução 2: A contagem é uma propriedade direta e síncrona do tamanho do array base
  const selectedCount = selectedIds.length;

  // Solução 3: A validação de negócio é uma constante booleana calculada no ciclo atual
  const isBulkActionAllowed = selectedCount > 0 && search.trim() === '';

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <VStack align="stretch" gap={4} className="gr-feature-workspace">
      <Input 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Buscar membro do time..." 
      />
      <Text color="fg.muted" fontSize="sm">Selecionados: **{selectedCount}**</Text>
      
      {filteredMembers.map((member) => (
        <Box 
          key={member.id} 
          p={3} 
          bg="bg.surface" 
          border="1px solid" 
          borderColor="border.subtle" 
          borderRadius="md"
        >
          <Checkbox 
            checked={selectedIds.includes(member.id)} 
            onCheckedChange={() => handleToggleSelect(member.id)}
          >
            {member.name} - {member.role}
          </Checkbox>
        </Box>
      ))}

      <Button 
        variant="solid" 
        colorPalette="red" 
        disabled={!isBulkActionAllowed}
      >
        Remover em Massa
      </Button>
    </VStack>
  );
};
```

---

# Regras Absolutas de Governança de Dados

Para blindar o desenvolvimento de interfaces na plataforma, aplicam-se as seguintes travas de engenharia:
* É terminantemente proibido criar variáveis de estado local para armazenar propriedades textuais de formatação de strings (ex: `const [formattedPrice, setFormattedPrice] = useState('')`). Formate o dado inline ou via utilitário seletor puro.
* É proibido duplicar referências ou cópias de objetos vindos do cache do TanStack Query em estados locais para mutação manual client-side. Utilize seletores ou manipule o cache global de forma explícita.
* Booleans de validação de submissão (ex: `isFormValid`, `isEmailValid`) nunca devem ser instanciados como estados. Devem ser expressões lógicas puras derivadas das estruturas do React Hook Form.

---

# Diretrizes para a IA Engine (Data Derivation Guard)

A IA está expressamente proibida de projetar componentes que utilizem ganchos de efeito colateral para atualizar estados locais em resposta a mudanças em outros estados locais ou propriedades recebidas.

Sempre que a IA precisar expor dados consolidados, agrupados, ordenados ou contabilizados, ela deve escrever atribuições constantes de computação síncrona no topo do componente visual. 

A IA deve priorizar o uso do `useMemo` para garantir que o diff de renderização permaneça extremamente performático e previsível.

---

# Resumo de Padrões Proibidos (Duplicated State Summary)

Evite categoricamente:
* Ganchos de `useState` cujos setters (`setValue`) sejam acionados exclusivamente de dentro de blocos `useEffect`.
* Inicializar variáveis de estado usando outras variáveis de estado locais como argumento de fallback inicial padrão, esperando que elas se atualizem sozinhas.
* Criar contadores numéricos avulsos para rastrear o volume de elementos inseridos em vetores que já expõem a propriedade `.length`.

---

# Padrão Arquitetural Esperado

Dê preferência absoluta a componentes que funcionem como funções puras de projeção visual: eles recebem uma semente mínima de estado mutável e derivam toda a complexidade analítica da tela de forma síncrona e instantânea durante o ciclo de renderização ativa.

A eliminação de estados redundantes blinda a consistência dos dados e garante a qualidade enterprise da nossa plataforma SaaS Premium.