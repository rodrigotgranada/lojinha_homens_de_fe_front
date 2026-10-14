"use client";

import React, { useState } from "react";
import { Package, Search, CheckCircle2, TrendingUp, HandCoins, AlertCircle } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";

export const ProdutosLojinhaTab: React.FC = () => {
  const { allStoreProducts, formatMoney } = useCustosLoja();
  const [search, setSearch] = useState("");

  const filtered = allStoreProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (allStoreProducts.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xs space-y-3">
        <Package className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
        <h3 className="font-extrabold text-base text-zinc-800 dark:text-zinc-200">
          Nenhum produto cadastrado para este retiro
        </h3>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Assim que os produtos tiverem entradas de estoque ou vendas registradas no PDV para esta edição, a prestação de custos aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        <span className="text-xs text-zinc-500 font-semibold">
          {filtered.length} produto(s) listado(s)
        </span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black tracking-wider text-[10px] bg-zinc-50/50 dark:bg-zinc-850/50">
                <th className="py-3.5 px-4">Produto</th>
                <th className="py-3.5 px-3 text-right">Custo Unit.</th>
                <th className="py-3.5 px-3 text-right">Preço Venda</th>
                <th className="py-3.5 px-3 text-center">Tiragem</th>
                <th className="py-3.5 px-3 text-center">Vendidos</th>
                <th className="py-3.5 px-3 text-center">Estoque Atual</th>
                <th className="py-3.5 px-3 text-right">Total Investido</th>
                <th className="py-3.5 px-3 text-right">Devolvido ao Irmão</th>
                <th className="py-3.5 px-3 text-right">Lucro pro Retiro</th>
                <th className="py-3.5 px-4 text-center">Status Quitação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filtered.map((prod) => {
                const is100Percent =
                  prod.investedAmount > 0
                    ? prod.costToRepay >= prod.investedAmount
                    : prod.soldQuantity > 0;
                const progress =
                  prod.investedAmount > 0
                    ? Math.min(100, Math.round((prod.costToRepay / prod.investedAmount) * 100))
                    : 100;

                return (
                  <tr
                    key={prod.productId}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[180px]">{prod.name}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-zinc-500">
                      {formatMoney(prod.costPrice)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-zinc-800 dark:text-zinc-200">
                      {formatMoney(prod.salePrice)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-medium text-zinc-500">
                      {prod.initialStock}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-600 dark:text-amber-400">
                      {prod.soldQuantity}
                    </td>
                    <td className="py-3.5 px-3 text-center font-medium text-zinc-500">
                      {prod.currentStock}
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-zinc-600 dark:text-zinc-300">
                      {formatMoney(prod.investedAmount)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-blue-600 dark:text-blue-400">
                      {formatMoney(prod.costToRepay)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                      {formatMoney(prod.totalProfit)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {is100Percent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-955 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          100% Quitado
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 justify-center">
                          <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-amber-600">{progress}%</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
