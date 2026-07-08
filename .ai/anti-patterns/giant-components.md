# Granada Anti-Patterns: Giant Monolithic Components

Este documento define os padrões oficiais de refatoração, contraexemplos práticos, métricas de degradação e diretrizes estruturais para erradicar o antipadrão de Componentes Gigantes (Giant Monolithic Components) em toda a plataforma.

O acúmulo excessivo de linhas de código e responsabilidades em um único arquivo é tratado como uma falha crítica de engenharia.

O objetivo deste documento não é apenas manter os arquivos visualmente limpos.

O objetivo é evitar:
* degradação cognitiva (mental fatigue) durante a leitura e manutenção do código
* re-renderizações em cascata que destroem a performance em tempo de execução
* acoplamento destrutivo entre requisições de rede, validações e marcação visual
* testes unitários impossíveis devido à falta de isolamento de escopo
* alucinações e perda de precisão contextual por parte da IA ao ler arquivos extensos

Qualquer estrutura de interface que viole as restrições de granularidade molecular deve ser agressivamente decomposta.

---

# A Anatomia do Antipadrão

O antipadrão do componente gigante ocorre quando um único arquivo `.tsx` assume múltiplas camadas da arquitetura.

Geralmente, um componente classificado como gigante tenta resolver simultaneamente:
* gerenciamento de estados locais múltiplos e descorrelacionados
* chamadas de rede cruas ou orquestração direta de cache (TanStack Query)
* esquemas de validação de dados e regras de submissão de formulários
* estruturas complexas de modais, drawers e overlays na mesma hierarquia
* árvores JSX profundamente aninhadas com mais de 4 níveis de indentação

Evite centralizar fluxos operacionais distintos dentro de uma única barreira de arquivo.

---

# Cenário Proibido (The Monolithic Disaster)

O bloco de código a seguir exemplifica o antipadrão absoluto: um arquivo massivo que mistura infraestrutura, formulários, overlays e tabelas em um único nó estrutural.

```tsx
// FORBIDDEN - O desastre monolítico absoluto (Mistura de escopos e violação de regras)
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/query';
import { Box, Flex, Button, Input, Table, Modal, Text, Toast } from '@chakra-ui/react';

export const CustomerDashboardManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', tier: 'free' });
  const [formError, setFormError] = useState('');

  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers', searchTerm],
    queryFn: () => fetch(`/api/customers?search=${searchTerm}`).then(res => res.json())
  });

  const mutation = useMutation({
    mutationFn: (newCustomer) => fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(newCustomer)
    }).then(res => res.json())
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      setFormError('E-mail inválido');
      return;
    }
    mutation.mutate(formData as any);
    setIsOpen(false);
  };

  if (isLoading) return <Box>Carregando...</Box>;
  if (error) return <Box>Erro ao carregar dados</Box>;

  return (
    <Box p={6} width="100%">
      <Flex justify="space-between" mb={4}>
        <Input 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Buscar cliente..." 
        />
        <Button onClick={() => setIsOpen(true)}>Adicionar Cliente</Button>
      </Flex>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>E-mail</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers?.map((customer: any) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.email}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => { setSelectedCustomer(customer); setIsOpen(true); }}>
                  Editar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box p={6} bg="white">
          <Text size="xl" mb={4}>Gerenciar Cliente</Text>
          <form onSubmit={handleFormSubmit}>
            <Input 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              placeholder="Nome"
              mb={2} 
            />
            <Input 
              value={formData.email} 
              onChange={e => setFormData({ ...formData, email: e.target.value })} 
              placeholder="E-mail"
              mb={2} 
            />
            {formError && <Text color="red">{formError}</Text>}
            <Button type="submit" loading={mutation.isPending}>Salvar</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
```

---

# Análise de Degradação de Código

O exemplo `CustomerDashboardManager` quebra 8 regras mandatórias do nosso manifesto de arquitetura:
1. Violação do limite de linhas: centraliza infraestrutura e visão num único bloco vertical.
2. Injeção de `any`: aniquila o sistema de tipos estrito do TypeScript.
3. Requisições Inline: ignora o contrato centralizado do TanStack Query e o isolamento de serviços.
4. Gerenciamento Manual de Formulários: utiliza `useState` repetitivos para inputs, forçando re-renderizações globais na tela a cada caractere digitado.
5. Violação de UX Assíncrona: exibe uma tela estroboscópica de "Carregando..." genérica em vez de um Skeleton molecular estável.
6. Falta de Acessibilidade: modais e inputs carecem de bindings semânticos, mapeamento de ID e ARIA attributes.
7. Tratamento de Erros Falho: não possui isolamento por Error Boundaries contextuais.
8. Componentização Inexistente: acopla a listagem, o formulário e a lógica de controle no mesmo nó.

