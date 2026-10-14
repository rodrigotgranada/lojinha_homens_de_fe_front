"use client";

import React from "react";
import { Users, CheckCircle2, HandCoins, ArrowRight, MessageCircle } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";
import { InvestorReportItem } from "@/types";

export const InvestidoresLojinhaTab: React.FC = () => {
  const { investorsList, formatMoney, setSelectedInvestor, setIsRepaymentModalOpen } = useCustosLoja();

  const handleOpenRepay = (investor: InvestorReportItem) => {
    setSelectedInvestor(investor);
    setIsRepaymentModalOpen(true);
  };

  if (investorsList.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xs space-y-3">
        <Users className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
        <h3 className="font-extrabold text-base text-zinc-800 dark:text-zinc-200">
          Nenhum investidor registrado nesta edição
        </h3>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Quando produtos forem cadastrados com patrocínio ou investimento de irmãos, a prestação de contas individual aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {investorsList.map((investor, idx) => {
        const isFullyRecovered = investor.repaymentProgress >= 100;
        const pendingAmount = Math.max(0, investor.totalInvested - investor.totalToRepay);

        return (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs flex flex-col gap-5 break-inside-avoid"
          >
            {/* Header of Investor */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-955/50 text-amber-800 dark:text-amber-300 flex items-center justify-center font-black text-lg shrink-0">
                  {investor.sponsorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    {investor.sponsorName}
                    {isFullyRecovered && (
                      <span className="bg-emerald-50 dark:bg-emerald-955/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/50 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        100% Quitado
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {investor.products.length} produto(s) financiado(s) • {investor.totalSoldQuantity} peças vendidas
                  </p>
                </div>
              </div>

              {/* Action buttons & financial tags */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Total Investido
                    </span>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {formatMoney(investor.totalInvested)}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-700" />
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Já Devolvido
                    </span>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                      {formatMoney(investor.totalToRepay)}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-700" />
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Saldo a Devolver
                    </span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      {formatMoney(pendingAmount)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenRepay(investor)}
                  className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <HandCoins className="w-4 h-4" />
                  <span>Registrar Devolução</span>
                </button>
              </div>
            </div>

            {/* Repayment Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Progresso de Recuperação do Capital (
                  {formatMoney(investor.totalToRepay)} de {formatMoney(investor.totalInvested)})
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {investor.repaymentProgress}%
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, investor.repaymentProgress)}%` }}
                />
              </div>
            </div>

            {/* Products Financed by this investor */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Produto</th>
                    <th className="py-2.5 px-3 text-right">Custo Unit.</th>
                    <th className="py-2.5 px-3 text-right">Preço Venda</th>
                    <th className="py-2.5 px-3 text-center">Tiragem</th>
                    <th className="py-2.5 px-3 text-center">Vendidos</th>
                    <th className="py-2.5 px-3 text-center">Estoque</th>
                    <th className="py-2.5 px-3 text-right">Investido</th>
                    <th className="py-2.5 px-3 text-right">A Devolver</th>
                    <th className="py-2.5 px-3 text-right">Lucro pro Retiro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {investor.products.map((p) => (
                    <tr key={p.productId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50">
                      <td className="py-2.5 px-3 font-bold text-zinc-800 dark:text-zinc-200">
                        {p.name}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-zinc-500">
                        {formatMoney(p.costPrice)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-zinc-800 dark:text-zinc-200">
                        {formatMoney(p.salePrice)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-zinc-500">{p.initialStock}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-amber-600 dark:text-amber-400">
                        {p.soldQuantity}
                      </td>
                      <td className="py-2.5 px-3 text-center text-zinc-500">{p.currentStock}</td>
                      <td className="py-2.5 px-3 text-right text-zinc-600 dark:text-zinc-400">
                        {formatMoney(p.investedAmount)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-blue-600 dark:text-blue-400">
                        {formatMoney(p.costToRepay)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                        {formatMoney(p.totalProfit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};
