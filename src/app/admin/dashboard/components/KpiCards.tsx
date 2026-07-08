import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { DollarSign, Clock, ShoppingBag, Package } from "lucide-react";

export const KpiCards = () => {
  const { analytics, sales, formatCurrency } = useDashboard();

  if (!analytics) return null;

  const totalItemsSold = sales.reduce(
    (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Faturamento Pago */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Faturamento Pago</p>
            <h3 className="text-2xl font-black text-zinc-955 dark:text-white mt-1">
              {formatCurrency(analytics.summary.totalRevenue)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-955/30 text-emerald-500 rounded-2xl">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          <span className="font-semibold text-emerald-600">{analytics.summary.pagoCount} vendas</span> finalizadas com sucesso.
        </div>
      </div>

      {/* Faturamento Pendente */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Contas Pendentes</p>
            <h3 className="text-2xl font-black text-zinc-955 dark:text-white mt-1">
              {formatCurrency(analytics.summary.pendingRevenue)}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-955/30 text-amber-500 rounded-2xl">
            <Clock className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          <span className="font-semibold text-amber-600">{analytics.summary.pendenteCount} vendas</span> em aberto no fiado/ficha.
        </div>
      </div>

      {/* Transações Totais */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Volume de Vendas</p>
            <h3 className="text-2xl font-black text-zinc-955 dark:text-white mt-1">
              {analytics.summary.totalSalesCount}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-955/30 text-indigo-500 rounded-2xl">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          Total de pedidos efetuados no PDV.
        </div>
      </div>

      {/* Itens Vendidos */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Itens Vendidos</p>
            <h3 className="text-2xl font-black text-zinc-955 dark:text-white mt-1">
              {totalItemsSold}
            </h3>
          </div>
          <div className="p-3 bg-cyan-50 dark:bg-cyan-955/30 text-cyan-500 rounded-2xl">
            <Package className="h-6 w-6" />
          </div>
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-4">
          Total de lembranças e itens entregues no PDV.
        </div>
      </div>
    </div>
  );
};
