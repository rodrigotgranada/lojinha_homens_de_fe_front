"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../../context/DespesasContext";

export const NewExpenseGroupModal: React.FC = () => {
  const {
    isGroupModalOpen,
    setIsGroupModalOpen,
    groupTitle,
    setGroupTitle,
    groupCategory,
    handleCategoryChange,
    groupDescription,
    setGroupDescription,
    handleCreateGroup,
    saving,
  } = useDespesas();

  return (
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
  );
};
