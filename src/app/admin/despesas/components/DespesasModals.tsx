"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CpfSearchSelect } from "@/components/ui/CpfSearchSelect";
import { QuickUserModal } from "@/components/QuickUserModal";
import { HeartHandshake, Paperclip, Upload, ImageIcon } from "lucide-react";
import { useDespesas } from "../context/DespesasContext";

export const DespesasModals: React.FC = () => {
  const {
    // Modal 1: Nova Obra / Despesa
    isGroupModalOpen,
    setIsGroupModalOpen,
    groupTitle,
    setGroupTitle,
    groupCategory,
    handleCategoryChange,
    groupDescription,
    setGroupDescription,
    handleCreateGroup,

    // Modal 2: Novo Item Comprado ou Doado
    isItemModalOpen,
    setIsItemModalOpen,
    itemDescription,
    setItemDescription,
    itemCpf,
    setItemCpf,
    itemPaidBy,
    setItemPaidBy,
    itemPayerPhone,
    setItemPayerPhone,
    itemIsDonation,
    setItemIsDonation,
    itemAmount,
    setItemAmount,
    itemNotes,
    setItemNotes,
    itemReceiptUrl,
    uploadingReceipt,
    handleReceiptUpload,
    handleAddItem,

    // Modal 3: Entrada de Receita
    isIncomeModalOpen,
    setIsIncomeModalOpen,
    incomeTitle,
    setIncomeTitle,
    incomeType,
    setIncomeType,
    customIncomeType,
    setCustomIncomeType,
    incomeAmount,
    setIncomeAmount,
    incomeNotes,
    setIncomeNotes,
    handleCreateIncome,

    // Modal 4: Reembolso rápido
    isRepayModalOpen,
    setIsRepayModalOpen,
    repayItemDescription,
    repayPayer,
    repayTotalAmount,
    repayCurrentValue,
    setRepayCurrentValue,
    handleSaveRepayment,

    // Quick user modal
    isQuickUserModalOpen,
    setIsQuickUserModalOpen,
    quickRegisterCpf,
    setQuickRegisterCpf,
    handleQuickUserSuccess,

    saving,
    formatMoney,
    formatCurrencyInput
  } = useDespesas();

  return (
    <>
      {/* ========================================================================= */}
      {/* MODAL 1: NOVA DESPESA / OBRA */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        title="Cadastrar Despesa / Obra do Evento"
      >
        <form onSubmit={handleCreateGroup} className="flex flex-col gap-4">
          <Input
            label="Título da Despesa / Obra *"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
            placeholder="Ex: Reforma do Banheiro ou Rancho de Alimentação"
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Tipo / Categoria da Despesa *
            </label>
            <select
              value={groupCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <optgroup label="🏗️ Infraestrutura / Obras (Fica como Benfeitoria)">
                <option value="OBRA">🏗️ Obra & Reforma (Banheiro, Elétrica, Pintura)</option>
                <option value="LOCACAO">🏡 Locação do Sítio / Espaço</option>
                <option value="ESTRUTURA">💡 Estrutura, Palco, Som & Luz</option>
              </optgroup>
              <optgroup label="🍽️ Operacional / Consumo (Gasto nos dias do Retiro)">
                <option value="ALIMENTACAO">🍽️ Alimentação, Cozinha & Gás</option>
                <option value="TRANSPORTE">🚗 Transporte & Combustível</option>
                <option value="OUTROS">📦 Outros Consumíveis & Limpeza</option>
              </optgroup>
            </select>
          </div>

          <Input
            label="Descrição / Observações (Opcional)"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="Ex: Materiais elétricos e hidráulicos"
          />

          <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsGroupModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={saving}>
              Criar Despesa
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: NOVO ITEM / MATERIAL DA OBRA */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        title="Lançar Item Comprado ou Doado"
      >
        <form onSubmit={handleAddItem} className="flex flex-col gap-4">
          <Input
            label="Descrição do Item / Material *"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Ex: Torneira cromada para a pia"
            required
          />

          {/* Campo de Busca Inteligente por CPF com Autocomplete */}
          <div className="space-y-2">
            <CpfSearchSelect
              label="CPF de Quem Pagou / Doou *"
              id="expense-item-cpf"
              placeholder="Digite o CPF ou Nome do participante..."
              value={itemCpf}
              onChange={(newCpf, selectedUser) => {
                setItemCpf(newCpf);
                if (selectedUser) {
                  setItemPaidBy(`${selectedUser.firstName} ${selectedUser.lastName}`);
                  setItemPayerPhone(selectedUser.phone || "");
                } else if (!newCpf) {
                  setItemPaidBy("");
                  setItemPayerPhone("");
                }
              }}
              onAddNewUser={(typedCpf) => {
                setQuickRegisterCpf(typedCpf);
                setIsQuickUserModalOpen(true);
              }}
            />
            {itemPaidBy && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                    Usuário Identificado
                  </span>
                  <span className="text-sm font-black text-zinc-950 dark:text-emerald-100">
                    {itemPaidBy}
                  </span>
                </div>
                {itemPayerPhone && (
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 font-semibold bg-white/70 dark:bg-zinc-800/80 px-2.5 py-1 rounded-lg">
                    {itemPayerPhone}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Toggle Doação vs Compra */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                <HeartHandshake className="h-4 w-4 text-pink-500" />
                Este item é uma Doação?
              </span>
              <span className="text-[10px] text-zinc-400">
                Se marcado, o custo financeiro será R$ 0,00 e o participante não precisará de reembolso.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={itemIsDonation}
                onChange={(e) => setItemIsDonation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-zinc-300 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>

          {!itemIsDonation && (
            <Input
              label={itemPaidBy ? `Valor pago por ${itemPaidBy} (R$) *` : "Valor Pago (R$) *"}
              value={itemAmount}
              onChange={(e) => setItemAmount(formatCurrencyInput(e.target.value))}
              placeholder="Ex: 80,00"
              required={!itemIsDonation}
            />
          )}

          {/* Upload Opcional de Comprovante / Cupom Fiscal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5 text-zinc-400" />
                Comprovante / Foto da Nota (Opcional)
              </span>
              {itemReceiptUrl && (
                <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                  ✓ Anexado
                </span>
              )}
            </label>

            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-all cursor-pointer">
                <Upload className="h-4 w-4 text-indigo-500" />
                {uploadingReceipt ? "Enviando arquivo..." : itemReceiptUrl ? "Trocar Comprovante" : "Selecionar Foto / Cupom Fiscal"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  disabled={uploadingReceipt}
                />
              </label>

              {itemReceiptUrl && (
                <a
                  href={itemReceiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <ImageIcon className="h-4 w-4" />
                  Ver
                </a>
              )}
            </div>
          </div>

          <Input
            label="Observações Adicionais (Opcional)"
            value={itemNotes}
            onChange={(e) => setItemNotes(e.target.value)}
            placeholder="Ex: Comprado com desconto"
          />

          <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsItemModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={saving}>
              Salvar Item
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: LANÇAR ENTRADA DE RECEITA DO EVENTO */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        title="Lançar Entrada de Receita do Evento"
      >
        <form onSubmit={handleCreateIncome} className="flex flex-col gap-4">
          <Input
            label="Origem / Descrição da Entrada *"
            value={incomeTitle}
            onChange={(e) => setIncomeTitle(e.target.value)}
            placeholder="Ex: Inscrições dos 80 participantes"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Tipo de Entrada *
              </label>
              <select
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="INSCRICOES">Inscrições do Retiro</option>
                <option value="RIFA">Rifa Beneficente</option>
                <option value="EVENTO_BENEFICENTE">Janta / Almoço Beneficente</option>
                <option value="DOACAO">Doação em Dinheiro</option>
                <option value="OUTRO_CUSTOM">➕ Outro Tipo Personalizado...</option>
              </select>
            </div>

            <Input
              label="Valor Arrecadado (R$) *"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(formatCurrencyInput(e.target.value))}
              placeholder="Ex: 5.000,00"
              required
            />
          </div>

          {incomeType === "OUTRO_CUSTOM" && (
            <Input
              label="Nome do Tipo Personalizado *"
              value={customIncomeType}
              onChange={(e) => setCustomIncomeType(e.target.value)}
              placeholder="Ex: Patrocínio de Empresa, Venda de Bolos..."
              required
            />
          )}

          <Input
            label="Observações (Opcional)"
            value={incomeNotes}
            onChange={(e) => setIncomeNotes(e.target.value)}
            placeholder="Ex: Lote 1 pago via Pix"
          />

          <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsIncomeModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Salvar Entrada
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 4: DAR BAIXA EM REEMBOLSO */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isRepayModalOpen}
        onClose={() => setIsRepayModalOpen(false)}
        title="Registrar Reembolso ao Irmão"
      >
        <form onSubmit={handleSaveRepayment} className="flex flex-col gap-4">
          <div className="bg-amber-50 dark:bg-amber-955/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] uppercase font-black text-amber-600 dark:text-amber-400">Resumo da Despesa</span>
            <p className="font-extrabold text-sm text-zinc-900 dark:text-white">{repayItemDescription}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Irmão a reembolsar: <strong>{repayPayer}</strong> | Custo Original: <strong>{formatMoney(repayTotalAmount)}</strong>
            </p>
          </div>

          <Input
            label="Valor Total Reembolsado ao Irmão (R$) *"
            value={repayCurrentValue}
            onChange={(e) => setRepayCurrentValue(formatCurrencyInput(e.target.value))}
            placeholder="Ex: 80,00"
            required
          />

          <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsRepayModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={saving} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              Confirmar Baixa
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Cadastro Rápido de Participante/Irmão via CPF */}
      <QuickUserModal
        isOpen={isQuickUserModalOpen}
        onClose={() => setIsQuickUserModalOpen(false)}
        cpf={quickRegisterCpf}
        onSuccess={handleQuickUserSuccess}
      />
    </>
  );
};
