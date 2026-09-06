"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../../context/DespesasContext";

export const QuickRepaymentModal: React.FC = () => {
  const {
    isRepayModalOpen,
    setIsRepayModalOpen,
    repayItemDescription,
    repayPayer,
    repayTotalAmount,
    repayCurrentValue,
    setRepayCurrentValue,
    handleSaveRepayment,
    saving,
    formatMoney,
    formatCurrencyInput,
  } = useDespesas();

  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [repayNotes, setRepayNotes] = useState("");

  return (
    <Modal
      isOpen={isRepayModalOpen}
      onClose={() => setIsRepayModalOpen(false)}
      title="Registrar Reembolso / Parcela ao Irmão"
    >
      <form onSubmit={handleSaveRepayment} className="flex flex-col gap-4">
        <div className="bg-amber-50 dark:bg-amber-955/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-black text-amber-600 dark:text-amber-400">
            Resumo da Despesa
          </span>
          <p className="font-extrabold text-sm text-zinc-900 dark:text-white">
            {repayItemDescription}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Irmão a reembolsar: <strong>{repayPayer}</strong> | Custo Original:{" "}
            <strong>{formatMoney(repayTotalAmount)}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Valor do Repasse (R$) *"
            value={repayCurrentValue}
            onChange={(e) => setRepayCurrentValue(formatCurrencyInput(e.target.value))}
            placeholder="Ex: 80,00"
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Forma de Pagamento
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="PIX">Pix Transferência</option>
              <option value="DINHEIRO">Dinheiro em Espécie</option>
              <option value="TRANSFERENCIA">Transferência Bancária</option>
              <option value="OUTRO">Outro / Acordo</option>
            </select>
          </div>
        </div>

        <Input
          label="Observações / Comprovante (Opcional)"
          value={repayNotes}
          onChange={(e) => setRepayNotes(e.target.value)}
          placeholder="Ex: Pago pelo caixa do retiro no domingo"
        />

        <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsRepayModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={saving}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
          >
            Confirmar Reembolso
          </Button>
        </div>
      </form>
    </Modal>
  );
};
