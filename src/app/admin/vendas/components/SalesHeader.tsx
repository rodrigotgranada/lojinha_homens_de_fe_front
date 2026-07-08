import React from "react";
import { useSales } from "../context/SalesContext";
import { Printer } from "lucide-react";

export const SalesHeader = () => {
  const { setIsExportModalOpen } = useSales();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/30 uppercase tracking-wider">
          Auditoria de Caixa
        </span>
        <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
          Histórico e Estornos de Vendas
        </h1>
        <p className="text-zinc-550 dark:text-zinc-450 text-sm">
          Acompanhe todos os cupons fiscais emitidos no PDV, gerencie pendências e realize devoluções de estoque.
        </p>
      </div>

      <button
        onClick={() => setIsExportModalOpen(true)}
        className="flex items-center justify-center gap-2 px-5 py-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-850 dark:text-zinc-200 font-bold rounded-xl shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer text-sm shrink-0 self-start sm:self-center"
      >
        <Printer className="h-4.5 w-4.5 text-zinc-500" />
        Exportar Relatórios (PDF)
      </button>
    </div>
  );
};
