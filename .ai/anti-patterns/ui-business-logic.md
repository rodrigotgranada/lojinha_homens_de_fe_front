# Granada Anti-Patterns: Business Logic Leakage Inside UI Layers

Este documento define os padrões de refatoração, contraexemplos práticos de acoplamento de domínio, riscos de vazamento de segurança e diretrizes de engenharia para erradicar o antipadrão de Regras de Negócio e Lógica de Domínio misturadas às camadas de Interface do Usuário (UI/JSX) da plataforma.

A presença de equações matemáticas, validações de privilégios ou transformações de políticas de negócio dentro de arquivos `.tsx` é tratada como uma falha crítica de isolamento arquitetural.

O objetivo deste documento não é apenas manter o arquivo visualmente legível.

O objetivo é evitar:
* impossibilidade de testes automatizados (headless unit testing) sobre algoritmos cruciais de negócio
* falhas e brechas de segurança (security leaks) devido à descentralização de checagens de permissão
* regressões em cascata na lógica comercial ao realizar ajustes puramente estéticos no layout visual
* perda de performance devido ao recálculo desnecessário de equações complexas a cada ciclo de renderização
* sobrecarga de contexto e desalinhamento estrutural nas manutenções automatizadas operadas por motores de IA

A camada visual deve se comportar como um terminal burro e passivo que simplesmente consome dados totalmente processados e os acopla aos tokens de design system.

---

# A Anatomia do Antipadrão

O antipadrão de Lógica de Negócio na UI ocorre quando um engenheiro decide embutir regras de governança corporativa, fórmulas de precificação, manipulação de permissões multi-tenant ou parses condicionais de faturamento diretamente no corpo de um componente visual ou dentro de chaves lógicas do JSX.

Na arquitetura Granada, o layout visual (`views/`, `components/`) não possui autoridade moral ou técnica para deduzir o que um dado significa comercialmente. 

Adicionar inteligência de negócio à apresentação acopla o frontend ao estado volátil das regras comerciais da empresa, bloqueando o reuso de componentes e espalhando gargalos de depuração por todo o repositório.

Evite escrever expressões matemáticas ou lógicas complexas para determinar regras de acesso ou valores comerciais dentro de nós de renderização.

---

# Cenário Proibido (The Domain-Polluted Component)

O exemplo abaixo retrata a falha arquitetural grave: um painel de faturamento (Billing Panel) que calcula taxas corporativas, aplica cupons de desconto progressivos com base no tier e valida permissões de segurança de forma manual e hardcoded dentro do JSX.

```tsx
// FORBIDDEN - Vazamento crítico de lógica de negócio na UI (Incompatível com testes e inseguro)
import { useState } from 'react';
import { Box, Text, Button, Badge, VStack } from '@chakra-ui/react';

interface SubscriptionContext {
  tier: 'free' | 'pro' | 'enterprise';
  basePrice: number;
  seatsUsed: number;
  couponCode: string | null;
  userRoles: string[];
}

export const WorkspaceBillingCard = ({ context }: { context: SubscriptionContext }) => {
  // Falha Crítica 1: Regra de segurança e privilégio exposta e hardcoded na UI
  const isAuthorizedToUpgrade = context.userRoles.includes('admin') || context.userRoles.includes('billing_manager');

  // Falha Crítica 2: Fórmula matemática comercial de faturamento calculada inline
  let finalPrice = context.basePrice * context.seatsUsed;
  
  if (context.tier === 'pro' && context.seatsUsed > 10) {
    finalPrice = finalPrice * 0.9; // 10% de desconto progressivo hardcoded
  } else if (context.tier === 'enterprise') {
    finalPrice = finalPrice * 0.8; // 20% de desconto corporativo
  }

  if (context.couponCode === 'GRANADA15') {
    finalPrice = finalPrice - 15; // Desconto nominal subtraído na camada visual
  }

  const finalFormattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Math.max(0, finalPrice));

  return (
    <Box p={5} bg="bg.panel" borderRadius="md" border="1px solid">
      <VStack align="stretch" gap={3}>
        <Text fontSize="lg" fontWeight="bold">Resumo da Assinatura</Text>
        
        {/* Falha Crítica 3: Lógica condicional de negócio misturada à renderização */}
        <Text>
          Preço Atual: <Box as="span" fontWeight="bold">{finalFormattedPrice}</Box>
        </Text>

        {context.seatsUsed > 50 && (
          <Badge colorPalette="orange">Uso de Alta Densidade Detectado</Badge>
        )}

        {isAuthorizedToUpgrade ? (
          <Button colorPalette="blue" onClick={() => triggerUpgradePipeline()}>
            Alterar Plano Corporativo
          </Button>
        ) : (
          <Text fontSize="xs" color="red.500">
            Apenas administradores podem gerenciar transações financeiras.
          </Text>
        )}
      </VStack>
    </Box>
  );
};
```

