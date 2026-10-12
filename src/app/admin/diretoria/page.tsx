"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Sale, Event } from "@/hooks/useApi";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  RefreshCw,
  ShieldAlert,
  Calendar,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { subscribeCrossTabEvent } from "@/utils/crossTabSync";

export default function ResumoDiretoriaPage() {
  const { currentUser, isLoading: authLoading } = useApp();
  const api = useApi();

  const [sales, setSales] = useState<Sale[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Load sales and events
  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const [eventsData, salesData] = await Promise.all([
        api.getEvents(),
        api.getSales(),
      ]);

      setEvents(eventsData);
      setSales(salesData);

      // Default to active event if available and not yet set
      if (!isRefresh && selectedEventId === "all") {
        const activeEvent = eventsData.find((e) => e.isActive);
        if (activeEvent) {
          setSelectedEventId(activeEvent.id);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar dados da diretoria:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [api, selectedEventId]);

  useEffect(() => {
    if (!authLoading && currentUser?.role === "ADMIN") {
      loadData();
    }
  }, [authLoading, currentUser, loadData]);

  // Sincronização automática entre abas e ao alternar para esta aba
  useEffect(() => {
    const unsubscribe = subscribeCrossTabEvent(["SALES_UPDATED"], () => {
      loadData(true);
    });
    return unsubscribe;
  }, [loadData]);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  // Filter and Calculate the 3 EXACT Metrics
  const metrics = useMemo(() => {
    const filteredSales = sales.filter((sale) => {
      if (sale.status === "CANCELADO") return false;
      if (selectedEventId !== "all" && sale.eventId !== selectedEventId) return false;
      return true;
    });

    let totalVendido = 0;
    let totalPago = 0;
    let totalAberto = 0;

    let countTotal = 0;
    let countPago = 0;
    let countAberto = 0;

    for (const sale of filteredSales) {
      const price = sale.totalPrice || 0;
      totalVendido += price;
      countTotal += 1;

      if (sale.status === "PAGO") {
        totalPago += price;
        countPago += 1;
      } else if (sale.status === "PENDENTE") {
        totalAberto += price;
        countAberto += 1;
      }
    }

    const percentPago = totalVendido > 0 ? (totalPago / totalVendido) * 100 : 0;
    const percentAberto = totalVendido > 0 ? (totalAberto / totalVendido) * 100 : 0;

    return {
      totalVendido,
      totalPago,
      totalAberto,
      countTotal,
      countPago,
      countAberto,
      percentPago,
      percentAberto,
    };
  }, [sales, selectedEventId]);

  // Loading Screen
  if (authLoading || (loading && sales.length === 0)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-500 font-semibold text-sm">Carregando métricas da diretoria...</span>
      </div>
    );
  }

  // Security Check
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Esta área executiva é restrita para administradores do sistema.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-8 py-6 max-w-6xl mx-auto w-full px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-black px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/50 uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Visão Executiva da Diretoria
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
            Resumo Geral da Lojinha
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            As 3 respostas essenciais sobre o andamento das vendas e pagamentos.
          </p>
        </div>

        {/* Filter and Refresh */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-750 rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="all">Todos os Retiros / Eventos</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} {e.isActive ? "(Ativo)" : ""}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            title="Atualizar números em tempo real"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 text-zinc-700 dark:text-zinc-200 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-indigo-600" : ""}`} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* OS 3 CARDS PRINCIPAIS - SOMENTE ESSAS 3 INFORMAÇÕES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. TOTAL VENDIDO */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-white dark:from-indigo-950/20 dark:via-zinc-900 dark:to-zinc-900 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-100/60 dark:bg-indigo-900/40 px-3 py-1 rounded-lg">
                1. Quanto Já Vendeu?
              </span>
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-sm shadow-indigo-600/30">
                <ShoppingBag className="h-6 w-6 stroke-[2.5]" />
              </div>
            </div>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Total Faturado / Vendido</p>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white mt-1 tracking-tight">
              {formatCurrency(metrics.totalVendido)}
            </h2>
          </div>
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Volume registrado:</span>
            <span className="font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
              {metrics.countTotal} vendas realizadas
            </span>
          </div>
        </div>

        {/* 2. TOTAL PAGO */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white dark:from-emerald-950/20 dark:via-zinc-900 dark:to-zinc-900 border-2 border-emerald-300 dark:border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-3 py-1 rounded-lg">
                2. Quanto Já Foi Pago?
              </span>
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm shadow-emerald-600/30">
                <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
              </div>
            </div>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Recebido no Caixa / PIX</p>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
              {formatCurrency(metrics.totalPago)}
            </h2>
          </div>
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>{metrics.percentPago.toFixed(1)}% do faturamento</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
              {metrics.countPago} vendas quitadas
            </span>
          </div>
        </div>

        {/* 3. TOTAL EM ABERTO */}
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-white dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 border-2 border-amber-300 dark:border-amber-900/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-900/40 px-3 py-1 rounded-lg">
                3. Quanto em Aberto?
              </span>
              <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-sm shadow-amber-500/30">
                <Clock className="h-6 w-6 stroke-[2.5]" />
              </div>
            </div>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Pendências de Clientes (Fiado)</p>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 mt-1 tracking-tight">
              {formatCurrency(metrics.totalAberto)}
            </h2>
          </div>
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>{metrics.percentAberto.toFixed(1)}% a receber</span>
            <span className="font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-955/50 px-2 py-0.5 rounded-md">
              {metrics.countAberto} vendas pendentes
            </span>
          </div>
        </div>

      </div>

      {/* Barra de Progresso Visual de Pagamento */}
      {metrics.totalVendido > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs font-black mb-2.5">
            <span className="text-emerald-700 dark:text-emerald-400">
              Pago: {metrics.percentPago.toFixed(1)}% ({formatCurrency(metrics.totalPago)})
            </span>
            <span className="text-amber-700 dark:text-amber-400">
              Pendente: {metrics.percentAberto.toFixed(1)}% ({formatCurrency(metrics.totalAberto)})
            </span>
          </div>
          <div className="w-full h-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${metrics.percentPago}%` }}
              title={`Pago: ${metrics.percentPago.toFixed(1)}%`}
            />
            <div
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${metrics.percentAberto}%` }}
              title={`Pendente: ${metrics.percentAberto.toFixed(1)}%`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
