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
    loadingContent,
    filteredProducts
  } = usePdv();

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Search bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center shadow-xs">
        <Input
          id="pdv-product-search"
          placeholder="Pesquisar produto pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-2.5"
          icon={<Search className="h-5 w-5" />}
        />
      </div>

      {/* Categories Tab Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {["Todos", "Alimentação", "Vestuário", "Livros", "Acessórios", "Outros"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-indigo-50 dark:bg-indigo-955/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/40 shadow-xs"
                : "bg-white dark:bg-zinc-900 text-zinc-550 dark:text-zinc-400 border-zinc-150 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh] md:max-h-none pr-1">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