---

# Análise de Degradação de Código

O exemplo `WorkspaceBillingCard` insere vulnerabilidades técnicas e degrada o ecossistema SaaS por 4 motivos:
1. Impossibilidade de Testes Headless: Se o time financeiro precisar garantir que a fórmula de desconto progressivo para mais de 10 assentos funciona perfeitamente, será necessário instanciar toda a árvore de renderização do React e simular a renderização do componente de UI para ler o texto final na tela.
2. Fragilidade de Segurança: A lógica de privilégios (`userRoles.includes`) está dispersa. Se uma nova role for criada (ex: `finance_operator`), o engenheiro precisará varrer todos os arquivos `.tsx` do projeto caçando condicionais manuais para incluir a nova flag.
3. Desperdício de CPU: Toda vez que o componente re-renderizar por qualquer motivo estético externo, toda a árvore de multiplicações matemáticas e condicionais de strings será reexecutada do zero no thread principal.
4. Acoplamento de String: Formatações de internacionalização de moedas (`Intl.NumberFormat`) amarradas ao JSX impedem o reuso do componente em contextos multi-moeda (SaaS globalizado).

---

# O Padrão de Refatoração: Domain Selectors & Guard Hooks

Para expurgar as regras de negócio da UI, cravamos uma linha divisória rígida utilizando dois mecanismos desacoplados de infraestrutura:
1. **Pure Selectors / Domain Utilities (`selectors/`)**: Funções puras, matemáticas e determinísticas, totalmente independentes do ciclo de vida do React, encarregadas de realizar cálculos e formatações. Totalmente cobertas por testes unitários simples.
2. **Custom Access Hooks (`hooks/`)**: Centralizam as regras de controle de acesso, políticas multi-tenant e validações de papéis (roles), expondo apenas flags booleanas simplificadas para a UI.

---

# Passo 1: O Selector de Domínio Puro (`selectors/billing.ts`)

Encapsule todos os cálculos comerciais e formatações em funções puras escritas fora da árvore do React. Este arquivo pode ser testado instantaneamente via Jest/Vitest sem mockar nós visuais.

```typescript
// PREFERRED - Regras de negócio puras, matemáticas, isoladas e 100% testáveis
import { SubscriptionContext } from '../types';

export const computeWorkspaceInvoice = (context: SubscriptionContext): {
  numericTotal: number;
  formattedTotal: string;
  isHighDensity: boolean;
} => {
  let baseTotal = context.basePrice * context.seatsUsed;

  // Concentração unificada das regras comerciais de desconto progressivo
  if (context.tier === 'pro' && context.seatsUsed > 10) {
    baseTotal *= 0.9;
  } else if (context.tier === 'enterprise') {
    baseTotal *= 0.8;
  }

  if (context.couponCode === 'GRANADA15') {
    baseTotal -= 15;
  }

  const finalAmount = Math.max(0, baseTotal);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(finalAmount);

  return {
    numericTotal: finalAmount,
    formattedTotal,
    isHighDensity: context.seatsUsed > 50
  };
};
```

---

# Passo 2: O Gancho de Autorização Centralizado (`hooks/useWorkspaceAccess.ts`)

Isole as políticas de governança e segurança corporativa dentro de ganchos especializados que leem o estado global de permissões de forma centralizada.

```typescript
// PREFERRED - Centralização de políticas de privilégios corporativos
import { useSessionStore } from '@/infrastructure/stores/useSessionStore';

export const useWorkspaceAccess = () => {
  const { currentUser } = useSessionStore();

  const isBillingManager = currentUser.roles.includes('billing_manager');
  const isAdmin = currentUser.roles.includes('admin');

  const canManageBilling = isAdmin || isBillingManager;

  return {
    canManageBilling,
    userTier: currentUser.subscriptionTier
  };
};
```

---

# Passo 3: O Componente de Apresentação Passivo (`semantic/WorkspaceBillingCard.tsx`)

