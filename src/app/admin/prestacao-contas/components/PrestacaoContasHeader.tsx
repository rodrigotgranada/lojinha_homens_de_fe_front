"use client";

import React from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePrestacaoContas } from "../context/PrestacaoContasContext";

export const PrestacaoContasHeader: React.FC = () => {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    handlePrint
  } = usePrestacaoContas();

  return (
    <>
      {/* Header com Ações & Impressão */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <span className="bg-amber-50 dark:bg-amber-955/40 text-amber-700 dark:text-amber-400 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-900/30 uppercase tracking-wider">
            Lojinha & Confecção
          </span>
          <h1 className="text-3xl font-black text-zinc-950 dark:text-white mt-1">
            Prestação de Contas da Lojinha (Investidores & Confecção)
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Acompanhe o capital investido antecipadamente na produção de produtos da loja (camisetas, terços), devolução de custos das peças vendidas e lucro líquido do Retiro.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all min-w-[200px]"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} {e.isActive ? "(Ativo)" : ""}
              </option>
            ))}
          </select>

          <Button onClick={handlePrint} className="flex items-center gap-2 cursor-pointer">
            <Printer className="h-4 w-4" />
            Imprimir Relatório
          </Button>
        </div>
      </div>

      {/* Cabeçalho exclusivo para impressão */}
      <div className="hidden print:block border-b border-zinc-300 pb-4 mb-4">
        <h1 className="text-2xl font-black text-zinc-900">Relatório de Prestação de Contas - Homens de Fé</h1>
        <p className="text-sm text-zinc-600 mt-1">
          Evento: <strong>{selectedEvent?.name}</strong> | Gerado em: {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
        </p>
      </div>
    </>
  );
};
