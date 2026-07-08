# Playbook: Scaffold and Register a New Domain Feature Module

Este playbook define o ciclo de vida e a execução padronizada para desenvolvedores e agentes de IA ao estruturar e registrar módulos funcionais em nosso **SaaS B2B Moderno** (Next.js 15 App Router + React 19).

---

## 1. Topologia de Diretórios e Segmentação

A divisão de responsabilidades da infraestrutura obedece as seguintes zonas de roteamento:

* **Zonas de Autenticação (`src/app/(auth)/`)**: Para fluxos de login, recuperação de senhas, redefinições. Contêm layouts ultra-limpos (sem sidebar/header pesado).
* **Zonas Protegidas (`src/app/(private)/`)**: Core do negócio. Páginas exclusivas para usuários autenticados, com controle de sessão e autorização (ex: usuários, dashboard).
* **Zonas Públicas (`src/app/(public)/`)**: Landing pages corporativas ou catálogos públicos.
* **Componentes de Core (`src/components/base/` e `layout/`)**: Peças atômicas universais do UI v3 e estruturas como Header/Sidebar genéricos.
* **Módulos de Domínio (`src/features/[feature-name]/`)**: Onde a regra de negócio vive isolada.

---

## 2. Inicialização de um Novo Módulo Funcional

### Phase 2.1: Estruturação Interna da Feature
1. **Nomenclatura**: O nome do diretório deve seguir o padrão `kebab-case` sem exceções (ex: `user-profile`, `billing`, `inventory-audit`).
2. **Setup de Subpastas**: Inicialize as seguintes pastas dentro do domínio criado (`src/features/[feature-name]/`):
   - `components/`: Somente componentes de UI que dependem das regras do domínio. Subdivida por componente e use `index.ts`.
   - `hooks/`: Gerenciamento de estado, custom hooks, lógica combinada, data fetching (com useEffect/Axios nativo, dispensando react-query para tabelas padrão).
   - `services/`: Encapsulamento estrito das funções assíncronas do Axios, chamadas de rede e rotas de API.
   - `types/`: Assinaturas estritas em TypeScript. Contratos de request/response e payloads operacionais.

### Phase 2.2: Contrato de Tipagem (Interface Modeling)
A primeira escrita de código da feature deve ser o `types/index.ts`.
- **Proibido `any`**: O uso de tipagens genéricas como `any` resultará em reprovação no PR. Componentes visuais não podem receber payloads desestruturados complexos. Devem injetar props fortemente tipadas baseadas nestes contratos.

---

## 3. Public API Gatekeeper (Encapsulamento Estrito)

### Phase 3.1: Arquivo Barreira
1. Crie o arquivo barreira: `src/features/[feature-name]/index.ts`.
2. Exporte APENAS os contêineres principais da página (Ex: `export { UsersPageContainer } from './components/UsersPageContainer';`) e serviços ou hooks que de fato precisam ser invocados de fora.
3. Não "vaze" lógicas secundárias ou modais satélites.

---

## 4. Integração ao App Router (Skinny Pages)

### Phase 4.1: Construção de Rotas Enxutas
As páginas (arquivos `page.tsx`) dentro da pasta `app` funcionam estritamente como **roteadores burros** (Skinny Pages).
1. Aloque o arquivo `page.tsx` no grupo correto (ex: `src/app/(private)/users/page.tsx`).
2. Adicione diretivas como `export const dynamic = 'force-dynamic'` para garantir o opt-out de caches de build em painéis que mudam constantemente.
3. Importe o container mapeado pelo `index.ts` da feature.
4. **Sem Lógica**: O `page.tsx` jamais fará cálculos, states, fetches manuais, ou declarações de CSS. Sua única função é renderizar o `<FeatureContainer>` e repassar parâmetros de URL (searchParams).

---

## 5. Homologação Final (Review Criteria)

* **Limpeza de Arquivos**: Zero comentários não intencionais, sem restos de JSDoc inúteis. O código deve ser declarativo.
* **Estabilidade de Rota**: A navegação por abas ou retorno do navegador não pode "congelar" a página. (Reflita as melhores práticas do Playbook de Infraestrutura).
* **Compilação TS Strict**: Comando autonômo `npx tsc --noEmit` tem passagem obrigatória. Falhas tipográficas são intoleráveis na homologação.