---

# O Padrão de Refatoração: Decomposição Molecular

Para corrigir o antipadrão, dividimos o monólito em uma árvore de subarquivos isolados, respeitando rigorosamente a arquitetura orientada a features do projeto.

A estrutura de pastas resultante deve seguir o padrão:
```txt
customer-management/
├── types/
│   └── index.ts
├── hooks/
│   ├── useCustomerDashboard.ts
│   └── useCustomerMutation.ts
├── semantic/
│   ├── CustomerTable.tsx
│   ├── CustomerActionToolbar.tsx
│   └── CustomerFormDrawer.tsx
└── index.tsx (View Orchestrator)
```

---

# Passo 1: O Contrato de Tipos (`types/index.ts`)

Defina os contratos estritos de dados de forma isolada, impedindo o vazamento de tipos genéricos e removendo qualquer dependência do operador `any`.

```typescript
// PREFERRED - Contrato de domínio estrito
export type CustomerTier = 'free' | 'premium' | 'enterprise';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  tier: CustomerTier;
  createdAt: string;
}

export interface CustomerDashboardState {
  searchTerm: string;
  isDrawerOpen: boolean;
  activeCustomer: CustomerProfile | null;
}
```

---

# Passo 2: O Gancho de Orquestração Logística (`hooks/useCustomerDashboard.ts`)

Isole completamente o estado reativo da interface, as interações de paginação/busca e o consumo do cache em um Custom Hook dedicado. A interface visual deve se manter puramente passiva.

```typescript
// PREFERRED - Abstração completa de estado e consultas de rede
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CustomerProfile } from '../types';
import { customerService } from '@/infrastructure/services/customer';
import { customerKeys } from '@/infrastructure/keys/customer';

export const useCustomerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<CustomerProfile | null>(null);

  const { data: customers, isLoading, error, refetch } = useQuery<CustomerProfile[], Error>({
    queryKey: customerKeys.list(searchTerm),
    queryFn: () => customerService.fetchCollection({ search: searchTerm }),
  });

  const openCreateMode = () => {
    setActiveCustomer(null);
    setIsDrawerOpen(true);
  };

  const openEditMode = (customer: CustomerProfile) => {
    setActiveCustomer(customer);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setActiveCustomer(null);
    setIsDrawerOpen(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    isDrawerOpen,
    activeCustomer,
    customers,
    isLoading,
    error,
    refetch,
    openCreateMode,
    openEditMode,
    closeDrawer,
  };
};
```

---

# Passo 3: O Componente Semântico Isolado (`semantic/CustomerTable.tsx`)

Extraia a interface da tabela. Ela deve receber apenas dados limpos (data injection) e funções de callback simples. Isso garante isolamento de renderização absoluto para o grid de dados.

```tsx
// PREFERRED - Apresentação limpa, tipada e com acessibilidade garantida
import { Table, Button, Badge, HStack } from '@chakra-ui/react';
import { CustomerProfile } from '../types';

interface CustomerTableProps {
  collection: CustomerProfile[];
  onEditSelect: (customer: CustomerProfile) => void;
}

export const CustomerTable = ({ collection, onEditSelect }: CustomerTableProps) => {
  return (
    <Table.Root size="sm" variant="line" interactive aria-label="Listagem de clientes ativos">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader scope="col">Cliente</Table.ColumnHeader>
          <Table.ColumnHeader scope="col">E-mail</Table.ColumnHeader>
          <Table.ColumnHeader scope="col">Plano</Table.ColumnHeader>
          <Table.ColumnHeader scope="col" textAlign="right">Ações</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {collection.map((customer) => (
          <Table.Row key={customer.id}>
            <Table.Cell fontWeight="medium">{customer.name}</Table.Cell>
            <Table.Cell color="fg.muted">{customer.email}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={customer.tier === 'enterprise' ? 'purple' : 'blue'}>
                {customer.tier}
              </Badge>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <HStack gap={2} justify="flex-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEditSelect(customer)}
                  aria-label={`Editar perfil de ${customer.name}`}
                >
                  Editar
                </Button>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
```