O componente visual agora atua estritamente como um mapeador estético limpo. Ele consome as respostas prontas das nossas tubulações analíticas e apenas decide quais tokens de cor e tipografia do Chakra UI v3 aplicar.

```tsx
// PREFERRED - Apresentação burra, passiva, performática e livre de equações comerciais
import { Box, Text, Button, Badge, VStack } from '@chakra-ui/react';
import { SubscriptionContext } from '../types';
import { computeWorkspaceInvoice } from '../selectors/billing';
import { useWorkspaceAccess } from '../hooks/useWorkspaceAccess';

export const WorkspaceBillingCard = ({ context }: { context: SubscriptionContext }) => {
  const { canManageBilling } = useWorkspaceAccess();
  
  // Executa o seletor puramente para extrair os dados totalmente lapidados
  const { formattedTotal, isHighDensity } = computeWorkspaceInvoice(context);

  return (
    <Box 
      p={5} 
      bg="bg.surface" 
      border="1px solid" 
      borderColor="border.subtle" 
      borderRadius="md"
      className="gr-billing-card-viewport"
    >
      <VStack align="stretch" gap={4}>
        <Text fontSize="lg" fontWeight="bold" color="fg.primary">Resumo da Assinatura</Text>
        
        <Text color="fg.secondary">
          Preço Atual: <Box as="span" fontWeight="bold" color="fg.primary">{formattedTotal}</Box>
        </Text>

        {isHighDensity && (
          <Badge colorPalette="orange" variant="subtle" selfAlign="flex-start">
            Uso de Alta Densidade Detectado
          </Badge>
        )}

        {canManageBilling ? (
          <Button variant="solid" colorPalette="blue" onClick={() => triggerUpgradePipeline()}>
            Alterar Plano Corporativo
          </Button>
        ) : (
          <Text fontSize="xs" color="fg.muted" bg="bg.muted" p={2} borderRadius="sm">
            Apenas administradores podem gerenciar transações financeiras.
          </Text>
        )}
      </VStack>
    </Box>
  );
};
```

---

# Regras Estritas de Divisão de Responsabilidades

Para garantir a higienização contínua das interfaces da plataforma, aplicam-se os seguintes vetos de engenharia:
* É proibido realizar operações aritméticas de multiplicação, divisão ou subtração (`*`, `/`, `-`) diretamente dentro de expressões curly braces `{}` do JSX para computar valores comerciais.
* É proibido injetar strings literais contendo identificadores de cupons de desconto, chaves de feature flags ou regras lógicas de planos direto em condicionais de tela.
* Checagens de strings de roles brutas (ex: `role === 'admin'`) são ilegais no nível de visualização. Elas devem ser empacotadas por hooks de capacidade funcional (ex: `const { canDeleteUser } = useUserPermissions()`).

---

# Diretrizes para a IA Engine (Domain Separation Guard)

A IA está explicitamente impedida de gerar arquivos `.tsx` que contenham qualquer tipo de processamento analítico de dados comerciais, equações financeiras ou validações manuais de vetores de privilégios.

Sempre que a funcionalidade solicitada envolver lógicas comerciais ou matemáticas, a IA deve, de maneira obrigatória e prioritária, criar a pasta ou arquivo correspondente na camada de `selectors/` ou `hooks/`, consolidar os algoritmos de domínio em funções puras extensamente documentadas e tipadas, e apenas referenciar o output final processado dentro do arquivo de marcação visual.

---

# Resumo de Padrões Proibidos (UI Business Logic Summary)

Evite categoricamente:
* Misturar chamadas de formatação de moedas e manipulações de datas complexas inline no JSX.
* Escrever matrizes lógicas de roles e permissões hardcoded espalhadas por múltiplos componentes de apresentação.
* Validar regras de negócio tributárias ou comerciais complexas de faturamento no mesmo escopo que opera botões do Chakra UI v3.
* Acoplar componentes visuais diretamente a estruturas brutas de resposta JSON de APIs sem passar por um mapeador ou seletor purificador.

---

# Padrão Arquitetural Esperado

Dê preferência absoluta a layouts de interface que operem como espelhos estáticos de fluxos analíticos externos: os dados chegam lapidados, calculados, validados e higienizados pelas camadas invisíveis de infraestrutura e seletores de domínio puros, restando à UI apenas o dever de renderizá-los com elegância.

O isolamento total das regras de negócio blinda as políticas comerciais e garante a resiliência corporativa da nossa plataforma SaaS Enterprise Premium.