# Generator: Core UI Adapter Scaffolding (Component-As-A-Folder)

Este gerador orienta a criacao, refatoracao e a manutencao da camada completa de componentes base em src/components/base/. Ele atua como um isolador termico obrigatorio (Firewall) contra o acoplamento direto com a biblioteca @chakra-ui/react.

---

## 1. Regras de Estrutura de Diretorios e Isolamento Atomico

A Regra da Pasta Atomica Isolada:
E terminantemente proibido criar mais de um componente publico de alta complexidade ou relevancia dentro do mesmo arquivo ou da mesma pasta.

Cada elemento elementar deve possuir seu proprio diretorio exclusivo, auto-contido e isolado na raiz da camada base, respeitando rigorosamente a seguinte topologia de arquivos:

src/components/base/[ComponentName]/index.ts -> Exportador publico limpo (Barrel file)
src/components/base/[ComponentName]/[ComponentName].tsx -> Codigo de implementacao do adapter principal
src/components/base/[ComponentName]/[ComponentName].test.tsx -> Suite de testes unitarios (Jest + RTL) OBRIGATORIA

---

## 2. Diretrizes de Engenharia dos Adapters

1. The Firewall Rule: Esta pasta base e o unico local permitido em toda a aplicacao para importar simbolos diretamente de @chakra-ui/react. Qualquer importacao do Chakra detectada em camadas externas (como no diretorio src/features/) violara os criterios de aceitacao.

2. Padrao React 19: Receba o parametro ref diretamente na assinatura de propriedades do componente como uma propriedade comum. O uso do metodo legado forwardRef e estritamente proibido.

3. Proibicao Absoluta de Comentarios: Os arquivos gerados nao devem conter nenhuma linha de comentario explicativo, documentacao inline, anotacoes de fluxo de controle ou marcadores de afazeres (TODO).

4. Lei da Dupla Entrega Base: Nenhum componente desta camada pode ser gerado ou modificado sem a criacao ou atualizacao concomitante de seu respectivo arquivo .test.tsx. A entrega sem o par de testes causara rejeicao imediata do artefato.

5. Densidade Padrao B2B: Imponha variacoes compactas (size="sm" ou size="xs") por padrao em todos os elementos visuais, caixas de entrada e botoes para garantir alta densidade de informacao.

6. Assinatura Semantica: Todos os arquivos de implementacao devem declarar a propriedade Component.displayName = 'Component' na ultima linha do escopo do arquivo.

---

## 3. Matriz de Mapeamento Completo de Componentes Base

