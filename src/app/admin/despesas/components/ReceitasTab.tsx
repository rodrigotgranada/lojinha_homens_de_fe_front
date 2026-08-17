"use client";

import React from "react";
import { Plus, Store, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../context/DespesasContext";

export const ReceitasTab: React.FC = () => {
  const {
    incomesList,
    summaryData,
    setIsIncomeModalOpen,
    handleDeleteIncome,
    formatMoney
  } = useDespesas();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">
              Entradas Financeiras do Evento
            </h3>
            <p className="text-xs text-zinc-500">
              Arrecadações extras como inscrições, rifas e jantas beneficentes para compor o caixa do retiro.
            </p>
          </div>

          <Button
            onClick={() => setIsIncomeModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs font-bold"
          >
            <Plus className="h-4 w-4" />
            Lançar Nova Entrada
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Descrição / Origem</th>
                <th className="py-2.5 px-3">Tipo</th>
                <th className="py-2.5 px-3">Data</th>
                <th className="py-2.5 px-3 text-right">Valor Arrecadado</th>
                <th className="py-2.5 px-3 text-right print:hidden">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
              {/* Linha Automática das Vendas da Lojinha */}
              <tr className="bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                      <Store className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-indigo-950 dark:text-indigo-200 block text-sm">
                        Vendas da Lojinha do Retiro
                      </span>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400">
                        Faturamento Total: {formatMoney(summaryData?.summary.lojinhaRevenue || 0)} | Custo de Reposição: {formatMoney(summaryData?.summary.lojinhaCost || 0)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                    LOJINHA (AUTOMÁTICO)
                  </span>
                </td>
                <td className="py-3 px-3 text-indigo-900 dark:text-indigo-300 font-semibold">
                  Ao Vivo / Durante o Retiro
                </td>
                <td className="py-3 px-3 text-right font-black text-indigo-700 dark:text-indigo-400 text-sm">
                  {formatMoney(summaryData?.summary.lojinhaRevenue || 0)}
                </td>
                <td className="py-3 px-3 text-right text-[10px] text-zinc-400 font-bold print:hidden">
                  Automático
                </td>
              </tr>

              {/* Entradas Extras Cadastradas */}
              {incomesList.map((inc) => (
                <tr key={inc.id || inc._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-3 px-3">
                    <span className="font-bold text-zinc-900 dark:text-white block">
                      {inc.title}
                    </span>
                    {inc.notes && <span className="text-[10px] text-zinc-400">{inc.notes}</span>}
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                      {inc.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-500">
                    {new Date(inc.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatMoney(inc.amount)}
                  </td>
                  <td className="py-3 px-3 text-right print:hidden">
                    <button
                      onClick={() => handleDeleteIncome(inc.id || inc._id || "")}
                      className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                      title="Remover entrada"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
