"use client";

import React from "react";
import {
  Eye,
  Edit2,
  Trash2,
  RotateCcw,
  Image as ImageIcon,
  Package,
  Search,
  X
} from "lucide-react";
import { useProdutos } from "../context/ProdutosContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableSortHeaderCell
} from "@/components/ui/Table";

export const ProdutosTable: React.FC = () => {
  const {
    activeProducts,
    inactiveProducts,
    activeTab,
    loadingContent,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDir,
    handleSort,
    handleOpenViewModal,
    handleOpenEditModal,
    handleTriggerDelete,
    handleTriggerReactivate
  } = useProdutos();

  if (loadingContent) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <span className="text-zinc-555 font-semibold text-sm">Carregando catálogo completo...</span>
      </div>
    );
  }

  const searchBar = (
    <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-955/30">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nome ou categoria..."
          className="w-full pl-8 pr-8 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );

  if (activeTab === "ativos") {
    if (activeProducts.length === 0) {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          {searchBar}
          <div className="p-16 text-center text-zinc-400 dark:text-zinc-500">
            <Package className="h-14 w-14 stroke-1 mb-2 mx-auto opacity-50" />
            <p className="font-bold text-sm">
              {searchQuery ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
            </p>
            <p className="text-xs mt-1">
              {searchQuery
                ? `Sem resultados para "${searchQuery}".`
                : "Clique no botão \"Novo Produto\" acima para cadastrar sua primeira lembrança."}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        {searchBar}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Miniatura</TableHeaderCell>
              <TableSortHeaderCell label="Produto" field="name" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} />
              <TableSortHeaderCell label="Venda" field="price" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} />
              <TableHeaderCell>Custo Unit.</TableHeaderCell>
              <TableHeaderCell>Patrocinador</TableHeaderCell>
              <TableSortHeaderCell label="Estoque" field="stock" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} className="text-center" />
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell className="text-right">Ações</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeProducts.map((product) => {
              const isLow = product.stock <= (product.minStock ?? 5);
              const isOut = product.stock === 0;
              const cost = product.costPrice ?? 0;
              const unitProfit = product.price - cost;
              const margin = product.price > 0 ? ((unitProfit / product.price) * 100).toFixed(0) : "0";

              return (
                <TableRow
                  key={product.id}
                  className={isLow ? "bg-red-50/10 dark:bg-red-950/5" : ""}
                >
                  {/* Image Thumbnail */}
                  <TableCell>
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-900 overflow-hidden">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-zinc-400" />
                      )}
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 dark:text-white block">
                        {product.name}
                      </span>
                      {product.category && (
                        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-indigo-100/50 dark:border-indigo-900/30">
                          {product.category}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      ID: {product.id}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="font-bold text-emerald-600 dark:text-emerald-400">
                    R$ {product.price.toFixed(2)}
                  </TableCell>

                  {/* Cost Price & Margin */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        R$ {cost.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                        Margem: {margin}%
                      </span>
                    </div>
                  </TableCell>

                  {/* Sponsor Name */}
                  <TableCell>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/40 inline-block max-w-[140px] truncate">
                      {product.sponsorName || "Retiro"}
                    </span>
                  </TableCell>

                  {/* Stock */}
                  <TableCell
                    className={`text-center font-black ${
                      isLow ? "text-red-650 dark:text-red-400" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {product.stock}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {isOut ? (
                      <span className="bg-red-100 dark:bg-red-955/40 text-red-650 dark:text-red-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/30">
                        Esgotado
                      </span>
                    ) : isLow ? (
                      <span className="bg-amber-100 dark:bg-amber-955/40 text-amber-650 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/30">
                        Crítico
                      </span>
                    ) : (
                      <span className="bg-emerald-100 dark:bg-emerald-955/40 text-emerald-650 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30">
                        Estável
                      </span>
                    )}
                  </TableCell>

                  {/* Action buttons */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenViewModal(product)}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:text-indigo-650 hover:border-indigo-250 hover:bg-indigo-50/20 transition-all cursor-pointer"
                        title="Visualizar produto"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer"
                        title="Editar produto"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleTriggerDelete(product.id, product.name)}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:text-red-500 hover:border-red-250 hover:bg-red-50/20 transition-all cursor-pointer"
                        title="Desativar produto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Desativados Tab
  if (inactiveProducts.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        {searchBar}
        <div className="p-16 text-center text-zinc-400 dark:text-zinc-500">
          <Package className="h-14 w-14 stroke-1 mb-2 mx-auto opacity-50" />
          <p className="font-bold text-sm">
            {searchQuery ? "Nenhum produto encontrado" : "Nenhum produto desativado"}
          </p>
          <p className="text-xs mt-1">
            {searchQuery
              ? `Sem resultados para "${searchQuery}".`
              : "Todos os produtos cadastrados estão ativos no momento."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
      {searchBar}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Miniatura</TableHeaderCell>
            <TableSortHeaderCell label="Produto" field="name" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} />
            <TableSortHeaderCell label="Preço Unitário" field="price" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} />
            <TableSortHeaderCell label="Quantidade" field="stock" currentSortField={sortField} sortDir={sortDir} onSort={handleSort} className="text-center" />
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Ações</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inactiveProducts.map((product) => {
            return (
              <TableRow
                key={product.id}
                className="opacity-75"
              >
                {/* Image Thumbnail */}
                <TableCell>
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-900 overflow-hidden grayscale">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                </TableCell>

                {/* Name */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white block line-through decoration-zinc-400">
                      {product.name}
                    </span>
                    {product.category && (
                      <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-555 dark:text-zinc-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    ID: {product.id}
                  </span>
                </TableCell>

                {/* Price */}
                <TableCell className="font-bold text-zinc-900 dark:text-white">
                  R$ {product.price.toFixed(2)}
                </TableCell>

                {/* Stock */}
                <TableCell className="text-center text-zinc-500 font-bold">
                  {product.stock}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                    Inativo
                  </span>
                </TableCell>

                {/* Action buttons */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenViewModal(product)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:text-indigo-650 hover:border-indigo-250 hover:bg-indigo-50/20 transition-all cursor-pointer"
                      title="Visualizar produto"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer"
                      title="Editar produto"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleTriggerReactivate(product.id, product.name)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-555 hover:text-emerald-600 hover:border-emerald-250 hover:bg-emerald-50/20 transition-all cursor-pointer"
                      title="Reativar produto"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
