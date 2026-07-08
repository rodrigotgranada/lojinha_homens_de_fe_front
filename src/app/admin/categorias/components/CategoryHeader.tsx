import React from "react";
import { useCategory } from "../context/CategoryContext";
import { Plus, Tag } from "lucide-react";

export const CategoryHeader: React.FC = () => {
  const { categories, openCreateModal } = useCategory();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-150 dark:border-zinc-800/80 shadow-xs">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
          <Tag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Gerenciar Categorias
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Administre as categorias de produtos da lojinha. Atualmente, existem {categories.length} categoria(s) cadastrada(s).
        </p>
      </div>

      <button
        onClick={openCreateModal}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer self-start sm:self-auto"
      >
        <Plus className="h-4.5 w-4.5" />
        Nova Categoria
      </button>
    </div>
  );
};
