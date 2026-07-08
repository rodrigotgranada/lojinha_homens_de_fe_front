# Blueprint: Design System Tokens & Semantic Palette (Chakra UI v3)

Este guia documenta os tokens oficiais e as chaves semânticas da identidade visual da plataforma B2B SaaS. A IA deve consumir exclusivamente estes identificadores, erradicando o uso de hexadecimais hardcoded.

---

## 1. Escopo de Tokens de Cores (Core Palette)
* **Brand Cluster (`colors.brand`)**: Tons de escala corporativa base para a marca (escala primária baseada em Indigo/Navy).
* **Semantic Layout Cluster**:
  * `bg.surface`: Fundo principal de cards, modais e containers internos.
  * `bg.muted`: Fundo cinza suave para tabelas, inputs desabilitados e listagens.
  * `border.subtle`: Borda padrão de inputs, divisórias e grids de tabelas.
  * `fg.primary`: Cor do texto principal de alta legibilidade.
  * `fg.muted`: Texto secundário para metadados, carimbos de data/hora e legendas.

## 2. Tokens de Feedback Crítico (Status)
* **Success (`green`)**: Sinaliza operações concluídas, contas ativas e mutações salvas.
* **Error/Danger (`red`)**: Para bloqueios de segurança, contas suspensas e erros de validação.
* **Warning (`orange`)**: Para convites pendentes e limiares de limite de licença atingidos.
* **Info (`blue`)**: Para destaques técnicos e links informativos.

## 3. Regra de Ouro Combinada (i18n + Theme)
Ao gerar novas interfaces, combine as chaves semânticas de tema com os escopos de internacionalização:
* Cores: Sempre passadas via tokens do sistema (ex: `colorPalette="brand"` ou `bg="bg.surface"`).
* Textos: Sempre resolvidos via dicionário estruturado (ex: `t('users.table.headers.name')`).