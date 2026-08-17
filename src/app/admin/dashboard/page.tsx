"use client";

import React from "react";
import { useDashboardState } from "./hooks/useDashboardState";
import { DashboardProvider } from "./context/DashboardContext";
import { KpiCards } from "./components/KpiCards";
import { SalesChart } from "./components/SalesChart";
import { CategoryChart } from "./components/CategoryChart";
import { TopProductsChart } from "./components/TopProductsChart";
import { FinancialComparisonChart } from "./components/FinancialComparisonChart";
import { TopBuyersList } from "./components/TopBuyersList";
import { RecentSalesTable } from "./components/RecentSalesTable";
import { ShieldAlert, RefreshCw, AlertCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const dashboardState = useDashboardState();
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    analytics,
    sales,
    loadingEvents,
    loadingAnalytics,
    error,
    fetchAnalytics,
    currentUser,
    isLoading
  } = dashboardState;

  // Loading indicator for authorization check
  if (isLoading || loadingEvents) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-500 font-semibold text-sm">Carregando painel de controle...</span>
      </div>
    );
  }

  // Security authorization check
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-955 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Esta área de análises financeiras é reservada para administradores do sistema.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider value={dashboardState}>
      <div className="flex-1 flex flex-col gap-6 py-6 max-w-7xl mx-auto w-full px-4">

        {/* Header and Event Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-indigo-50 dark:bg-indigo-955/40 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-wider">
              Painel Executivo
            </span>
            <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
              Balanço e Métricas de Vendas
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Monitore o progresso do faturamento, maiores compradores e estoque por evento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all min-w-[200px]"
            >
              {events.length === 0 ? (
                <option value="">Nenhum evento criado</option>
              ) : (
                events.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name} {e.isActive ? "(Ativo)" : ""}
                  </option>
                ))
              )}
            </select>

            <button
              onClick={fetchAnalytics}
              disabled={loadingAnalytics || !selectedEventId}
              className="p-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl transition-all disabled:opacity-50"
              title="Atualizar dados"
            >
              <RefreshCw className={`h-5 w-5 ${loadingAnalytics ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* KPI Cards Summary */}
        <KpiCards />

        {/* Dynamic Charts Grid */}
        {analytics && analytics.summary.totalSalesCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico Comparativo: Faturamento vs Custo vs Lucro */}
            <FinancialComparisonChart />
            <TopProductsChart />
            <CategoryChart />
            <SalesChart />
            <TopBuyersList />
            <RecentSalesTable />
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl py-20 px-8 text-center shadow-xs flex flex-col items-center justify-center max-w-xl mx-auto w-full gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-955 dark:text-white">Nenhuma venda registrada</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                Este evento selecionado ainda não possui registros de transações registradas no PDV.
              </p>
            </div>
            <Link
              href="/admin/pdv"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md text-sm mt-2"
            >
              Ir para o Ponto de Venda
            </Link>
          </div>
        )}

      </div>
    </DashboardProvider>
  );
}
