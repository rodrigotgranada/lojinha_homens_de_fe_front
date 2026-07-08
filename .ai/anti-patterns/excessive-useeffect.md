# Granada Anti-Patterns: Excessive and Misused UseEffect

Este documento define os padrões oficiais de refatoração, contraexemplos práticos de sincronização, riscos de concorrência e diretrizes de engenharia para erradicar o uso excessivo e incorreto do hook `useEffect` em toda a plataforma.

O abuso do `useEffect` para gerenciar fluxos de dados imperativos é tratado como uma grave falha de arquitetura e performance.

O objetivo deste documento não é simplesmente desencorajar o uso do hook.

O objetivo é evitar:
* renderizações duplicadas (dual-renders) que causam oscilação visual e lentidão na UI
* loops infinitos de renderização causados por ciclos fechados de dependências reativas
* condições de corrida (race conditions) em requisições de rede assíncronas soltas
* código espaguete imperativo onde o fluxo de dados se torna imprevisível e difícil de rastrear
* vazamentos de memória (memory leaks) por falta de limpeza de listeners globais
* AI-friendly pipelines puros, baseados em transformações declarativas e handlers explícitos

O ciclo de vida dos componentes deve ser limpo, previsível e orientado a eventos ou estados derivados puros.

---

# A Anatomia do Antipadrão

O `useEffect` foi projetado para sincronizar o componente com sistemas externos (efeitos colaterais fora do controle do React, como timers, websockets ou manipuladores manuais do DOM).

Utilizá-lo para sincronizar estados internos do React ou para orquestrar fluxos lógicos de negócio é um desvio de finalidade que quebra o modelo mental declarativo do React 19.

A complexidade no React moderno deve ser resolvida na origem dos eventos ou por meio de computação computacional pura (Derived State).

Evite escrever componentes que dependem de uma cadeia de efeitos colaterais em cascata para atingir o estado final estável.

---

# Cenário Proibido 1: Cálculo de Estado Derivado (Derived State)

O exemplo abaixo retrata um erro clássico: criar um estado local redundante e usar um efeito para recalculá-lo quando as propriedades mudam, forçando o React a renderizar a tela duas vezes seguidas para cada atualização.

```tsx
// FORBIDDEN - O desastre do estado derivado via efeito (Gera renderizações duplas e lag)
import { useState, useEffect } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface MetricItem { id: string; val: number; label: string; }

export const MetricsDataList = ({ items }: { items: MetricItem[] }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<MetricItem[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  // Falha Crítica: Efeito disparando re-renderização pós-atualização de props/state
  useEffect(() => {
    const filtered = items.filter(item => item.label.includes(filterText));
    setFilteredItems(filtered);
  }, [items, filterText]);

  // Segunda Falha: Efeito encadeado calculando métricas de forma imperativa
  useEffect(() => {
    const sum = filteredItems.reduce((acc, item) => acc + item.val, 0);
    setTotalSum(sum);
  }, [filteredItems]);

  return (
    <Box>
      <Input value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      <Text>Soma Total: {totalSum}</Text>
    </Box>
  );
};
```

---

# Código Corrigido via Computação Declarativa Pura

Remova os estados redundantes e os efeitos completamente. Se o cálculo for leve, execute-o inline durante o ciclo de renderização normal. Se for pesado, isole com `useMemo`. O React 19 otimiza a árvore de forma síncrona instantânea.

```tsx
// PREFERRED - Cálculo síncrono limpo, sem efeitos ou estados redundantes
import { useState, useMemo } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface MetricItem { id: string; val: number; label: string; }

export const MetricsDataList = ({ items }: { items: MetricItem[] }) => {
  const [filterText, setFilterText] = useState('');

  // Solução: O estado filtrado é derivado em tempo real de forma declarativa
  const filteredItems = useMemo(() => {
    return items.filter(item => item.label.toLowerCase().includes(filterText.toLowerCase()));
  }, [items, filterText]);

  // A soma é calculada instantaneamente a partir do dado derivado anterior
  const totalSum = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + item.val, 0);
  }, [filteredItems]);

  return (
    <Box className="gr-metrics-container">
      <Input value={filterText} onChange={(e) => setFilterText(e.target.value)} placeholder="Filtrar..." />
      <Text color="fg.primary" fontWeight="bold">Soma Total: {totalSum}</Text>
    </Box>
  );
};
```

