"use client";

import React from "react";
import { Plus, DollarSign, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../context/DespesasContext";

export const DespesasHeader: React.FC = () => {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    setIsGroupModalOpen,
    setIsIncomeModalOpen,
    handlePrint
  } = useDespesas();

  return (
    <>
      {/* Header Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-900/30 uppercase tracking-wider">
            Operacional, Obras & Caixa
          </span>
          <h1 className="text-3xl font-black text-zinc-950 dark:text-white mt-1">
            Gestão de Despesas & Obras do Evento
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Separação clara entre custos de Infraestrutura (Obras) e Operacionais (Consumíveis do Retiro).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all min-w-[180px]"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} {e.isActive ? "(Ativo)" : ""}
              </option>
            ))}
          </select>

          <Button
            onClick={() => setIsGroupModalOpen(true)}
            className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Nova Despesa / Obra
          </Button>

          <Button
            onClick={() => setIsIncomeModalOpen(true)}
            variant="secondary"
            className="flex items-center gap-2 cursor-pointer border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
          >
            <DollarSign className="h-4 w-4" />
            Lançar Receita
          </Button>

          <Button onClick={handlePrint} variant="secondary" className="flex items-center gap-2 cursor-pointer">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Impressão Header */}
      <div className="hidden print:block border-b border-zinc-300 pb-4 mb-4">
        <h1 className="text-2xl font-black text-zinc-900">Relatório Operacional de Despesas e Obras</h1>
        <p className="text-sm text-zinc-600 mt-1">
          Evento: <strong>{selectedEvent?.name}</strong> | Gerado em: {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
        </p>
      </div>
    </>
  );
};
