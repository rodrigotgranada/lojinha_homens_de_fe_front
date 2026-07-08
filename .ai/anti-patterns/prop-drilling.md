# Granada Anti-Patterns: Prop Drilling Chaos

Este documento define os padrões oficiais de refatoração, contraexemplos práticos de engenharia, mecanismos de mitigação de acoplamento e diretrizes de governança para erradicar o antipadrão de Prop Drilling em toda a plataforma.

A passagem em cascata de propriedades por múltiplos níveis da árvore de componentes é tratada como uma grave regressão arquitetural.

O objetivo deste documento não é apenas eliminar propriedades repetitivas na listagem de argumentos.

O objetivo é evitar:
* rigidez estrutural (structural rigidity) que impede a reorganização das árvores de layout
* poluição de assinaturas de componentes intermediários com parâmetros irrelevantes ao seu escopo
* refatorações massivas e suscetíveis a erros sempre que um contrato de dados profundo é alterado
* rastreamento de fluxo de dados (data tracing) excessivamente complexo e opaco dentro da IDE
* alucinações da IA causadas pela dispersão e repetição de propriedades ao longo de arquivos intermediários

O fluxo de dados deve ser cirúrgico, direto e acoplado estritamente aos nós que consomem a informação.

---

# A Anatomia do Antipadrão

O antipadrão de Prop Drilling ocorre quando um componente de alto nível retém um estado ou callback e o propaga verticalmente por componentes intermediários que não utilizam esses dados, servindo puramente como condutores mecânicos.

Esse cenário degrada severamente a Developer Experience (DX) e quebra o princípio de encapsulamento.

Componentes intermediários tornam-se reféns de contratos de dados de terceiros, impedindo sua reutilização em outras partes do ecossistema SaaS.

Evite transformar componentes de layout ou app-shells em transportadores cegos de estado.

---

# Cenário Proibido (The Drilling Cascade)

O exemplo abaixo retrata a falha crítica: parâmetros de controle do Workspace sendo empurrados manualmente através de camadas estruturais de navegação e layouts.

```tsx
// FORBIDDEN - A cascata destrutiva de propriedades (Poluição de escopo e acoplamento rígido)
import { Box, Flex, Text, Button } from '@chakra-ui/react';

interface Org { id: string; name: string; }

// Componente Top-Level que retém o estado
export const WorkspaceDashboardShell = () => {
  const activeOrg = { id: 'org-1', name: 'Granada Enterprise' };
  const handleOrgChange = (id: string) => console.log('Changed to:', id);

  return (
    <Box width="100vw" height="100vh">
      <MainAppLayout activeOrg={activeOrg} onOrgChange={handleOrgChange} />
    </Box>
  );
};

// Camada Intermediária 1: Layout Geral (Não usa os dados)
const MainAppLayout = ({ activeOrg, onOrgChange }: { activeOrg: Org; onOrgChange: (id: string) => void }) => {
  return (
    <Flex width="100%">
      <SidebarShell activeOrg={activeOrg} onOrgChange={onOrgChange} />
      <Box as="main">Conteúdo Principal</Box>
    </Flex>
  );
};

// Camada Intermediária 2: Sidebar Container (Não usa os dados)
const SidebarShell = ({ activeOrg, onOrgChange }: { activeOrg: Org; onOrgChange: (id: string) => void }) => {
  return (
    <Box width="260px" bg="bg.panel">
      <Text size="sm" color="fg.muted">Menu Global</Text>
      <OrganizationNavigationSection activeOrg={activeOrg} onOrgChange={onOrgChange} />
    </Box>
  );
};

// Camada Intermediária 3: Seção de Organizações (Não usa os dados)
const OrganizationNavigationSection = ({ activeOrg, onOrgChange }: { activeOrg: Org; onOrgChange: (id: string) => void }) => {
  return (
    <Box p={4}>
      <OrganizationSelector activeOrg={activeOrg} onOrgChange={onOrgChange} />
    </Box>
  );
};

// Nó Consumidor Final: O seletor real que precisa dos dados
const OrganizationSelector = ({ activeOrg, onOrgChange }: { activeOrg: Org; onOrgChange: (id: string) => void }) => {
  return (
    <Button onClick={() => onOrgChange('org-2')} variant="outline">
      {activeOrg.name}
    </Button>
  );
};
```

---

# Análise de Degradação de Código

O exemplo `WorkspaceDashboardShell` corrompe a estabilidade da plataforma por 4 motivos técnicos:
1. Acoplamento em Cadeia: Se o contrato da interface `Org` mudar para incluir uma nova propriedade mandatória, 5 assinaturas de funções diferentes precisarão ser editadas simultaneamente.
2. Destruição da Reutilização: O componente `SidebarShell` ou `MainAppLayout` não pode ser renderizado em uma página isolada ou fluxo de onboarding sem que dados falsos de organização sejam mockados.
3. Desperdício de Performance: Re-renderizações disparadas por alterações na organização forçam a avaliação desnecessária do diff do DOM virtual em toda a hierarquia intermediária.
4. Complexidade de Leitura: Torna impossível para a IA discernir se `MainAppLayout` possui dependências funcionais profundas com a organização ou se é apenas um canal passivo.

---

# Estratégia de Mitigação 1: Injeção por Composição (Component Composition)

Para estados puramente de layout ou estruturais, a melhor solução é inverter a responsabilidade utilizando a Composition API padrão do React. 

O componente de alto nível monta a árvore final e injeta o consumidor diretamente no slot correto via `children`, libertando as camadas intermediárias do contrato de propriedades.

---