---

# Cenário Proibido 2: Disparar Ações baseadas em Mudanças de Estado

Não use `useEffect` como um "ouvinte" de estados locais para disparar callbacks lógicos. Ações de negócio devem ser disparadas explicitamente a partir do evento que causou a modificação (Event Handlers).

```tsx
// FORBIDDEN - Efeito agindo de forma invisível/reativa para disparar lógica de negócio
export const SettingsPanel = () => {
  const [isPremiumChecked, setIsPremiumChecked] = useState(false);

  // Falha Crítica: Usa efeito para reagir à mudança de estado local e disparar API/Log
  useEffect(() => {
    if (isPremiumChecked) {
      analyticsService.logFeatureGate('premium_view_triggered');
      notificationInfrastructure.dispatchToast('Premium Mode Active');
    }
  }, [isPremiumChecked]);

  return (
    <Switch 
      checked={isPremiumChecked} 
      onChange={(e) => setIsPremiumChecked(e.target.checked)} 
    />
  );
};
```

---

# Código Corrigido via Explicit Event Handler

Aloque os gatilhos lógicos colaterais diretamente no manipulador de evento que originou o clique do usuário. Isso torna o fluxo de dados linear, fácil de depurar e previne disparos falsos durante a montagem do componente.

```tsx
// PREFERRED - Fluxo de controle explícito e previsível orientado a eventos
export const SettingsPanel = () => {
  const [isPremiumChecked, setIsPremiumChecked] = useState(false);

  // Solução: A lógica de negócio executa em resposta clara à ação do operador
  const handleToggleChange = (checked: boolean) => {
    setIsPremiumChecked(checked);
    
    if (checked) {
      analyticsService.logFeatureGate('premium_view_triggered');
      notificationInfrastructure.dispatchToast('Premium Mode Active');
    }
  };

  return (
    <Switch 
      checked={isPremiumChecked} 
      onCheckedChange={(details) => handleToggleChange(details.checked)} 
    />
  );
};
```

---

# Cenário Proibido 3: Sincronização de Estado via Props sem Chaves

Evite resetar estados locais monitorando IDs externos dentro de um efeito. Isso faz o componente renderizar com o estado velho, perceber a mudança, disparar o efeito e renderizar novamente com o estado limpo, gerando oscilações visuais drásticas.

```tsx
// FORBIDDEN - Efeito limpando estado de forma tardia (Gera vazamento de estado e oscilação)
export const UserDetailForm = ({ userId }: { userId: string }) => {
  const [comment, setComment] = useState('');

  // Falha Crítica: Quando o userId muda, o comentário antigo sobrevive até o efeito rodar
  useEffect(() => {
    setComment('');
  }, [userId]);

  return <Textarea value={comment} onChange={e => setComment(e.target.value)} />;
};
```

---

# Código Corrigido via Reset de Chave Reativa (React Keys)

Em vez de sincronizar manualmente via efeito, instrua o React a destruir e remontar o componente de forma limpa utilizando o atributo nativo `key`. Quando a `key` muda, o React reseta todo o estado interno instantaneamente e de forma síncrona, eliminando estados fantasmas.

