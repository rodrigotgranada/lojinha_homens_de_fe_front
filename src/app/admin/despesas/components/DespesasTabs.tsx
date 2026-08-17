"use client";

import React from "react";
import { Layers, Users, DollarSign, Filter } from "lucide-react";
import { useDespesas } from "../context/DespesasContext";

export const DespesasTabs: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    expensesList,
    payersReport,
    incomesList,
    natureFilter,
    setNatureFilter
  } = useDespesas();

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-2 print:hidden justify-between items-center">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("obras")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "obras"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4" />
          Despesas & Obras ({expensesList.length})
        </button>

        <button
          onClick={() => setActiveTab("irmãos")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "irmãos"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Users className="h-4 w-4" />
          Extrato por Irmão / Pagador ({payersReport.length})
        </button>

        <button
          onClick={() => setActiveTab("receitas")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "receitas"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <DollarSign className="h-4 w-4" />
          Entradas de Receita ({incomesList.length})
        </button>

        <button
          onClick={() => setActiveTab("relatorio")}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "relatorio"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <span className="text-base">📑</span>
          Relatório Geral Consolidado
        </button>
      </div>

      {/* Filtro por Natureza (Apenas na aba de despesas) */}
      {activeTab === "obras" && (
        <div className="flex items-center gap-1.5 pb-2">
          <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filtrar:
          </span>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setNatureFilter("ALL")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                natureFilter === "ALL" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Todas ({expensesList.length})
            </button>
            <button
              onClick={() => setNatureFilter("INFRAESTRUTURA")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                natureFilter === "INFRAESTRUTURA" ? "bg-indigo-600 text-white shadow-xs" : "text-zinc-500 hover:text-indigo-600"
              }`}
            >
              🏗️ Obras
            </button>
            <button
              onClick={() => setNatureFilter("OPERACIONAL")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                natureFilter === "OPERACIONAL" ? "bg-orange-600 text-white shadow-xs" : "text-zinc-500 hover:text-orange-600"
              }`}
            >
              🍽️ Operacional
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
