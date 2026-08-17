import React from "react";
import { usePdv } from "../context/PdvContext";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const PdvCatalog = () => {
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    loadingContent,
    filteredProducts
  } = usePdv();

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Search & Filter Row */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 shadow-xs shrink-0">
        <div className="flex-1">
          <Input
            id="pdv-product-search"
            placeholder="Pesquisar produto pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2"
            icon={<Search className="h-4.5 w-4.5" />}
          />
        </div>
        <div className="w-full md:w-60 shrink-0">
          <select
            id="pdv-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "Todos" ? "TODAS AS CATEGORIAS" : cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Catalog grid */}
      {loadingContent ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <span className="text-zinc-450 font-semibold text-sm">Carregando catálogo...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-10 text-center text-zinc-400 dark:text-zinc-500">
          <Search className="h-10 w-10 mx-auto stroke-1 mb-2 opacity-50" />
          <p className="font-semibold text-sm">Nenhum produto correspondente</p>
          <p className="text-xs">Tente ajustar a ortografia ou limpar o termo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max items-start overflow-y-auto max-h-[60vh] md:flex-1 md:min-h-0 pr-1 pb-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact={true} />
          ))}
        </div>
      )}
    </div>
  );
};
