PEDIDO DE NOVA FEATURE

# EXECUTION COMMAND: SCAFFOLD NEW DOMAIN FEATURE MODULE

Seu objetivo e inicializar um novo modulo de funcionalidade do zero, seguindo rigidamente as diretrizes contidas em .ai/playbooks/create-feature-playbook.md e .ai/playbooks/feature-creation-playbook.md.

## 1. Parametros do Modulo
* Nome da Feature: [NOME_DA_FEATURE_AQUI]
* Tipo de Rota: (private) ou (public)

## 2. Etapas de Construcao Obrigatorias
1. Crie a pasta em src/features/[nome]/ e inicialize os quatro diretorios obrigatorios: components, hooks, services e types.
2. Crie o arquivo de tipos em types/index.ts mapeando o contrato do back-end.
3. Construa o componente de conteiner principal em components/[Nome]PageContainer/.
4. Crie o Gatekeeper index.ts na raiz da feature exportando apenas o conteiner.
5. Crie a Skinny Page em src/app/(private ou public)/[nome]/page.tsx apenas renderizando o conteiner.

## 3. Criterios de Aceitacao
* Zero strings puras: Use next-intl lendo de messages/[locale]/[nome].json.
* Zero comentarios inline nos codigos gerados.
* Alta densidade visual B2B aplicando size="sm" por padrao.
* Auto-Correcao: Execute npx tsc --noEmit e npm run test no terminal integrado de forma autonoma e garanta 100% de sucesso antes de entregar.


PEDIDO DE NOVO COMPONENTE

# EXECUTION COMMAND: SCAFFOLD NEW CORE UI BASE ADAPTER

Seu objetivo e criar um novo adaptador primitivo e isolado na camada base da aplicacao, atendendo as regras de .ai/generators/generate-base-adapters.md.

## 1. Parametros do Componente
* Nome do Componente: [NOME_DO_COMPONENTE_AQUI]
* Primitivos do Chakra UI v3 a mapear: [LISTA_DE_COMPONENTES_DO_CHAKRA]

## 2. Estrutura de Entrega Coesa
1. Crie a pasta atomica em src/components/base/[Nome]/.
2. Crie o arquivo de implementacao [Nome].tsx aplicando o padrao de densidade compacto (size="sm") e capturando a propriedade ref diretamente na assinatura (React 19).
3. Adicione a propriedade displayName na ultima linha.
4. Crie a suite de testes unitarios obrigatria [Nome].test.tsx no Jest.
5. Crie o arquivo de exportacao limpa index.ts.

## 3. Criterios de Qualidade
* Proibicao absoluta de comentarios inline ou JSDoc.
* Isolamento Termico: Este deve ser o unico arquivo do fluxo autorizado a importar de @chakra-ui/react.
* Validacao Ativa: Execute npx tsc --noEmit e npm run test de forma autonoma e retorne os codigos acompanhados do log do terminal.


PEDIDO PARA AJUSTE EM COMPONENTES JA PRONTOS
# EXECUTION COMMAND: REFACTOR AND EVOLVE EXISTING CORE ELEMENT

Seu objetivo e aplicar uma evolucao funcional e visual em um artefato ja existente no projeto, mantendo as regras de governanca intactas.

## 1. Alvo da Alteracao
* Caminho do Arquivo: [CAMINHO_DO_ARQUIVO_AQUI]
* Contexto do Ajuste: [DESCREVA_AQUI_O_QUE_PRECISA_MUDAR]

## 2. Diretrizes de Refatoracao
1. Modifique a logica interna ou propriedades do arquivo alvo para atender ao cenario descrito, sem alterar ou quebrar outros comportamentos legados do componente.
2. Atualize a suite de testes unitarios correspondente (.test.tsx) para cobrir a nova regra introduzida.
3. Garanta que nenhuma string de texto puro seja introduzida (use i18n).
4. Remova por completo qualquer linha de comentario inline ou JSDoc.

## 3. Validacao Automatizada (Self-Healing)
* Abra o terminal integrado e execute de forma autnoma npx tsc --noEmit e npm run test. Nao entregue o codigo ate que o build passe com 100% de sucesso.



Para Ajustes Gerais em uma Feature (Escopo do Módulo Inteiro)
# EXECUTION COMMAND: ARCHITECTURAL REFACATORING ON FEATURE DOMAIN MATRIX

Seu objetivo e aplicar uma reestruturacao ou evolucao de escopo geral dentro de um modulo de funcionalidade existente, respeitando os playbooks de governanca de design e i18n.

## 1. Módulo Alvo e Contexto Técnico
* Módulo Afetado: [NOME_DA_FEATURE_EX_USERS]
* Contexto da Modificacao: [DESCREVA O COMPORTAMENTO OU FLUXO QUE DEVE MUDAR NO MODULO]

## 2. Escopo de Impacto nos Arquivos da Feature
* Lógica e Estado (components/ ou hooks/): Modifique os conteineres ou hooks locais para refletir a nova regra de negocio centralizada, garantindo que o fluxo de dados em cascata continue integro.
* Contratos de Rede (services/ ou types/): Se houver mudanca no payload ou nos endpoints, atualize as interfaces estritas TypeScript e os adaptadores de chamada REST primeiro.
* Suites de Teste (.test.tsx): Adapte ou crie novos cenarios de teste unitario para cobrir as alteracoes em todas as pecas afetadas dentro do modulo.

## 3. Diretrizes de Governança Estritas
* Proibicao absoluta de comentarios inline, JSDoc ou anotacoes de fluxo.
* Uso obrigatorio do Gatekeeper (index.ts) para blindar a exposicao de sub-componentes internos.
* Auto-Correcao por Terminal: Execute npx tsc --noEmit e npm run test de forma autonoma. Nao interrompa a execucao ate que todas as suítes do modulo passem com 100% de sucesso.

Retorne o relatorio de alteracoes e o log de sucesso do compilador.




Para Alterar Regras e Manuais na Pasta .ai/
# EXECUTION COMMAND: UPDATE AI GOVERNANCE PLAYBOOK KNOWLEDGE BASE

Seu objetivo e atualizar a sua propria base de conhecimento e regras de governanca dentro do diretorio .ai/. Voce deve refatorar ou expandir um manual especifico para absorver novas diretrizes tecnicas.

## 1. Arquivo de Governança Alvo
* Caminho do Manual: [CAMINHO_DO_ARQUIVO_EX_AI/PLAYBOOKS/FEATURE-CREATION-PLAYBOOK.MD]
* Nova Diretriz a Injetar: [DESCREVA DETALHADAMENTE A NOVA REGRA OU DECISAO DE ARQUITETURA]

## 2. Instruções de Escrita e Estruturação do Manual
* Markdown Plano: O novo conteudo deve ser escrito estritamente em Markdown plano. E proibido o uso de diagramas de arvore complexos com caracteres especiais ou listas altamente aninhadas que quebrem o parser visual. Use caminhos lineares.
* Consolidacao Sem Perdas: Nao remova ou apague as regras legadas do arquivo, a menos que elas entrem em conflito direto com a nova diretriz fornecida. Una os conceitos de forma harmoniosa.
* Sintaxe Direta: Escreva as regras em formato de contratos de engenharia imperativos e restritivos (ex: "E terminantemente proibido...", "Deve-se obrigatoriamente...").

Retorne o conteudo completo e atualizado do arquivo Markdown de governanca para salvamento imediato.