# Código Corrigido via Composição

```tsx
// PREFERRED - Arquitetura baseada em slots e composição (Totalmente uncoupled)
import { Box, Flex, Button } from '@chakra-ui/react';

export const WorkspaceDashboardShell = () => {
  const activeOrg = { id: 'org-1', name: 'Granada Enterprise' };
  const handleOrgChange = (id: string) => console.log('Changed to:', id);

  return (
    <Box width="100vw" height="100vh">
      <MainAppLayout>
        <SidebarShell>
          <OrganizationNavigationSection>
            {/* O nó consumidor é injetado diretamente na raiz do fluxo */}
            <OrganizationSelector activeOrg={activeOrg} onOrgChange={handleOrgChange} />
          </OrganizationNavigationSection>
        </SidebarShell>
      </MainAppLayout>
    </Box>
  );
};

// Camada Intermediária 1: Totalmente limpa e agnóstica
const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex width="100%">
      {children}
      <Box as="main">Conteúdo Principal</Box>
    </Flex>
  );
};

// Camada Intermediária 2: Focada estritamente no seu papel visual
const SidebarShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="260px" bg="bg.panel" p={2}>
      {children}
    </Box>
  );
};

// Camada Intermediária 3: Isenta de contratos externos
const OrganizationNavigationSection = ({ children }: { children: React.ReactNode }) => {
  return <Box p={4}>{children}</Box>;
};

// Consumidor Final: Recebe dados limpos, mas agora o fluxo intermediário é reutilizável
const OrganizationSelector = ({ activeOrg, onOrgChange }: { activeOrg: any; onOrgChange: (id: string) => void }) => {
  return (
    <Button onClick={() => onOrgChange('org-2')} variant="outline">
      {activeOrg.name}
    </Button>
  );
};
```

---

# Estratégia de Mitigação 2: Gerenciamento de Estado Global Atômico (Zustand)

Para dados de estado de aplicação cruzados (cross-feature data), como sessões de usuário, seletores globais de workspace, configurações de tenant e flags de permissão, o uso de fatias reativas isoladas com Zustand é obrigatório.

Isso permite que o nó consumidor final realize o "data pulling" cirurgicamente em background, sem alertar ou re-renderizar a árvore de layout externa.

---

# Código Corrigido via Zustand Store

Crie a store de domínio isolada e consuma de forma atômica utilizando seletores estritos.

```typescript
// PREFERRED - infrastructure/stores/useWorkspaceStore.ts
import { create } from 'zustand';

interface WorkspaceState {
  activeOrgId: string;
  activeOrgName: string;
  changeOrganization: (id: string, name: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeOrgId: 'org-1',
  activeOrgName: 'Granada Enterprise',
  changeOrganization: (id, name) => set({ activeOrgId: id, activeOrgName: name }),
}));
```

```tsx
// PREFERRED - Consumo direto e cirúrgico no ponto de impacto visual
import { Button } from '@chakra-ui/react';
import { useWorkspaceStore } from '@/infrastructure/stores/useWorkspaceStore';

export const OrganizationSelector = () => {
  // O componente busca exclusivamente o que precisa. Zero prop drilling.
  const orgName = useWorkspaceStore((state) => state.activeOrgName);
  const changeOrg = useWorkspaceStore((state) => state.changeOrganization);

  return (
    <Button onClick={() => changeOrg('org-2', 'Granada Premium SaaS')} variant="outline">
      {orgName}
    </Button>
  );
};
```

---

# Limites Máximos de Profundidade

Para manter a integridade da malha de componentes, ficam estabelecidas as seguintes restrições estruturais:
* É terminantemente proibido passar a mesma propriedade manualmente por mais de **2 níveis consecutivos** de indentação na árvore de componentes.
* Se um dado cru precisar cruzar um terceiro nível de componente intermediário, a refatoração via **Composition API** ou extração para uma **Store Zustand / React Context** local é mandatória.
* Parâmetros globais de infraestrutura (ex: `theme`, `colorMode`, `authStatus`) nunca devem ser propagados via props.

---

# Diretrizes para a IA Engine (Context Guard)

Quando a IA estiver gerando layouts complexos ou painéis aninhados, ela deve priorizar a injeção de dependências por composição ou o consumo atômico de stores.

A IA está proibida de expandir assinaturas de componentes intermediários com propriedades de configuração de dados pertencentes a nós folhas (leaf nodes). 

Antes de adicionar uma propriedade a um componente de layout estrutural, a IA deve se perguntar: *"Este componente de layout opera estruturalmente este dado ou está apenas servindo de encanamento?"*. Se for encanamento, aplique injeção por `children`.

---

# Resumo de Padrões Proibidos (Drilling Summary)

Evite categoricamente:
* Passar objetos de dados de entidades de negócio complexas por dentro de wrappers de estilização (`Box`, `Flex`, `Grid`).
* Assinaturas de propriedades que contêm sufixos repetitivos repassados sequencialmente (ex: `props.sidebarProps.toolbarProps.buttonProps`).
* Criar contextos globais pesados e monolíticos do React nativo que forçam re-renderizações em massa na árvore inteira ao invés de usar seletores otimizados do Zustand.

---

# Padrão Arquitetural Esperado

Dê total preferência a componentes intermediários de casca pura (pure shells) que aceitem conteúdo via slots declarativos e componentes consumidores inteligentes que saibam capturar autonomamente seus gatilhos operacionais a partir das camadas de cache e estados globais.

A eliminação de tubulações manuais de dados preserva a elasticidade de refatoração do nosso ecossistema SaaS Enterprise Premium.