---

# Passo 4: O Orquestrador de Visão de Alto Nível (`index.tsx`)

O arquivo principal da Feature torna-se um coordenador declarativo levíssimo. Ele não calcula regras de negócio nem manipula formulários; ele apenas conecta o Custom Hook aos componentes semânticos isolados.

```tsx
// PREFERRED - Orquestração puramente declarativa e limpa (Abaixo de 50 linhas)
import { Box, VStack } from '@chakra-ui/react';
import { CustomerActionToolbar } from './semantic/CustomerActionToolbar';
import { CustomerTable } from './semantic/CustomerTable';
import { CustomerFormDrawer } from './semantic/CustomerFormDrawer';
import { CustomerDashboardSkeleton } from './variants/CustomerDashboardSkeleton';
import { ComponentErrorBoundary } from '@/components/base/ComponentErrorBoundary';
import { useCustomerDashboard } from './hooks/useCustomerDashboard';

export const CustomerDashboardView = () => {
  const {
    searchTerm,
    setSearchTerm,
    isDrawerOpen,
    activeCustomer,
    customers,
    isLoading,
    error,
    refetch,
    openCreateMode,
    openEditMode,
    closeDrawer,
  } = useCustomerDashboard();

  if (isLoading) return <CustomerDashboardSkeleton />;

  return (
    <ComponentErrorBoundary onRetry={refetch} error={error}>
      <Box className="gr-feature-viewport" p={{ base: 4, md: 6 }} width="100%">
        <VStack gap={4} align="stretch">
          <CustomerActionToolbar 
            searchString={searchTerm} 
            onSearchChange={setSearchTerm} 
            onActionTrigger={openCreateMode} 
          />
          <CustomerTable 
            collection={customers ?? []} 
            onEditSelect={openEditMode} 
          />
          <CustomerFormDrawer 
            initialContext={activeCustomer} 
            isOpen={isDrawerOpen} 
            onCloseTrigger={closeDrawer} 
            onMutationSuccess={refetch}
          />
        </VStack>
      </Box>
    </ComponentErrorBoundary>
  );
};
```

---

# Regras de Alocação e Tamanho Máximo

Para blindar o sistema contra o crescimento desordenado de arquivos, a IA e o desenvolvedor devem seguir estes limites rígidos:
* Nenhum arquivo de componente funcional `.tsx` deve ultrapassar **250 linhas** de código.
* Se um componente acumular mais de **3 sub-estados reativos** via `useState`, eles devem ser unificados em um redutor ou extraídos para um Custom Hook.
* Sub-estruturas de renderização interna (ex: funções `renderHeader()`, `renderItem()`) escritas dentro do mesmo arquivo de visualização são proibidas. Extraia-as para componentes isolados.

---

# Diretrizes para a IA Engine (Anti-Hallucination Guard)

Quando instruída a gerar uma tela, funcionalidade ou fluxo de CRUD complexo, a IA está terminantemente proibida de entregar o código unificado em uma única resposta textual longa.

A IA deve, obrigatoriamente:
1. Dividir a geração em ciclos lógicos sequenciais.
2. Declarar primeiramente os contratos TypeScript e esquemas de validação Yup.
3. Emitir de forma independente a lógica de infraestrutura e gerenciamento de estado (Ganchos/Hooks).
4. Fornecer os blocos de marcação visual semânticos altamente focados e atomicamente decompostos.

---

# Resumo de Padrões Proibidos (Monolith Summary)

Evite categoricamente:
* Arquivos únicos que operam formulários, tabelas e chamadas de rede simultaneamente.
* Embutir ganchos do TanStack Query (`useQuery`, `useMutation`) diretamente no meio de layouts complexos de tabelas ou dashboards.
* Aninhamentos JSX profundos que obscurecem o fluxo lógico de leitura estrutural da interface.
* Acoplamento de componentes auxiliares de overlays (Modais/Drawers) diretamente no nó pai do painel principal de exibição de dados.

---

# Padrão Arquitetural Esperado

Dê total preferência para códigos que se comportem como uma malha molecular de pequenos blocos independentes, auto-documentados, passivos e focados em cumprir estritamente uma única diretriz lógica ou visual.

A separação horizontal rígida preserva a escalabilidade contínua da plataforma SaaS Enterprise.