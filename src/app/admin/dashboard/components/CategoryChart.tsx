import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export const CategoryChart = () => {
  const { analytics, formatCurrency } = useDashboard();

  if (!analytics) return null;

  // Aggregate Category Chart Data
  const getCategoryChartData = () => {
    if (!analytics.topSellingProducts) return [];
    const catStats: Record<string, number> = {};
    analytics.topSellingProducts.forEach((p) => {
      catStats[p.category] = (catStats[p.category] || 0) + p.revenue;
    });
    return Object.entries(catStats).map(([name, value]) => ({ name, value }));
  };

  const categoryData = getCategoryChartData();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">Faturamento por Categoria</h3>
        <p className="text-xs text-zinc-450 dark:text-zinc-400">Distribuição do valor vendido nas categorias do estoque.</p>
      </div>
      <div className="h-80 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
