import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const SalesChart = () => {
  const { sales, formatCurrency } = useDashboard();

  // Group sales by day of the retreat
  const getDailyChartData = () => {
    const dailyStats: Record<string, number> = {};
    
    // Sort sales ascending by date
    const sortedSales = [...sales].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sortedSales.forEach((sale) => {
      if (!sale.createdAt) return;
      const date = new Date(sale.createdAt);
      if (isNaN(date.getTime())) return;
      
      let dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
      dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      
      const shortDate = ` (${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })})`;
      const label = `${dayName}${shortDate}`;
      
      dailyStats[label] = (dailyStats[label] || 0) + sale.totalPrice;
    });

    return Object.entries(dailyStats).map(([name, amount]) => ({ name, amount }));
  };

  const chartData = getDailyChartData();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm lg:col-span-2 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Faturamento por Dia</h3>
        <p className="text-xs text-zinc-450 dark:text-zinc-400">Total acumulado de vendas em cada dia do retiro selecionado.</p>
      </div>
      <div className="h-80 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-zinc-450 dark:text-zinc-600 italic">
            Sem dados de vendas para gerar o gráfico diário.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} className="dark:stroke-zinc-800" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} tickFormatter={(v) => `R$ ${v}`} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Faturamento"]} />
              <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