```tsx
// PREFERRED - Reset de estado nativo, seguro e instantâneo via propriedades de chave
export const UserDashboardWorkspace = ({ activeUserId }: { activeUserId: string }) => {
  // Solução: Ao mudar a chave, o formulário interno é totalmente reinicializado pelo React
  return <UserDetailForm key={activeUserId} userId={activeUserId} />;
};

const UserDetailForm = ({ userId }: { userId: string }) => {
  const [comment, setComment] = useState('');
  return <Textarea value={comment} onChange={e => setComment(e.target.value)} />;
};
```

---

# Critérios Mandatórios de Eliminação

Antes de aceitar a introdução de um `useEffect`, a solução deve esgotar estas 4 alternativas técnicas:
1. **O dado pode ser calculado em tempo de renderização?** Se sim, derive a variável diretamente ou use `useMemo`.
2. **A ação é disparada por um clique, digitação ou submissão?** Se sim, mova a lógica para dentro do manipulador do Evento (`onClick`, `onSubmit`).
3. **O objetivo é limpar ou resetar um componente interno?** Se sim, injete um identificador dinâmico na propriedade `key`.
4. **O objetivo é buscar dados de rede ou mutar cache?** Se sim, o uso de `useQuery` ou `useMutation` do TanStack Query é inegociável (conforme `.ai/rules/no-inline-fetch.md`).

---

# Escopos Permitidos para UseEffect

O hook `useEffect` é estritamente restrito a interações com APIs nativas do navegador ou sistemas de terceiros sem bindings declarativos:
* Configuração de conexões de Eventos de Redes persistentes (WebSockets, Firebase Realtime listeners).
* Inicialização, binding e limpeza (cleanup) de manipuladores de eventos globais (`window.addEventListener('resize')`).
* Integração manual com bibliotecas imperativas externas que exigem referências diretas ao DOM (`canvas` complexos, players de vídeo proprietários).
* Sincronização manual de coordenadas de posicionamento para overlays customizados que fogem do escopo do Chakra UI v3.

---

# Regra de Cleanup Obrigatória

Todo `useEffect` permitido que instancie um listener, assinatura, temporizador ou conexão de rede externa deve, obrigatoriamente, retornar uma função de limpeza (`cleanup function`).

```typescript
// PREFERRED - Padrão de limpeza mandatório para evitar memory leaks
useEffect(() => {
  const handleGlobalClick = (event: MouseEvent) => { ... };
  window.addEventListener('click', handleGlobalClick);
  
  // Função de cleanup explícita
  return () => {
    window.removeEventListener('click', handleGlobalClick);
  };
}, []);
```

---

# Diretrizes para a IA Engine (Effect Execution Guard)

A IA está expressamente proibida de gerar arquivos de visualização contendo efeitos colaterais para sincronização de estados derivados, filtragens locais de vetores ou controle de gatilhos de formulários.

Se a IA detectar a necessidade de recalcular dados baseados em mudanças de estados paralelos, ela deve, por padrão, escrever expressões de atribuição direta síncrona ou estruturar ganchos `useMemo` limpos. 

A IA nunca deve gerar um efeito imperativo com o pretexto de "simplificar" o fluxo de desenvolvimento do chat.

---

# Resumo de Padrões Proibidos (Effect Summary)

Evite categoricamente:
* Setters de estado local (`setVariable`) operados de dentro de um efeito sem barreira externa.
* Matrizes de dependências vazias (`[]`) que ocultam variáveis omitidas de forma proposital para ignorar alertas do compilador.
* Efeitos encadeados de forma linear (Efeito A atualiza Estado B, que dispara Efeito C, que atualiza Estado D).
* Chamadas de mutação ou invalidação de cache do TanStack Query injetadas soltas dentro do ciclo de vida de montagem.

---

# Padrão Arquitetural Esperado

Priorize arquiteturas onde os componentes fluam de maneira linear, orientados a eventos explícitos disparados pelas mãos do operador e transformações de dados puramente síncronas que respeitam o pipeline de renderização nativo do React 19.

A eliminação de re-renderizações espúrias garante o desempenho premium da nossa plataforma SaaS Enterprise.