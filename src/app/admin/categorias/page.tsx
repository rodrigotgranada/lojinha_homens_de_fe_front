"use client";

import React from "react";
import { useCategoryState } from "./hooks/useCategoryState";
import { CategoryProvider } from "./context/CategoryContext";
import { CategoryHeader } from "./components/CategoryHeader";
import { CategoryTable } from "./components/CategoryTable";
import { CategoryModal } from "./components/CategoryModal";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function CategoriasAdminPage() {
  const categoryState = useCategoryState();
  const { currentUser, isLoading, error, success } = categoryState;

  // Authorization Check: Loading
  if (isLoading && !currentUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="text-zinc-550 font-semibold text-sm">Carregando painel de categorias...</span>
      </div>
    );
  }

  // Authorization Check: Admin only
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm">
              Esta área é reservada exclusivamente para administradores do sistema.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CategoryProvider value={categoryState}>
      <div className="flex-1 flex flex-col gap-6 max-w-5xl mx-auto w-full py-4">
        {/* Header */}
        <CategoryHeader />

        {/* Global Feedback Notifications */}
        {error && (
          <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-semibold border border-red-100 dark:border-red-900/30 shadow-xs">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl text-sm font-semibold border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
            {success}
          </div>
        )}

        {/* Table of categories */}
        <CategoryTable />

        {/* Create/Edit Modal Dialog */}
        <CategoryModal />
      </div>
    </CategoryProvider>
  );
}
