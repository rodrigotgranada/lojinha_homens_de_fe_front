# Playbook: Scaffold and Register a New Domain Feature Module

Este playbook define o ciclo de vida exato de execucao para desenvolvedores e agentes de IA ao criar um novo modulo de funcionalidade (feature) do zero.

---

## 1. Topologia de Distribuicao de Arquivos

Mapeamento de rotas e diretorios para segmentacao correta de responsabilidades na aplicacao:

* Caminho de Rota de Autenticacao: src/app/(auth)/ -> Destinado a paginas de fluxo de credenciais (login, forgot-password) contendo um layout ultra-limpo.
* Caminho de Rota Protegida (Privada): src/app/(private)/ -> Destinado a telas que exigem controle de acesso e autenticacao (ex: area administrativa).
* Caminho de Rota Livre (Publica): src/app/(public)/ -> Destinado a landing pages ou areas de acesso publico irrestrito.
* Pasta de Componentes Globais de Layout: src/components/layout/ -> Centraliza componentes estruturais compartilhados da aplicacao (ex: HeaderPrivate, HeaderPublic, Sidebar).
* Pasta de Componentes Globais Atomicos (Layer Base): src/components/base/ -> Componentes basicos de formulario, botoes e inputs.
* Pasta de Modulos Funcionais de Dominio: src/features/[feature-name]/ -> Todo o modulo de negocio isolado.

---

## Phase 1: Directory Setup & Structural Initialization

1. Nomeclatura Base: Normalize o identificador da feature para letras minusculas, separadas por hifen (ex: user-profile, billing, audit-logs).

2. Alocacao de Diretorios: Inicialize as quatro sub-pastas estruturais obrigatorias dentro do caminho padrao: src/features/[feature-name]/

3. Pasta de Componentes: src/features/[feature-name]/components/ -> Destinada a componentes semanticos e conteineres. Todos os elementos inseridos aqui devem adotar a Regra da Pasta Atomica Isolada (index.ts, arquivo .tsx e suite .test.tsx na mesma pasta).

4. Pasta de Hooks: src/features/[feature-name]/hooks/ -> Destinada a centralizar os hooks do TanStack Query (queries e mutations) e manipulacoes de estado local complexo.

5. Pasta de Services: src/features/[feature-name]/services/ -> Destinada a encapsular as chamadas diretas de rede, axios clients ou rotas de API REST isoladas do dominio.

6. Pasta de Types: src/features/[feature-name]/types/ -> Destinada a tipagens e interfaces estritas e imutaveis do TypeScript para o contrato com o back-end.

---

## Phase 2: Interface Modeling and Contract Definition

1. Modelagem de Dados Primaria: O primeiro arquivo a ser criado no ciclo de vida do modulo deve ser obrigatoriamente src/features/[feature-name]/types/index.ts.

2. Inversao de Dependencia Visual: E terminantemente proibido construir layouts ou tabelas recebendo propriedades genericas ou tipadas como any. Toda a interface visual deve herdar as tipagens declaradas no contrato de tipos do modulo.

---

## Phase 3: Public API Gatekeeper Formulation

1. Inicializacao do Gateway: Crie o arquivo index.ts diretamente na raiz da pasta da feature: src/features/[feature-name]/index.ts

2. Politica Explicita de Exportacao: Exporte exclusivamente o componente de conteiner principal da tela (ex: UsersPageContainer) e hooks publicos autorizados. Mantenha sub-componentes auxiliares, modais e helpers internos totalmente privados dentro do escopo do modulo.

---

## Phase 4: Routing Link and Skinny Page Registration

1. Vinculo de Rota: Conecte o modulo ao roteador do Next.js criando o arquivo page.tsx dentro da pasta de acesso correspondente.

2. Rotas de Autenticacao: Para fluxos de credenciais (login, forgot-password), aloque em: src/app/(auth)/[feature-name]/page.tsx com layout ultra-limpo.

3. Rotas Protegidas: Se a feature exigir autenticacao ou regras de permissao RBAC, aloque em: src/app/(private)/[feature-name]/page.tsx

4. Rotas Livres: Se a feature for de acesso publico ou externo, aloque em: src/app/(public)/[feature-name]/page.tsx

5. Implementacao Enxuta: O arquivo de pagina de rota gerado deve se limitar a importar o conteiner principal atraves do Gatekeeper da feature e renderiza-lo sem lógica local.

---

## Phase 5: Integration Audit and Automated Validation

1. Remocao de Comentarios: Garanta que todos os arquivos criados estejam 100% livres de comentarios explicativos inline, notas ou JSDoc.

2. Verificacao de Qualidade: Abra o terminal integrado de forma autonoma e execute os comandos: npx tsc --noEmit e npm run test. A feature so sera considerada homologada se o compilador nao acusar erros e todas as novas suites de teste passarem com sucesso.