| Diretorio Alvo | Primitivos Mapeados do Chakra UI v3 | Diretrizes de Engenharia e Regras de Densidade B2B |
| :--- | :--- | :--- |
| **`Layout/`** | `Box`, `Flex`, `Grid`, `HStack`, `VStack`, `Center`, `Stack`, `Wrap`, `Container`, `Group` | Permitido o agrupamento por serem wrappers estruturais puros. Forcar gap={2} padrao e largura 100% onde aplicavel. |
| **`LayoutAdvanced/`** | `AspectRatio`, `Bleed`, `Center` (Absolute), `Float`, `SimpleGrid`, `Splitter`, `ScrollArea`, `Separator` | Componentes de utilidade de grid avancada e manipulacao de viewport. ScrollArea deve mascarar barras nativas. |
| **`Typography/`** | `Text`, `Heading`, `Code`, `Blockquote`, `Em`, `Highlight`, `Kbd`, `Mark`, `Prose` | Text forca fontSize="sm". Heading forca fontWeight="bold". Code e Kbd forcam fontFamily="mono". |
| **`Button/`** | `Button`, `DownloadTrigger` | Aceita a propriedade booleana loading mapeada nativamente para injetar spinner e desabilitar interacoes. |
| **`IconButton/`** | `IconButton`, `CloseButton` | Forca tamanho compacto xs e variante ghost por padrao para uso em cabeçalhos, listagens e tabelas. |
| **`InputField/`** | `Input` | Encapsula a estrutura de linha unica acoplada ao manipulador de estado visual. |
| **`TextAreaField/`** | `Textarea` | Pasta isolada para nos de texto de multiplas linhas. Mantem preenchimentos verticais compactos. |
| **`SelectField/`** | `Select` (Root, Trigger, ValueText, Content, Item, Indicator) | Proibido omitir o icone lateral. Deve obrigatoriamente incluir o sub-componente SelectIndicator dentro do SelectTrigger, mantendo a densidade size="sm". |
| **`Combobox/`** | `Combobox` (Root, Trigger, Input, Content, Item, ClearTrigger, ToggleTrigger) | Obrigatorio incluir o ComboboxClearTrigger para remocao com icone X. Deve obrigatoriamente ativar a propriedade openOnClick no ComboboxRoot para expandir as opcoes ao clicar em qualquer area do input, sem depender da seta lateral. |
| **`FileInput/`** | `FileUpload` | Abstracao para captura de arquivos com gatilho em lote e indicador de progresso de upload compacto. |
| **`Field/`** | `Field` (Root, Label, HelperText, ErrorText) | O componente isolado de infraestrutura de campo para envelopar inputs brutos e padronizar erros. |
| **`Fieldset/`** | `Fieldset` (Root, Legend, HelperText) | Agrupador logico de formularios complexos com tipografia reduzida e divisorias sutis. |
| **`CheckboxControl/`**| `Checkbox` | Wrapper compacto utilizando tag nativa input type="checkbox" estilizada via accentColor do sistema. |
| **`CheckboxCard/`** | `CheckboxCard`, `RadioCard` | Controles de selecao modernos onde o container inteiro atua como um card clicavel de alta densidade. |
| **`SwitchControl/`** | `Switch` | Wrapper para alternadores booleanos utilizando a propriedade estrutural role="switch". |
| **`ColorPicker/`** | `ColorPicker`, `ColorSwatch` | Popover seletor de matrizes hexadecimais para parametrizacoes de customizacao visual de tenant. |
| **`Editable/`** | `Editable` | In-place editing element para modificacoes rapidas de labels sem a necessidade de abrir formularios cheios. |
| **`Calendar/`** | `Calendar` | Primitivo de matriz de dias para visualizacao estatica de agendas ou janelas temporais. |
| **`DatePicker/`** | `DatePicker` | Input acoplado a popover flutuante para selecao de datas e ranges cronologicos formatados em fontFamily="mono". |
| **`DialogModal/`** | `Dialog` | Abstrai os nos de modal (Root, Backdrop, Positioner, Content, Header, Body, Footer). Expose assinaturas limpas. |
| **`DrawerPanel/`** | `Drawer` | Abstrai os nos do painel retratil lateral. Mantem as mesmas chaves do modal, aceitando variacao de posicionamento. |
| **`Tooltip/`** | `Tooltip` | Gatilho flutuante instantaneo para micro-explicacoes tecnicas de metricas, forcando atraso de abertura reduzido. |
| **`Popover/`** | `Popover` | Painel flutuante rico para menus de configuracoes contextuais que exigem foco e cliques internos. |
| **`Menu/`** | `Menu` (Root, Trigger, Content, Item, ItemGroup) | Controle flutuante de contexto (Dropdown) para acoes por linha de tabela ou em lote. Forca size="sm" e itens interativos com icones. |
| **`HoverCard/`** | `HoverCard` | Exibicao expandida de metadados ao pairar o ponteiro sobre entidades (ex: carregar perfil do usuario ao pairar e-mail). |
| **`Card/`** | `Card` | Bloco basico de elevacao estrutural (bg.surface) com bordas sutis para envelopar secoes do dashboard. |
| **`Alert/`** | `Alert` | Banner inline para feedbacks severos ou informativos, forcando variante suave (variant="subtle"). |
| **`Status/`** | `Status` | Indicador em ponto luminoso (dot) pareado com texto compacto para sinalizar conectividade de microsservicos. |
| **`Toast/`** | `Toast` | Gerenciador imperativo de notificacoes flutuantes de canto de tela disparadas apos a conclusao de mutations. |
| **`Progress/`** | `Progress` | Barra horizontal de carregamento linear fina para indicacao de consumo de cota ou limites de plano. |
| **`ProgressCircle/`**| `ProgressCircle` | Indicador circular compacto de carregamento assincrono ou percentual de completude de tarefas. |
| **`Avatar/`** | `Avatar` | Renderizador circular de fotos de operadores com fallback automatico para iniciais de texto estilizadas. |
| **`Badge/`** | `Badge` | Inset visual compacto de preenchimento leve (variant="subtle") para classificacao estatica de papeis (RBAC). |
| **`Tag/`** | `Tag` | Elemento de categorizacao contendo botao de remocao embutido para filtros dinamicos de busca. |
| **`Skeleton/`** | `Skeleton` | Bloco com animacao de pulso e cantos arredondados (borderRadius="sm") mapeado sobre a geometria dos dados brutos. |
| **`Spinner/`** | `Spinner` | Indicador rotacional de processamento com espessura de borda travada em 2px e tamanho sm. |
| **`Clipboard/`** | `Clipboard` | Botao de clique unico para copia rapida de tokens de API com feedback visual de sucesso instantaneo. |
| **`Image/`** | `Image` | Wrapper de imagens com tratamento nativo de fallback e estados de erro elegantes para uploads quebrados. |
| **`QRCode/`** | `QRCode` | Renderizador de vetores de codigo bidimensional para ativacao expedita de chaves MFA e seguranca corporativa. |
| **`Stat/`** | `Stat` | Painel de exibicao de indicadores macro (Metrica, Valor principal em destaque e indicador de variacao percentual). |
| **`Table/`** | `Table` | Abstracao atomica e reutilizavel de nos de grade tabular (Header, Body, Row, Cell) configurada em size="sm". |
| **`QueryBoundary/`** | `QueryBoundary` (Custom Infra) | Componente estrutural para envelopar estados assincronos. Deve aceitar isLoading, error, data, skeleton e children. Impoe a regra de exibir o children imediatamente se data existir, exibindo o skeleton apenas se isLoading for true e nao houver cache. |
| **`Accordion/`** | `Accordion` | Estrutura vertical colapsavel para organizacao de secoes densas de perguntas frequentes ou sub-parametros de perfil. |
| **`Breadcrumb/`** | `Breadcrumb` | Linha de navegacao hierarquica horizontal para mapeamento de localizacao em sub-paineis profundos. |
| **`Carousel/`** | `Carousel` | Slider estrutural compacto para rotacao de midias, logs ou cards informativos de novas atualizacoes. |
| **`Pagination/`** | `Pagination` | Regua numerica de selecao de paginas com botoes de avanco rapido dotados de identificadores ARIA descritivos. |
| **`Steps/`** | `Steps` | Indicador de fluxo sequencial para guiar o operador atraves de assistentes de configuracao de multiplas etapas. |
| **`Tabs/`** | `Tabs` | Alternador de abas horizontais de alta densidade operando em variante de linha limpa (variant="line"). |