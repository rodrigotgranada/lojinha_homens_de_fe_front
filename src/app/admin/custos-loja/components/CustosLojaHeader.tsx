"use client";

import React from "react";
import { Store, Plus, RefreshCw, Calendar, Sparkles } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";

export const CustosLojaHeader: React.FC = () => {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    loading,
    loadData,
    setIsExpenseModalOpen,
  } = useCustosLoja();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-955/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/40">
            <Store className="w-3.5 h-3.5 text-amber-500" />
            Lojinha do Retiro
          </span>

          {selectedEvent && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {selectedEvent.name}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2.5">
          Custos & Investimentos da Lojinha
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm max-w-2xl">
          Controle dedicado de confecção de produtos, doações, investidores que financiaram os lotes da Lojinha e despesas operacionais desta edição.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
        {/* Event selector */}
        {events.length > 1 && (
          <div className="relative">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 pr-8 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 transition-all cursor-pointer shadow-xs"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name} {ev.isActive ? "(Ativo)" : ""}
                </option>
              ))}
            </select>
            <Calendar className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        )}

        <button
          onClick={loadData}
          disabled={loading}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          title="Atualizar dados financeiros"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>

        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nova Despesa da Loja
        </button>
      </div>
    </div>
  );
};
