"use client";

import React from "react";
import { Users, CheckCircle2 } from "lucide-react";
import { useDespesas } from "../context/DespesasContext";

export const IrmaosTab: React.FC = () => {
  const { payersReport, formatMoney } = useDespesas();

  if (payersReport.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl py-16 px-6 text-center shadow-xs flex flex-col items-center justify-center gap-3">
        <Users className="h-12 w-12 text-zinc-400 opacity-60" />
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Nenhum irmão lançou compras ainda</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-md">
          Quando os itens forem adicionados às obras discriminando quem comprou, o extrato individual de cada financiador aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">
              Prestação de Contas Individual por Financiador
            </h3>
            <p className="text-xs text-zinc-500">
              Consolidado de quanto cada irmão tirou do bolso para o retiro e saldo restante a devolver.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payersReport.map((payer, pIdx) => (
            <div
              key={pIdx}
              className="border border-zinc-150 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-950/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black">
                    {payer.payerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                      {payer.payerName}
                      {payer.isFullyRepaid && (
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Quitado
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-zinc-400">{payer.items.length} item(ns) vinculados</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Saldo a Devolver</span>
                  <span className={`text-base font-black ${payer.balanceToRepay > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {formatMoney(payer.balanceToRepay)}
                  </span>
                </div>
              </div>

              {/* Lista dos Itens que ele pagou com Tag de Infra vs Operacional */}
              <div className="space-y-1.5 border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                {payer.items.map((it, itIdx) => (
                  <div key={itIdx} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[220px]">
                      {it.nature === "INFRAESTRUTURA" ? "🏗️" : "🍽️"} {it.description} <span className="text-[10px] text-zinc-400">({it.expenseTitle})</span>
                    </span>
                    <span className="font-bold text-zinc-900 dark:text-white shrink-0">
                      {it.isDonation ? <span className="text-pink-600">Doação</span> : formatMoney(it.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-500">
                <span>Total Gasto: <strong>{formatMoney(payer.totalPaid)}</strong></span>
                <span>Devolvido: <strong className="text-emerald-600">{formatMoney(payer.totalRepaid)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
