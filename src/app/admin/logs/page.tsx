"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { LogsProvider } from "./context/LogsContext";
import { LogsFilter } from "./components/LogsFilter";
import { LogsTable } from "./components/LogsTable";

function LogsPageContent() {
  return (
    <div className="flex-1 flex flex-col gap-6 py-6">
      {/* Header */}
      <div>
        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-wider">
          Auditoria e Segurança
        </span>
        <h1 className="text-3xl font-black text-zinc-950 dark:text-white mt-1">
          Registro de Logs do Sistema
        </h1>
        <p className="text-zinc-550 dark:text-zinc-400 text-sm">
          Monitore todas as transações, alterações de estoque, arquivamentos e ações de operadores na lojinha.
        </p>
      </div>

      {/* Filtros */}
      <LogsFilter />

      {/* Tabela de Logs */}
      <LogsTable />
    </div>
  );
}

export default function AdminLogsPage() {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="text-zinc-555 font-semibold">Carregando logs...</span>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-955 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm">
              Esta área é reservada para administradores.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LogsProvider>
      <LogsPageContent />
    </LogsProvider>
  );
}
