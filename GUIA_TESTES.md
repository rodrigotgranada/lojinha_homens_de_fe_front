# 🧪 Guia de Testes e Homologação de Ponta a Ponta
### Sistema Lojinha Homens de Fé — Módulo de Despesas, Prestação de Contas & Balanço

Este roteiro foi estruturado para você testar todas as novas funcionalidades integradas no seu ambiente de homologação (Staging).

---

## 📋 Cenário 1: Cadastro de Produtos com Custo & Investidor

> **Objetivo:** Garantir que o produto registre o custo de confecção e vincule o investidor corretamente via CPF com busca inteligente.

- [ ] **1.1. Acessar tela de Produtos (`/admin/produtos`):**
  - Clique em **"Novo Produto"**.
- [ ] **1.2. Preencher dados do item:**
  - **Nome:** `Boné Homens de Fé 2026`
  - **Categoria:** `Acessórios`
  - **Preço de Venda (R$):** `50,00`
  - **Custo Unitário (R$):** `20,00`
  - **Estoque Inicial:** `50`
- [ ] **1.3. Testar busca/cadastro de Investidor (`CpfSearchSelect`):**
  - Digite um CPF não cadastrado (ex: `12345678900`).
  - Ao digitar os 11 dígitos, veja a modal rápida de cadastro abrir automaticamente.
  - Cadastre o investidor (ex: `Silvia Pouey`).
  - Veja o investidor selecionado com badge verde.
- [ ] **1.4. Salvar Produto:**
  - Verifique se o produto aparece na listagem com o custo de R$ 20 e o investidor associado.

---

## 📋 Cenário 2: Prestação de Contas da Lojinha (Investidores)

> **Objetivo:** Verificar se os produtos com investidores aparecem antes mesmo das vendas ocorrerem.

- [ ] **2.1. Acessar `/admin/prestacao-contas`:**
  - Verifique os 4 KPI Cards do topo:
    - **Faturamento Total:** `R$ 0,00`
    - **Devolução a Investidores:** `R$ 0,00`
    - **Lucro Líquido do Retiro:** `R$ 0,00`
    - **Investimento Total Previsto:** `R$ 1.000,00` (50 unids $\times$ R$ 20,00).
- [ ] **2.2. Card do Investidor:**
  - O card da `Silvia Pouey` deve aparecer listando o Boné com barra de progresso em `0%`.

---

## 📋 Cenário 3: Venda no Ponto de Venda (PDV)

> **Objetivo:** Realizar venda rápida no caixa e validar o layout compacto dos cards.

- [ ] **3.1. Acessar `/admin/pdv`:**
  - Observe que o card do Boné possui tamanho fixo compacto, sem esticar a tela verticalmente.
- [ ] **3.2. Adicionar itens ao carrinho:**
  - Clique em **"Adicionar"** (adicione 2 unidades do Boné $\rightarrow$ Total: R$ 100,00).
- [ ] **3.3. Finalizar Venda:**
  - No carrinho à direita, informe o CPF do cliente.
  - Deixe marcado **"Pago na hora"** (Status `PAGO`).
  - Clique em **"Concluir Venda"**.

---

## 📋 Cenário 4: Dashboard & Gráfico Comparativo

> **Objetivo:** Validar os indicadores de lucro e o novo gráfico de custos.

- [ ] **4.1. Acessar `/admin/dashboard`:**
  - **Lucro Líquido do Retiro:** `R$ 60,00` (Margem de `60%`).
  - **Custo / Repasse Investidores:** `R$ 40,00` (2 unids $\times$ R$ 20,00).
  - **Faturamento Bruto Pago:** `R$ 100,00`.
- [ ] **4.2. Gráfico Comparativo:**
  - Veja as 3 barras no gráfico para o Boné:
    - Roxo (Faturamento): `R$ 100,00`
    - Amarelo (Custo): `R$ 40,00`
    - Verde (Lucro Líquido): `R$ 60,00`

