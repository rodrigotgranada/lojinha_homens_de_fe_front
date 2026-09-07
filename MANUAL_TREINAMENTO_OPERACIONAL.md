# 📘 Manual de Treinamento Operacional — Lojinha & Gestão Financeira (Homens de Fé)

> **Público-alvo:** Administradores, Operadores de PDV/Caixa, Liderança de Obras/Infraestrutura e Equipe Financeira.  
> **Objetivo:** Capacitar a equipe na operação diária do sistema durante os retiros, cobrindo vendas, despesas, reembolsos e contingência offline.

---

## 📑 Sumário

1. [Visão Geral e Conceito do Sistema](#1-visão-geral-e-conceito-do-sistema)
2. [Perfis e Permissões de Acesso](#2-perfis-e-permissões-de-acesso)
3. [Acesso Inicial e Seleção de Evento](#3-acesso-inicial-e-seleção-de-evento)
4. [Módulo 1: Operação de Caixa / PDV (Vendas)](#4-módulo-1-operação-de-caixa--pdv-vendas)
   - [4.1 Fluxo de Venda Rápida (Pago na Hora)](#41-fluxo-de-venda-rápida-pago-na-hora)
   - [4.2 Fluxo de Venda Pendente (Fiado / Acerto no Final)](#42-fluxo-de-venda-pendente-fiado--acerto-no-final)
   - [4.3 Cadastro Rápido de Participante no PDV](#43-cadastro-rápido-de-participante-no-pdv)
   - [4.4 Cancelamento ou Correção de Venda](#44-cancelamento-ou-correção-de-venda)
5. [Módulo 2: Controle de Produtos & Estoque](#5-módulo-2-controle-de-produtos--estoque)
   - [5.1 Cadastro de Novo Produto (Preço de Custo vs. Venda)](#51-cadastro-de-novo-produto-preço-de-custo-vs-venda)
   - [5.2 Importação de Sobras do Retiro Anterior & Baixa por Perda](#52-importação-de-sobras-do-retiro-anterior--baixa-por-perda)
6. [Módulo 3: Gestão de Despesas, Obras e Reembolsos](#6-módulo-3-gestão-de-despesas-obras-e-reembolsos)
   - [6.1 Criação de Centro de Custo / Obra](#61-criação-de-centro-de-custo--obra)
   - [6.2 Lançamento de Itens Adiantados por Voluntários](#62-lançamento-de-itens-adiantados-por-voluntários)
   - [6.3 Doações de Insumos (Custo Zero)](#63-doações-de-insumos-custo-zero)
   - [6.4 Como Fazer Reembolsos (Quitação Parcial e Total)](#64-como-fazer-reembolsos-quitação-parcial-e-total)
7. [Módulo 4: Receitas do Retiro & Balanço Geral](#7-módulo-4-receitas-do-retiro--balanço-geral)
   - [7.1 Lançamento de Receitas Extras (Inscrições, Rifas, Doações)](#71-lançamento-de-receitas-extras-inscrições-rifas-doações)
   - [7.2 Como Interpretar o Relatório Geral e Prestação de Contas](#72-como-interpretar-o-relatório-geral-e-prestação-de-contas)
8. [Módulo 5: Protocolo de Contingência (Sem Internet / Queda de Sinal)](#8-módulo-5-protocolo-de-contingência-sem-internet--queda-de-sinal)
9. [Perguntas Frequentes & Dúvidas Rápidas (FAQ)](#9-perguntas-frequentes--dúvidas-rápidas-faq)

---

## 1. Visão Geral e Conceito do Sistema

O sistema foi construído especificamente para a dinâmica de retiros:
- **Antes do evento:** Voluntários compram materiais com dinheiro do próprio bolso (tintas, canos, carnes, mantimentos).
- **Durante o evento:** Acontecem as vendas na Lojinha, rifas e doações, gerando entrada no caixa físico e no Pix.
- **Ressarcimento justo e transparente:** O caixa devolve o dinheiro aos irmãos que adiantaram, registrando comprovante e forma de pagamento.
- **Fechamento contábil:** No final do domingo, apura-se o **Saldo Imediato do Caixa** e o **Superávit Econômico** da edição.

---

## 2. Perfis e Permissões de Acesso

| Perfil | Quem é | O que pode fazer |
| :--- | :--- | :--- |
| **ADMIN** | Coordenadores gerais e Tesoureiros | Acesso total: cria eventos, edita produtos, cadastra obras, realiza reembolsos e gera relatórios executivos. |
| **OPERADOR / USER** | Voluntários de plantão no balcão da lojinha | Realiza vendas no PDV, consulta estoque e cadastra novos participantes. Não altera histórico financeiro nem quita despesas sem autorização. |

---

## 3. Acesso Inicial e Seleção de Evento

1. Abra o navegador no endereço: **`http://localhost:5005`** (ou endereço do servidor local fornecido pela equipe técnica).
2. Na tela de login:
   - Digite o **CPF** cadastrado (apenas números).
   - Clique em **Entrar**.
3. **Atenção ao Cabeçalho (Topo da Tela):**
   - Verifique a etiqueta amarela com o nome do evento ativo (Ex: **`Retiro Homens de Fé 2026`**).
   - Todas as vendas e despesas lançadas serão vinculadas a esse evento. Se precisar mudar, o Administrador pode selecionar outro evento no menu **Eventos**.

---

## 4. Módulo 1: Operação de Caixa / PDV (Vendas)

Acesse **Menu > PDV** (`/admin/pdv`).

### 4.1 Fluxo de Venda Rápida (Pago na Hora)

> **Exemplo Prático:** O irmão Carlos foi ao balcão e comprou 1 Boné (R$ 35,00) e 1 Garrafa Térmica (R$ 45,00). Pagou na hora via Pix.

1. No catálogo de produtos, clique sobre o **Boné** e sobre a **Garrafa Térmica**.
2. Na barra lateral direita (ou aba "Carrinho" no celular/tablet), confirme os itens:
   - Quantidade: `1x Boné` e `1x Garrafa`.
   - Total da Venda: `R$ 80,00`.
3. No campo **CPF do Cliente**:
   - Digite o CPF ou o primeiro nome do irmão.
   - O sistema autocompletará os dados cadastrados.
4. Mantenha a chave **"Pago na hora?"** ligada (**Verde / Ativa**).
5. Selecione a forma de pagamento: **PIX**, **DINHEIRO** ou **CARTÃO**.
6. Clique no botão verde **Concluir Venda**.
7. O sistema emite mensagem de sucesso e atualiza o saldo do estoque automaticamente.

---

### 4.2 Fluxo de Venda Pendente (Fiado / Acerto no Final)

> **Exemplo Prático:** O irmão Felipe pegou 2 Camisetas (R$ 100,00), mas está sem carteira e vai acertar tudo no domingo após o almoço.

1. Adicione as 2 Camisetas ao carrinho.
2. Identifique o cliente obrigatoriamente pelo **CPF** (o sistema exige identificação para qualquer venda pendente).
3. Desmarque a chave **"Pago na hora?"** (ela ficará cinza/desativada com o texto **"PENDENTE"**).
4. Clique em **Concluir Venda**.
5. **Resultado:** A venda será gravada como pendente. No relatório final, o nome do irmão aparecerá na lista de acertos pendentes para cobrança antes do encerramento.

---

### 4.3 Cadastro Rápido de Participante no PDV

Se o irmão for novo ou o CPF não for encontrado:
1. Ao digitar o CPF no campo do PDV, se o sistema não localizar, aparecerá o botão **"+ Cadastrar Novo Participante"**.
2. Preencha apenas:
   - **Nome Completo**
   - **WhatsApp / Telefone**
3. Clique em **Salvar e Continuar**.
4. O cliente já fica selecionado no carrinho imediatamente, sem perder os produtos escolhidos.

---

### 4.4 Cancelamento ou Correção de Venda

Caso o operador lance um item errado por engano:
1. Acesse o menu **Vendas** (`/admin/vendas`).
2. Localize a venda na lista pelo horário ou nome do comprador.
3. Clique no botão vermelho **Cancelar Venda**.
4. Digite a justificativa (Ex: *"Item lançado duplicado no caixa 2"*).
5. O sistema estorna o estoque automaticamente e registra a ocorrência no Log de Auditoria.

---

## 5. Módulo 2: Controle de Produtos & Estoque

Acesse **Menu > Estoque** (`/admin/produtos`).

### 5.1 Cadastro de Novo Produto (Preço de Custo vs. Venda)

> **Exemplo Prático:** Chegou um lote de 50 Canecas personalizadas. Cada caneca custou R$ 18,00 para produzir e será vendida a R$ 30,00.

1. Clique em **"+ Novo Produto"**.
2. Preencha os campos:
   - **Nome:** `Caneca Homens de Fé 2026`
   - **Categoria:** `Acessórios`
   - **Preço de Venda:** `30,00`
   - **Preço de Custo:** `18,00`
   - **Estoque Inicial:** `50`
   - **Nome do Patrocinador/Investidor (Opcional):** Se um irmão pagou a confecção do lote do próprio bolso, coloque o nome dele aqui para o sistema calcular o reembolso do custo à medida que as canecas forem vendidas.
3. Clique em **Salvar**.

---

### 5.2 Importação de Sobras do Retiro Anterior & Baixa por Perda

> **Exemplo Prático:** Do retiro de 2025, sobraram 10 Bíblias no sistema. Na contagem física no sítio, a equipe encontrou 8 Bíblias novas e 2 estavam molhadas/danificadas.

1. Na tela de produtos, clique em **"Importar Sobras de Retiros"**.
2. Selecione o evento de origem: `Retiro Homens de Fé 2025`.
3. O sistema listará todos os produtos com estoque remanescente.
4. Na linha da Bíblia:
   - No campo quantidade a importar, altere de `10` para `8`.
   - O sistema abrirá automaticamente a caixa de **Baixa Auditada** para as `2` unidades faltantes.
   - Motivo da Baixa: Selecione **"Avaria / Estragado"**.
   - Observação: *"Caixa danificada por umidade no transporte"*.
5. Clique em **Confirmar Importação**.
6. As 8 Bíblias entram no estoque de 2026 e o saldo de 2025 fica auditado e zerado.

---

## 6. Módulo 3: Gestão de Despesas, Obras e Reembolsos

Acesse **Menu > Despesas & Obras** (`/admin/despesas`).

### 6.1 Criação de Centro de Custo / Obra

1. Clique em **"+ Cadastrar Despesa / Obra"**.
2. Escolha o título e a natureza:
   - **🏗️ Obra & Reforma:** Para melhorias fixas no sítio (alvenaria, elétrica, pintura).
   - **🛒 Rancho & Alimentação:** Para o consumo do evento (carnes, café, pães, hortifrúti).
   - **📦 Estrutura & Som:** Aluguel de gerador, cabos, iluminação.

---

### 6.2 Lançamento de Itens Adiantados por Voluntários

> **Exemplo Prático:** O irmão Mateus foi ao atacadista e comprou 20 kg de carne para o churrasco no valor de R$ 680,00 com cartão pessoal dele.

1. No card do grupo **Rancho & Alimentação**, clique no botão **"+ Item"**.
2. Preencha:
   - **Descrição:** `Carne para Churrasco (20kg Costela e Alcatra)`
   - **Comprador (CPF):** Digite o CPF do irmão Mateus.
   - **Valor:** `680,00`
   - **Comprovante:** Tire foto da nota fiscal pelo celular e anexe (opcional, mas recomendado).
3. Clique em **Salvar Item**.
4. O item aparecerá com status amarelo **PENDENTE** de reembolso.

---

### 6.3 Doações de Insumos (Custo Zero)

> **Exemplo Prático:** O irmão Paulo é dono de padaria e doou todos os 300 pães do café da manhã.

1. No grupo de alimentação, clique em **"+ Item"**.
2. Descrição: `Pães Franceses doados para o café`.
3. Marque a caixa seletora: **"Este item foi uma DOAÇÃO (Custo zero para o caixa)"**.
4. O valor financeiro ficará travado em R$ 0,00 e o status será marcado como **DOAÇÃO**. Isso impede que o sistema gere dívida de reembolso.

---

### 6.4 Como Fazer Reembolsos (Quitação Parcial e Total)

> **Exemplo Prático:** No sábado à noite, o caixa arrecadou dinheiro suficiente e vai reembolsar R$ 300,00 para o Mateus (dos R$ 680,00 adiantados). O restante será pago no domingo.

1. Na linha da despesa do Mateus, clique em **"Dar Baixa"**.
2. O sistema mostra:
   - *Valor Original:* `R$ 680,00`
   - *Já Reembolsado:* `R$ 0,00`
   - *Saldo Restante a Pagar:* `R$ 680,00`
3. No campo **Valor a Reembolsar**, digite: `300,00`.
4. Escolha o **Método**: `PIX`.
5. Se tentar digitar `700,00` (valor maior que o devido), o sistema **bloqueará a operação** com aviso de segurança contra sobre-reembolso.
6. Confirme a operação.
7. O status passará para **PARCIAL** (R$ 300,00 quitados / R$ 380,00 pendentes). Quando os R$ 380,00 forem pagos no domingo, o status mudará automaticamente para **QUITADO**.

---

## 7. Módulo 4: Receitas do Retiro & Balanço Geral

### 7.1 Lançamento de Receitas Extras (Inscrições, Rifas, Doações)

Na tela de despesas, clique na aba **"Receitas do Retiro"**:
1. Clique em **"+ Nova Receita"**.
2. Preencha:
   - **Descrição:** `Arrecadação Rifa da Bíblia de Estudo`
   - **Tipo:** `Rifa / Sorteio` (ou Inscrição, Doação Espontânea, Cantina)
   - **Valor:** `1.250,00`
   - **Forma:** `Dinheiro Físico` ou `PIX`
3. Salve a receita.

---

### 7.2 Como Interpretar o Relatório Geral e Prestação de Contas

Clique na aba **"Relatório Geral"**:

```txt
┌─────────────────────────────────────────────────────────────┐
│                 PAINEL FINANCEIRO DO RETIRO                 │
├──────────────────────────────┬──────────────────────────────┤
│ (+) Total de Receitas Extras │ R$ 15.400,00                 │
│ (+) Vendas na Lojinha        │ R$  4.850,00                 │
│ (-) Total Despesas e Obras   │ R$  8.200,00                 │
├──────────────────────────────┼──────────────────────────────┤
│ (=) SUPERÁVIT DO EVENTO      │ R$ 12.050,00 (Lucro Líquido) │
└──────────────────────────────┴──────────────────────────────┘
```

- **Disponibilidade Imediata no Caixa:** Mostra quanto dinheiro tem fisicamente agora (Entradas recebidas - Valores já reembolsados).
- **Superávit Econômico:** Mostra quanto sobrará no final após pagar 100% dos voluntários que ainda têm reembolsos pendentes.
- **Botão Imprimir Relatório:** Formata automaticamente em folha A4 oficial para assinatura da comissão organizadora e pastores.

---

## 8. Módulo 5: Protocolo de Contingência (Sem Internet / Queda de Sinal)

Se o retiro for em sítio ou fazenda e o sinal de 4G/Wi-Fi oscilar:

1. **Servidor Local no Notebook do Caixa:**
   - O sistema estará rodando localmente no notebook central da equipe.
2. **Alternância de Conexão no Painel:**
   - No cabeçalho da tela, clique no ícone de engrenagem ⚙️ (**Rede & Conexão**).
   - Se a internet cair, selecione **"Modo Contingência (Servidor Local)"**.
   - As vendas e cadastros continuarão funcionando com velocidade máxima sem depender da internet.
3. Quando a internet restabelecer, o sistema sincroniza os logs com a nuvem.

---

## 9. Perguntas Frequentes & Dúvidas Rápidas (FAQ)

**P: Um irmão esqueceu o CPF, como faço a venda?**  
*R:* Se a venda for paga na hora em dinheiro físico, você pode usar um CPF genérico de "Balcão / Anônimo" ou pedir o nome completo dele para cadastrar rapidamente. Se a venda for **pendente (fiado)**, o CPF é estritamente obrigatório.

**P: Posso dar baixa em um reembolso em dinheiro vivo tirado do caixa da lojinha?**  
*R:* Sim! Lance a baixa no sistema selecionando o método **"DINHEIRO FÍSICO"**. O sistema deduzirá esse valor da disponibilidade do caixa físico.

**P: Como sei se todas as despesas já foram pagas?**  
*R:* Na tela de Despesas, olhe os selos de status:
- 🟢 **QUITADO:** 100% pago.
- 🟡 **PARCIAL:** Foi feito um adiantamento, ainda resta saldo.
- 🔴 **PENDENTE:** Nenhum centavo foi devolvido ainda.
- ⚪ **DOAÇÃO:** Não exige reembolso.

---

*Manual homologado para uso da equipe do Retiro Homens de Fé. Em caso de dúvidas durante o evento, contate o administrador do sistema.*
