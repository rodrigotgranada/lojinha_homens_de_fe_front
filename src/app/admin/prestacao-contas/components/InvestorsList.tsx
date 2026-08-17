"use client";

import React from "react";
import { Package, CheckCircle2 } from "lucide-react";
import { usePrestacaoContas } from "../context/PrestacaoContasContext";

export const InvestorsList: React.FC = () => {
  const { investorsList } = usePrestacaoContas();

  if (investorsList.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl py-16 px-6 text-center shadow-xs flex flex-col items-center justify-center gap-3">
        <Package className="h-12 w-12 text-zinc-400 opacity-60" />
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Nenhum patrocinador ou produto vendido ainda</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-md">
          Quando as vendas forem efetuadas no PDV para produtos com custos e patrocinadores cadastrados, a prestação de contas detalhada aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {investorsList.map((investor, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-5 break-inside-avoid"
        >
          {/* Topo do Investidor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-955/40 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-lg">
                {investor.sponsorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
                  {investor.sponsorName}
                  {investor.repaymentProgress >= 100 && (
                    <span className="bg-emerald-50 dark:bg-emerald-955/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/50 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Investimento 100% Recuperado
                    </span>
                  )}
                </h3>
                <p className="text-xs text-zinc-500">
                  {investor.products.length} produto(s) patrocinado(s) · {investor.totalSoldQuantity} unidades vendidas
                </p>
              </div>
            </div>

            {/* Resumo Financeiro do Investidor */}
            <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-955 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  A Devolver (Custo)
                </span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400">
                  R$ {investor.totalToRepay.toFixed(2)}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Lucro pro Retiro
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  R$ {investor.totalProfitForRetreat.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Barra de Progresso de Quitação do Investimento */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-600 dark:text-zinc-400">
                Recuperação do Capital Investido (R$ {investor.totalToRepay.toFixed(2)} de R$ {investor.totalInvested.toFixed(2)})
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {investor.repaymentProgress}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, investor.repaymentProgress)}%` }}
              />
            </div>
          </div>

          {/* Tabela dos Produtos Financiados por este Investidor */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Produto</th>
                  <th className="py-2.5 px-3 text-right">Custo Unit.</th>
                  <th className="py-2.5 px-3 text-right">Venda Unit.</th>
                  <th className="py-2.5 px-3 text-center">Tiragem Total</th>
                  <th className="py-2.5 px-3 text-center">Qtd Vendida</th>
                  <th className="py-2.5 px-3 text-center">Estoque Restante</th>
                  <th className="py-2.5 px-3 text-right text-amber-600 dark:text-amber-400 font-black">Devolver (Custo)</th>
                  <th className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400 font-black">Lucro Retiro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                {investor.products.map((p, pIdx) => (
                  <tr key={pIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="py-3 px-3 font-bold text-zinc-900 dark:text-white">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-400">
                      R$ {p.costPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-zinc-800 dark:text-zinc-200">
                      R$ {p.salePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {p.initialStock}
                    </td>
                    <td className="py-3 px-3 text-center font-black text-indigo-600 dark:text-indigo-400">
                      {p.soldQuantity}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-zinc-500">
                      {p.currentStock}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-amber-700 dark:text-amber-400">
                      R$ {p.costToRepay.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                      R$ {p.totalProfit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
