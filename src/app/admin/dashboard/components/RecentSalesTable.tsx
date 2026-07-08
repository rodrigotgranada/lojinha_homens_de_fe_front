import React from "react";
import { useDashboard } from "../context/DashboardContext";
import Link from "next/link";

export const RecentSalesTable = () => {
  const { sales, formatCurrency } = useDashboard();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm lg:col-span-3 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white">Vendas Recentes do Evento</h3>
          <p className="text-xs text-zinc-450 dark:text-zinc-400">Últimos registros emitidos no PDV para este evento.</p>
        </div>
        <Link
          href="/admin/vendas"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-750 hover:underline"
        >
          Ver todas as vendas
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800/80 text-zinc-450 dark:text-zinc-400 font-extrabold uppercase tracking-wider">
              <th className="py-2.5">ID</th>
              <th className="py-2.5">Cliente</th>
              <th className="py-2.5">Total</th>
              <th className="py-2.5">Status</th>
              <th className="py-2.5 text-right">Data/Hora</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/40 text-zinc-700 dark:text-zinc-300">
            {sales.slice(0, 5).map((sale) => {
              const customer = sale.customerId as any;
              const customerName = customer ? `${customer.firstName} ${customer.lastName}` : "Consumidor";
              return (
                <tr key={sale.id} className="py-3">
                  <td className="py-3 font-mono text-zinc-400">#{sale.id.slice(-8)}</td>
                  <td className="py-3 font-bold">{customerName}</td>
                  <td className="py-3 font-black text-zinc-900 dark:text-white">{formatCurrency(sale.totalPrice)}</td>
                  <td className="py-3">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      sale.status === "PAGO"
                        ? "bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-450 border-emerald-100 dark:border-emerald-900/30"
                        : sale.status === "PENDENTE"
                        ? "bg-amber-50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-450 border-amber-100 dark:border-amber-900/30"
                        : "bg-rose-50 dark:bg-rose-955/20 text-rose-600 dark:text-rose-455 border-rose-100 dark:border-rose-900/30"
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-zinc-400">{new Date(sale.createdAt).toLocaleString("pt-BR")}</td>
                </tr>
              );
            })}
            {sales.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-zinc-400">Nenhuma venda registrada neste evento.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
