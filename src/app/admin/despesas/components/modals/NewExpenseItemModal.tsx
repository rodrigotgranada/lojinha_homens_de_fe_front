"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CpfSearchSelect } from "@/components/ui/CpfSearchSelect";
import { HeartHandshake, Paperclip, Upload, ImageIcon } from "lucide-react";
import { useDespesas } from "../../context/DespesasContext";

export const NewExpenseItemModal: React.FC = () => {
  const {
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
    setIsQuickUserModalOpen,
    setQuickRegisterCpf,
    saving,
    formatCurrencyInput,
  } = useDespesas();

  return (
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
  );
};
