"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../../context/DespesasContext";

export const NewIncomeModal: React.FC = () => {
  const {
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
    saving,
    formatCurrencyInput,
  } = useDespesas();

  return (
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
          <Button
            type="submit"
            loading={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Salvar Entrada
          </Button>
        </div>
      </form>
    </Modal>
  );
};
