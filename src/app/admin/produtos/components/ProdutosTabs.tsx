"use client";

import React from "react";
import { useProdutos } from "../context/ProdutosContext";

export const ProdutosTabs: React.FC = () => {
  const { activeProducts, inactiveProducts, activeTab, setActiveTab } = useProdutos();

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-6 text-sm mb-6 mt-2">
      <button
        onClick={() => setActiveTab("ativos")}
        className={`pb-3 font-bold cursor-pointer transition-all border-b-2 -mb-[2px] ${
          activeTab === "ativos"
            ? "border-indigo-600 text-indigo-650 dark:text-indigo-400"
            : "border-transparent text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300"
        }`}
      >
        Ativos ({activeProducts.length})
      </button>
      <button
        onClick={() => setActiveTab("desativados")}
        className={`pb-3 font-bold cursor-pointer transition-all border-b-2 -mb-[2px] ${
          activeTab === "desativados"
            ? "border-indigo-600 text-indigo-650 dark:text-indigo-400"
            : "border-transparent text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300"
        }`}
      >
        Desativados ({inactiveProducts.length})
      </button>
    </div>
  );
};
