import React from "react";
import { useDashboard } from "../context/DashboardContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export const FinancialComparisonChart = () => {
  const { analytics, formatCurrency } = useDashboard();

  if (!analytics) return null;

  // Montar dados comparativos dos top produtos: Receita (Venda), Custo (Investimento) e Lucro Líquido
  const chartData = (analytics.topSellingProducts || [])
    .slice(0, 7)
    .map((p) => {
      const revenue = p.revenue || 0;
      const cost = p.cost || 0;
      const profit = p.profit ?? (revenue - cost);
      return {
        name: p.name.length > 18 ? `${p.name.slice(0, 16)}...` : p.name,
        fullName: p.name,
        receita: revenue,
        custo: cost,
        lucro: profit,
        margem: revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0"
      };
    });

  if (chartData.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm lg:col-span-3 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            📊 Comparativo Financeiro por Produto (Venda vs Custo vs Lucro)
          </h3>
          <p className="text-xs text-zinc-450 dark:text-zinc-400">
            Diferença entre o faturamento bruto obtido, o custo de reposição/investimento e o lucro líquido do retiro.
          </p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} className="dark:stroke-zinc-800" />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#a1a1aa"
              fontSize={11}
              tickLine={false}
              tickFormatter={(v) => `R$ ${v}`}
            />
            <Tooltip
              formatter={(value, name) => {
                const labelMap: Record<string, string> = {
                  receita: "Faturamento Bruto",
                  custo: "Custo / Investimento",
                  lucro: "Lucro Líquido"
                };
                return [formatCurrency(Number(value)), labelMap[name as string] || name];
              }}
              contentStyle={{
                backgroundColor: "rgba(24, 24, 27, 0.95)",
                borderRadius: "16px",
                border: "1px solid rgba(63, 63, 70, 0.4)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
              formatter={(value) => {
                const labelMap: Record<string, string> = {
                  receita: "Faturamento Bruto (Saídas)",
                  custo: "Custo / Investimento",
                  lucro: "Lucro Líquido (Retiro)"
                };
                return labelMap[value] || value;
              }}
            />
            <Bar dataKey="receita" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={32} />
            <Bar dataKey="custo" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={32} />
            <Bar dataKey="lucro" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
