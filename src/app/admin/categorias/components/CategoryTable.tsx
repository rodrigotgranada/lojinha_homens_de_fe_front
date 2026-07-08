import React from "react";
import { useCategory } from "../context/CategoryContext";
import { Edit2, Trash2, Tag } from "lucide-react";

export const CategoryTable: React.FC = () => {
  const { categories, isLoading, openEditModal, handleDelete } = useCategory();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4" />
        <span className="text-zinc-550 text-sm font-semibold">Carregando categorias...</span>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl p-16 text-center text-zinc-400 dark:text-zinc-500">
        <Tag className="h-12 w-12 mx-auto stroke-1 mb-3 opacity-40 text-indigo-650 dark:text-indigo-400" />
        <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">Nenhuma Categoria Encontrada</h3>
        <p className="text-xs max-w-sm mx-auto mt-1">
          Nenhuma categoria foi cadastrada no sistema até o momento. Crie sua primeira categoria utilizando o botão superior.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-wider">
              <th className="px-6 py-4.5">Nome da Categoria</th>
              <th className="px-6 py-4.5">Data de Cadastro</th>
              <th className="px-6 py-4.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/10 transition-colors">
                <td className="px-6 py-4.5 font-bold text-zinc-900 dark:text-white">
                  {category.name}
                </td>
                <td className="px-6 py-4.5 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                  {formatDate(category.createdAt)}
                </td>
                <td className="px-6 py-4.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all cursor-pointer"
                      title="Editar Nome"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-955/20 rounded-xl transition-all cursor-pointer"
                      title="Excluir Categoria"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
