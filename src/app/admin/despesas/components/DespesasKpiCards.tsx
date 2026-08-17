"use client";

import React from "react";
import { Building2, Utensils, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useDespesas } from "../context/DespesasContext";

export const DespesasKpiCards: React.FC = () => {
  const { summary, formatMoney } = useDespesas();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {/* Infraestrutura / Obras (CAPEX) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-4.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">🏗️ Infra & Obras</p>
            <h3 className="text-xl font-black text-zinc-950 dark:text-white mt-1">
              {formatMoney(summary.totalInfraExpenses || 0)}
            </h3>
          </div>
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-955/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Building2 className="h-4 w-4" />
          </div>
        </div>
        <span className="text-[11px] text-zinc-500 mt-2 font-medium">
          Reformas & Benfeitorias
        </span>
      </div>

      {/* Consumíveis / Operação (OPEX) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-4.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider">🍽️ Operação & Consumo</p>
            <h3 className="text-xl font-black text-zinc-950 dark:text-white mt-1">
              {formatMoney(summary.totalOperExpenses || 0)}
            </h3>
          </div>
          <div className="p-2.5 bg-orange-50 dark:bg-orange-955/40 text-orange-600 dark:text-orange-400 rounded-2xl">
            <Utensils className="h-4 w-4" />
          </div>
        </div>
        <span className="text-[11px] text-zinc-500 mt-2 font-medium">
          Alimentação, gás e consumo
        </span>
      </div>

      {/* Pendente de Reembolso aos Irmãos */}
      <div className="bg-amber-50/60 dark:bg-amber-955/20 border border-amber-200/80 dark:border-amber-900/40 rounded-3xl p-4.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">A Reembolsar</p>
            <h3 className="text-xl font-black text-amber-800 dark:text-amber-300 mt-1">
              {formatMoney(summary.totalExpensesPendingRepay)}
            </h3>
          </div>
          <div className="p-2.5 bg-amber-500 text-white rounded-2xl shadow-sm shadow-amber-500/20">
            <Wallet className="h-4 w-4" />
          </div>
        </div>
        <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-2 font-semibold">
          {formatMoney(summary.totalExpensesRepaid)} já devolvidos
        </span>
      </div>

      {/* Fundo Total Arrecadado (Entradas) */}
      <div className="bg-emerald-50/60 dark:bg-emerald-955/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl p-4.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Caixa Arrecadado</p>
            <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
              {formatMoney(summary.totalAvailableEventFunds)}
            </h3>
          </div>
          <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-sm shadow-emerald-500/20">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-2 font-semibold">
          Inscrições + Loja ({formatMoney(summary.lojinhaProfit)})
        </span>
      </div>

      {/* Saldo Final Líquido do Retiro */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-4.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Saldo Líquido</p>
            <h3 className={`text-xl font-black mt-1 ${summary.finalEventBalance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {formatMoney(summary.finalEventBalance)}
            </h3>
          </div>
          <div className={`p-2.5 rounded-2xl ${summary.finalEventBalance >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {summary.finalEventBalance >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          </div>
        </div>
        <span className="text-[11px] text-zinc-500 mt-2">
          {summary.finalEventBalance >= 0 ? "Superávit do Retiro" : "Déficit / Saldo a cobrir"}
        </span>
      </div>
    </div>
  );
};
