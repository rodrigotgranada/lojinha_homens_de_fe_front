import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const TopProductsChart = () => {
  const { analytics } = useDashboard();

  if (!analytics) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm lg:col-span-2 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Produtos Mais Vendidos</h3>
        <p className="text-xs text-zinc-450 dark:text-zinc-400">Ranking dos 10 itens com maior volume de saída.</p>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analytics.topSellingProducts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} tickLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} />
            <Tooltip formatter={(value, name) => [value, name === "quantity" ? "Unidades vendidas" : name]} />
            <Bar dataKey="quantity" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
