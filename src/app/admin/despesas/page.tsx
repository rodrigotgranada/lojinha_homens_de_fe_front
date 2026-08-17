"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { DespesasProvider, useDespesas } from "./context/DespesasContext";
import { DespesasHeader } from "./components/DespesasHeader";
import { DespesasKpiCards } from "./components/DespesasKpiCards";
import { DespesasTabs } from "./components/DespesasTabs";
import { ObrasTab } from "./components/ObrasTab";
import { IrmaosTab } from "./components/IrmaosTab";
import { ReceitasTab } from "./components/ReceitasTab";
import { RelatorioGeralTab } from "./components/RelatorioGeralTab";
import { DespesasModals } from "./components/DespesasModals";

function DespesasContent() {
  const { activeTab } = useDespesas();

  return (
    <div className="flex-1 flex flex-col gap-6 py-6 max-w-7xl mx-auto w-full px-4">
      {/* Header com Seletor de Evento e Ações */}
      <DespesasHeader />

      {/* KPI Cards de Balanço Operacional e Caixa */}
      <DespesasKpiCards />

      {/* Navegação entre Abas e Filtros */}
      <DespesasTabs />

      {/* Conteúdo da Aba Ativa */}
      {activeTab === "obras" && <ObrasTab />}
      {activeTab === "irmãos" && <IrmaosTab />}
      {activeTab === "receitas" && <ReceitasTab />}
      {activeTab === "relatorio" && <RelatorioGeralTab />}

      {/* Modais de Criação, Itens, Receitas e Reembolsos */}
      <DespesasModals />
    </div>
  );
}

export default function DespesasPage() {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
        <span className="text-zinc-500 font-semibold text-sm">Carregando despesas e obras...</span>
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
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Esta área de gestão de despesas e obras é reservada aos administradores do retiro.
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
    <DespesasProvider>
      <DespesasContent />
    </DespesasProvider>
  );
}
