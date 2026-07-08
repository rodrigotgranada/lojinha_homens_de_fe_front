import React from "react";
import { useSales } from "../context/SalesContext";
import { Search, Calendar } from "lucide-react";

export const SalesFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    events,
    selectedEventId,
    setSelectedEventId
  } = useSales();

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-3 w-full lg:max-w-2xl">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Buscar por cliente, CPF ou ID da venda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Event Select Dropdown */}
        <div className="relative min-w-[200px]">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Calendar className="h-4.5 w-4.5" />
          </span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-10 py-3 text-sm text-zinc-800 dark:text-zinc-100 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer font-semibold"
          >
            <option value="all">Todos os Eventos</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} {evt.isActive ? "(Ativo)" : ""}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="flex gap-2 w-full lg:w-auto">
        {["all", "pago", "pendente", "cancelado"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider ${
              statusFilter === status
                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            {status === "all" ? "Todos" : status}
          </button>
        ))}
      </div>
    </div>
  );
};
