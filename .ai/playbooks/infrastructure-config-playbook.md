# Playbook: Core Infrastructure & Global Configurations

Este manual governa a orquestracao, padroes de sintaxe e verificacao de configuracoes globais da aplicacao, cobrindo a infraestrutura de localizacao (i18n) e a tokenizacao de temas do Design System.

---

## 1. Internationalization Architecture Protocol (next-intl - Storage-Based)

* **Roteamento e Estado**: O gerenciamento de idioma e estritamente baseado em armazenamento local (Nao-Roteado). E proibido criar segmentos dinamicos de URL como `[locale]`. O idioma ativo e extraido do cookie `NEXT_LOCALE`, assumindo o valor padrao `pt` caso esteja ausente.
* **Granularidade de Dicionarios (Sharded JSON)**: Arquivos JSON monoliticos e gigantescos de traducao sao proibidos. Os dicionarios devem ser fatiados por modulo de negocio dentro de diretorios especificos: `messages/[locale]/[feature].json` (ex: `messages/pt/common.json`, `messages/pt/users.json`).
* **Montagem Assincrona de Contexto**: A camada de resolucao em `src/i18n/request.ts` deve compor o objeto unificado de mensagens em tempo de execucao utilizando carregamento paralelo assincrono via `Promise.all`.
* **Uso Obrigatorio**: E proibida a insercao de strings de texto puro diretamente em paginas e componentes visuais. Todo conteudo textual deve ser resolvido via chaves estruturadas chamando o hook `useTranslations`.

---

## 2. Design System Custom Theme Tokenization

* **Customizacao Semantica**: Modificacoes na paleta de cores padrao da plataforma (cores de marca, fundos semanticos e estados informativos) devem residir exclusivamente dentro de `src/theme/tokens.ts`, estendendo o objeto do Chakra UI v3.
* **Constancia de Cores**: Componentes de negocio estao proibidos de utilizar codigos hexadecimais puros (`#FFFFFF`) ou regras de pixels fixas. Eles devem consumir unicamente as variaveis de contexto semantico injetadas no tema (ex: `bg.surface`, `border.subtle`, `fg.muted`), garantindo suporte nativo a variacoes de tema (Light/Dark mode).

---

## 3. UI Primitive Restraints & B2B Density Protocol

* **Banimento de Primitivos HTML e Layouts**: E terminantemente proibido o uso de tags nativas de formulario ou de estrutura tabular do HTML como `select`, `input`, `button`, `textarea`, `table`, `thead`, `tbody`, `tr`, `th`, e `td` dentro das camadas de funcionalidade (`src/features/`). Toda a interface deve consumir unica e exclusivamente os adaptadores abstratos expostos em `src/components/base/`.
* **Substitutos Obrigatorios**: Para grades de dados, use o adaptador `Table` composto (ex: `Table.Root`, `Table.Header`, `Table.Row`, `Table.Cell`). Para seletores booleanos ou caixas de marcacao, use o adaptador `CheckboxControl`.
* **Protocolo de Alta Densidade (B2B Compact)**: Interfaces de sistemas corporativos operacionais devem priorizar a exibicao massiva de dados com o menor scroll possivel. Todos os componentes visuais, selects, inputs e tabelas injetados devem adotar o modificador de tamanho compacto por padrao (propriedade `size="sm"` ou equivalente do Chakra UI v3).
* **Elementos Interativos Completos**: E proibido criar elementos visuais de acao falsos ou estaticos (como o icone de tres pontinhos sem acao). Qualquer gatilho contextual ou lista de acoes por linha de tabela deve ser obrigatoriamente encapsulado por um adaptador de `Menu` interativo funcional.

---

## 4. Asynchronous Data Fetching & UI Resiliency Protocol (Axios + useEffect)

* **Banimento de Wrappers de Estado Assincrono**: E terminantemente proibido o uso de `@tanstack/react-query` (`QueryClient`, `useQuery`, `useMutation`) ou do componente `QueryBoundary` para o gerenciamento de chamadas, queries de listagem e filtragem de dados dentro dos modulos funcionais.
* **Padrao Estrito de Resolucao**: Toda e qualquer busca de dados dependente de filtros de tela ou paginacao deve ser gerenciada localmente por meio de estados do React nativos (`useState` para os dados brutos e `isLoading`) sincronizados dentro de um hook `useEffect` nativo do ciclo de vida.
* **Mecanismo de Execucao Seguro**: As chamadas de API devem consumir o cliente Axios puro de forma linear. O estado de carregamento (`isLoading`) deve ser ativado imediatamente antes do disparo da promessa do Axios e obrigatoriamente desativado dentro do bloco `.finally()`.
* **Protecao de Renderizacao de Skeletons**: Para evitar travamentos visuais, loops infinitos ou telas congeladas ao utilizar a navegacao retroativa do Next.js (botoes voltar/avancar do navegador ou router.back), os Skeletons ou indicadores de carga so poderao substituir a tela caso o estado de dados local esteja completamente nulo ou vazio (`if (isLoading && !data)`). Se os dados ja existirem na memoria local do componente, a interface deve permanecer visivel durante a revalidacao.