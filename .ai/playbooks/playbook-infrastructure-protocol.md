# Playbook: Core Infrastructure & Global Configurations

Este manual governa a orquestração, padrões de sintaxe e configuração global da aplicação, construída estritamente sobre **Next.js 15 (Stable) + React 19 (Stable) + Chakra UI v3 (Nativo)**.

---

## 1. Design System & Theming Protocol (Pure Chakra UI v3)

* **Integração Exclusiva Chakra v3**: É terminantemente **PROIBIDO** instalar ou utilizar qualquer biblioteca de injeção de estilos de terceiros no arquivo `providers.tsx`. A estilização e os tokens devem ser 100% resolvidos pelo ecossistema nativo do Chakra UI v3.
* **Inicialização Nativa**: O Chakra UI v3 possui seu próprio motor de extração de estilos. Toda a infraestrutura visual deve ser provida estritamente pelo `ChakraProvider` nativo e pelo sistema de `Provider` da própria biblioteca (`components/ui/provider.tsx`), sem hacks de injeção manual.
* **Tokenização Semântica**: Modificações na paleta de cores, fontes e backgrounds devem residir unicamente no arquivo de tokens (`src/theme/tokens.ts` ou similar) utilizando as APIs do Chakra v3 (`createSystem`, `defineConfig`). Cores hexadecimais em linha são proibidas; use variáveis semânticas (ex: `bg.surface`, `fg.muted`).

---

## 2. Internationalization Architecture Protocol (next-intl)

* **Armazenamento e Roteamento**: O gerenciamento de idioma é baseado em cookie (`NEXT_LOCALE`), sendo uma configuração não-roteada. Segmentos de URL dinâmicos como `/[locale]/` são estritamente proibidos para manter o roteamento limpo.
* **Granularidade de Dicionários (Sharded JSON)**: Dicionários globais monstruosos são proibidos. Os arquivos de tradução devem ser divididos por contexto ou feature dentro de pastas como `messages/[locale]/[feature].json` (ex: `messages/pt/users.json`).
* **Resolução Assíncrona**: O contexto unificado no arquivo `src/i18n/request.ts` deve compor as traduções em tempo de execução via carregamento paralelo (`Promise.all`), servindo dados estritos ao `NextIntlClientProvider`.
* **Regra de Texto Puro**: É proibida a inserção de strings hardcoded em componentes visuais. Todo o texto da interface precisa ser gerado através do hook `useTranslations`.

---

## 3. UI Primitive Restraints & B2B Density Protocol

* **Expurgo de Tags HTML**: É absolutamente proibido utilizar primitivos HTML estáticos para estruturação de interface e interatividade, como: `table`, `thead`, `tr`, `td`, `button`, `input`, `select`. 
* **Consumo de Adaptadores**: Toda interface deve ser montada pelos adaptadores do `src/components/base/` e do design system nativo do Chakra UI v3.
* **Protocolo de Alta Densidade (B2B Compact)**: Sistemas B2B SaaS exigem alta condensação de informações sem a necessidade de scroll constante. Consequentemente, o uso do modificador `size="sm"` é obrigatório para todos os botões, selects, inputs, badges e tabelas operacionais.
* **Interatividade Real**: É proibido "mockar" ícones de ação ou menus de forma inerte. Todo acionador de ação contextual deve ser encapsulado por componentes funcionais interativos (como o `Menu` ou `Dialog` do Chakra v3).

---

## 4. Asynchronous Fetching & Data Decoupling (React 19 Safe Mode)

Para blindar o ambiente de desenvolvimento contra os travamentos (Main Thread Freeze) do HMR / Turbopack ao restaurar máquinas de estado complexas na navegação (BFCache):
* **Banimento de Wrappers Complexos**: Proibido o uso de `@tanstack/react-query` (`useQuery`, `useMutation`) para listagens operacionais padrão.
* **Isolamento de Dados Estritos**: 
  1. Os mocks nunca devem residir nos componentes, sendo isolados em uma pasta global `/mocks` na raiz do projeto.
  2. A lógica de `useEffect` + Axios (ou fetch) é terminantemente proibida dentro de componentes visuais.
  3. A orquestração de chamadas de rede deve ser encapsulada em um Custom Hook da feature (`hooks/use[Feature].ts`) que consome uma camada de serviço limpa (`services/[feature]Service.ts`).
* **Proteção contra Skeleton Freeze**: Indicadores de carregamento (`<Skeleton />`) só podem assumir e travar o local da tabela caso **os dados atuais sejam nulos**. Se dados antigos já estão na memória, eles devem continuar visíveis enquanto a nova busca ocorre invisivelmente.

---

## 5. Routing Navigation Guidelines

* **Navegação Retroativa Segura**: Para evitar deadlocks de cache (popstate/BFCache) com os estados internos do React 19, evite manipuladores mágicos de "Voltar". Use roteamento limpo com o componente nativo `<Link>` ou navegação programática rígida via `useRouter().push('/path')` / `router.replace()`.
