"use client";

import React from "react";
import { Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useLogs } from "../context/LogsContext";

export const LogsFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    actionFilter,
    setActionFilter,
    events,
    selectedEventId,
    setSelectedEventId
  } = useLogs();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="w-full lg:w-96">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por descrição ou operador..."
          className="text-sm font-medium"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center w-full lg:w-auto">
        {/* Event Select Dropdown */}
        <div className="flex gap-2 items-center w-full md:w-auto relative">
          <span className="text-xs text-zinc-450 font-bold flex items-center gap-1.5 shrink-0">
            <Calendar className="h-4 w-4 text-indigo-500" />
            Retiro:
          </span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-2.5 pr-8 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto appearance-none"
          >
            <option value="all">Todos os Eventos</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} {evt.isActive ? "(Ativo)" : ""}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Categoria Select Dropdown */}
        <div className="flex gap-2 items-center w-full md:w-auto relative">
          <span className="text-xs text-zinc-450 font-bold flex items-center gap-1.5 shrink-0">
            <Filter className="h-4 w-4 text-indigo-500" />
            Categoria:
          </span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-2.5 pr-8 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto appearance-none"
          >
            <option value="all">Todas as Atividades</option>
            <option value="vendas">Vendas / Checkouts</option>
            <option value="estoque">Movimentações de Estoque</option>
            <option value="produtos">Alterações de Produto</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
