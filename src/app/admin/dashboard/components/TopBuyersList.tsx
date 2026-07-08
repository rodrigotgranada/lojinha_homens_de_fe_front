import React from "react";
import { useDashboard } from "../context/DashboardContext";

export const TopBuyersList = () => {
  const { analytics, formatCurrency } = useDashboard();

  if (!analytics) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Maiores Compradores</h3>
        <p className="text-xs text-zinc-450 dark:text-zinc-400">Top Clientes com maior valor acumulado de compra no evento.</p>
      </div>
      <div className="overflow-y-auto max-h-[300px] divide-y divide-zinc-100 dark:divide-zinc-800/60 pr-1">
        {analytics.topBuyers.map((buyer, idx) => (
          <div key={idx} className="py-3 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-955/40 text-indigo-600 dark:text-indigo-455 font-extrabold flex items-center justify-center text-xs">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{buyer.name}</p>
                <p className="text-[10px] text-zinc-400">CPF: {buyer.cpf}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-zinc-900 dark:text-white">{formatCurrency(buyer.totalSpent)}</p>
              <p className="text-[10px] text-zinc-400">{buyer.purchasesCount} compras</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
