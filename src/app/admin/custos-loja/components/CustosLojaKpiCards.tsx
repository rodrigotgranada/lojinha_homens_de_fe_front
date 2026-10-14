"use client";

import React from "react";
import { DollarSign, TrendingUp, HandCoins, AlertCircle, ShoppingBag, Receipt, Sparkles } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";

export const CustosLojaKpiCards: React.FC = () => {
  const {
    totalRevenue,
    totalInvested,
    totalToRepay,
    totalProfit,
    totalPendingRepay,
    totalOperExpenses,
    formatMoney,
  } = useCustosLoja();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      
      {/* 1. Faturamento Bruto da Loja */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <span>Vendas PDV (Bruto)</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-955/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
          {formatMoney(totalRevenue)}
        </div>
        <p className="text-[11px] text-zinc-400">Entrada total de caixa no evento</p>
      </div>

      {/* 2. Custo das Mercadorias / Investido */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <span>Investido em Lotes</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50">
          {formatMoney(totalInvested)}
        </div>
        <p className="text-[11px] text-zinc-400">Custo de confecção/compra</p>
      </div>

      {/* 3. Já Devolvido a Investidores */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <span>Já Quitado/Repassado</span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <HandCoins className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
          {formatMoney(totalToRepay)}
        </div>
        <p className="text-[11px] text-zinc-400">Pago aos irmãos financiadores</p>
      </div>

      {/* 4. Saldo a Devolver a Investidores */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <span>Saldo a Devolver</span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-955/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className={`text-xl sm:text-2xl font-black ${
          totalPendingRepay > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600"
        }`}>
          {formatMoney(totalPendingRepay)}
        </div>
        <p className="text-[11px] text-zinc-400">
          {totalPendingRepay === 0 ? "100% quitado com os irmãos" : "Pendente de quitação"}
        </p>
      </div>

      {/* 5. Lucro Líquido Retido pro Retiro */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-1 col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <span>Lucro Líquido Loja</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-955/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
          {formatMoney(totalProfit - totalOperExpenses)}
        </div>
        <p className="text-[11px] text-zinc-400">Fica para as obras do retiro</p>
      </div>

    </div>
  );
};
