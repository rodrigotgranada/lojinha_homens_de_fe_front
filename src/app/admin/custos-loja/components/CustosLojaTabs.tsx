"use client";

import React from "react";
import { Package, Users, Receipt } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";

export const CustosLojaTabs: React.FC = () => {
  const { activeTab, setActiveTab, allStoreProducts, investorsList, storeExpenses } = useCustosLoja();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <button
        onClick={() => setActiveTab("produtos")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeTab === "produtos"
            ? "bg-amber-500 text-white shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <Package className="w-4 h-4" />
        <span>Produtos & Lotes do Retiro</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          activeTab === "produtos" ? "bg-amber-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
        }`}>
          {allStoreProducts.length}
        </span>
      </button>

      <button
        onClick={() => setActiveTab("investidores")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeTab === "investidores"
            ? "bg-amber-500 text-white shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Investidores / Financiadores</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          activeTab === "investidores" ? "bg-amber-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
        }`}>
          {investorsList.length}
        </span>
      </button>

      <button
        onClick={() => setActiveTab("operacional")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeTab === "operacional"
            ? "bg-amber-500 text-white shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <Receipt className="w-4 h-4" />
        <span>Despesas Operacionais da Loja</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          activeTab === "operacional" ? "bg-amber-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
        }`}>
          {storeExpenses.length}
        </span>
      </button>
    </div>
  );
};