---

## 📋 Cenário 5: Gestão de Despesas & Obras do Retiro

> **Objetivo:** Registrar custos de infraestrutura e itens comprados por irmãos.

- [ ] **5.1. Acessar `/admin/despesas`:**
  - Clique em **"Nova Despesa / Obra"**.
  - **Título:** `Reforma Elétrica da Cozinha`
  - **Tipo/Categoria:** `Obra & Reforma` (Infraestrutura)
  - Salvar.
- [ ] **5.2. Lançar Item Comprado:**
  - No grupo criado, clique em **"Adicionar Item Comprado"**.
  - **Descrição:** `Cabos 6mm e Disjuntores`
  - **CPF de Quem Pagou:** Use a busca inteligente para localizar ou cadastrar um irmão (ex: `Lucas Eletricista`).
  - **Valor (R$):** `300,00`
  - *(Opcional)* Anexe uma foto de comprovante/cupom fiscal.
  - Salvar Item.
- [ ] **5.3. Testar Item de Doação:**
  - Adicione outro item: `Tinta Branca`, ative a opção **"Este item é uma Doação?"**.
  - O valor deve zerar e o item ficar como doação sem necessidade de reembolso.

---

## 📋 Cenário 6: Entradas de Receitas Extras do Evento

> **Objetivo:** Lançar arrecadações extras para compor o caixa global.

- [ ] **6.1. Na tela de Despesas, vá na aba `Entradas de Receita`:**
  - Veja a linha automática da **Lojinha do Retiro** com o faturamento e custo atualizados.
- [ ] **6.2. Lançar Rifa Beneficente:**
  - Clique em **"Lançar Nova Entrada"**.
  - **Origem:** `Rifa da Moto`
  - **Tipo:** `Rifa Beneficente`
  - **Valor:** `1.500,00`
  - Salvar.
- [ ] **6.3. Lançar Inscrições:**
  - Clique em **"Lançar Nova Entrada"**.
  - **Origem:** `Inscrições Lote 1`
  - **Tipo:** `Inscrições do Retiro`
  - **Valor:** `2.000,00`
  - Salvar.

---

## 📋 Cenário 7: Extrato por Irmão & Baixa em Reembolso

> **Objetivo:** Verificar o extrato individual de cada financiador e dar baixa no pagamento.

- [ ] **7.1. Vá na aba `Extrato por Irmão / Pagador`:**
  - Localize o `Lucas Eletricista`:
    - Total Gasto: `R$ 300,00`
    - Saldo a Devolver: `R$ 300,00`
- [ ] **7.2. Dar Baixa no Reembolso:**
  - Na aba **Despesas & Obras**, localize o item `Cabos 6mm` e clique no botão **"Dar Baixa"**.
  - Informe o valor total reembolsado: `300,00` e confirme.
  - Volte na aba **Extrato por Irmão** e confirme que o irmão agora está com o badge verde **"Quitado ✅"** e saldo `R$ 0,00`.

---

## 📋 Cenário 8: Relatório Geral Consolidado & Impressão

> **Objetivo:** Auditar os números finais e testar a geração do relatório em PDF.

- [ ] **8.1. Vá na aba `📑 Relatório Geral Consolidado`:**
  - **(+) Total de Entradas / Caixa:** `R$ 3.560,00` (Rifa R$ 1.500 + Inscrições R$ 2.000 + Lucro Lojinha R$ 60).
  - **(-) Custos Gerais:** Soma de Obras (`R$ 300`) + Investimento da Lojinha (`R$ 1.000`).
  - **(=) Saldo Líquido Final do Retiro:** `R$ 3.260,00` (Superávit Real).
- [ ] **8.2. Testar Impressão / PDF:**
  - Clique em **"🖨️ Imprimir Relatório Completo (A4)"**.
  - O navegador deve abrir a pré-visualização de impressão com cabeçalho formal, layout limpo (sem botões) e tabelas discriminadas.
