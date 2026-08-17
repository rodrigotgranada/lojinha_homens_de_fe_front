import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { DollarSign, Clock, TrendingUp, Wallet, ShoppingBag, Package } from "lucide-react";

export const KpiCards = () => {
  const { analytics, sales, formatCurrency } = useDashboard();

  if (!analytics) return null;

  const totalItemsSold = sales.reduce(
    (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  const totalCost = analytics.summary.totalCost ?? 0;
  const totalProfit = analytics.summary.totalProfit ?? (analytics.summary.totalRevenue - totalCost);
  const profitMargin = analytics.summary.profitMargin ?? (analytics.summary.totalRevenue > 0 ? (totalProfit / analytics.summary.totalRevenue) * 100 : 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Lucro Líquido do Retiro */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 bg-white dark:bg-zinc-900 border border-emerald-200/80 dark:border-emerald-900/50 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Lucro Líquido do Retiro</p>
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
              {formatCurrency(totalProfit)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-sm shadow-emerald-500/30">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-4">
          Margem média de <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{profitMargin.toFixed(1)}%</span> sobre as vendas.
        </div>
      </div>

      {/* Custo Total dos Produtos (CPV / Investidores) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Custo / Repasse Investidores</p>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
              {formatCurrency(totalCost)}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-955/30 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          Capital a ressarcir aos investidores/custos.
        </div>
      </div>

      {/* Faturamento Pago */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Faturamento Bruto Pago</p>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
              {formatCurrency(analytics.summary.totalRevenue)}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-955/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          <span className="font-semibold text-emerald-600">{analytics.summary.pagoCount} vendas</span> recebidas no caixa.
        </div>
      </div>

      {/* Contas Pendentes */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Contas Pendentes</p>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
              {formatCurrency(analytics.summary.pendingRevenue)}
            </h3>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-955/30 text-rose-500 rounded-2xl">
            <Clock className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          <span className="font-semibold text-amber-600">{analytics.summary.pendenteCount} vendas</span> em aberto no fiado/ficha.
        </div>
      </div>
    </div>
  );
};
