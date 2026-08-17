"use client";

import React from "react";
import { DollarSign, Wallet, TrendingUp, Users } from "lucide-react";
import { usePrestacaoContas } from "../context/PrestacaoContasContext";

export const PrestacaoContasKpiCards: React.FC = () => {
  const {
    totalRevenueGlobal,
    totalRepayGlobal,
    totalProfitGlobal,
    totalInvestedGlobal
  } = usePrestacaoContas();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Arrecadado */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Faturamento Total</p>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
              R$ {totalRevenueGlobal.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-955/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
        <span className="text-xs text-zinc-500 mt-3">Receita bruta gerada pelas vendas.</span>
      </div>

      {/* Capital a Devolver aos Investidores */}
      <div className="bg-amber-50/50 dark:bg-amber-955/20 border border-amber-200/70 dark:border-amber-900/40 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">Devolução a Investidores</p>
            <h3 className="text-2xl font-black text-amber-800 dark:text-amber-300 mt-1">
              R$ {totalRepayGlobal.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-sm shadow-amber-500/20">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        <span className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-3 font-semibold">
          Capital de confecção a devolver.
        </span>
      </div>

      {/* Lucro Líquido Realizado para o Retiro */}
      <div className="bg-emerald-50/60 dark:bg-emerald-955/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Lucro Líquido do Retiro</p>
            <h3 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
              R$ {totalProfitGlobal.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-sm shadow-emerald-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <span className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-3 font-semibold">
          Saldo que fica retido para o Retiro.
        </span>
      </div>

      {/* Total Investido Originalmente */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Investimento Total Previsto</p>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
              R$ {totalInvestedGlobal.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl">
            <Users className="h-5 w-5" />
          </div>
        </div>
        <span className="text-xs text-zinc-500 mt-3">Custo total de 100% da tiragem.</span>
      </div>
    </div>
  );
};
