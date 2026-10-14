"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ShieldAlert, RefreshCw } from "lucide-react";
import { CustosLojaProvider, useCustosLoja } from "./context/CustosLojaContext";
import { CustosLojaHeader } from "./components/CustosLojaHeader";
import { CustosLojaKpiCards } from "./components/CustosLojaKpiCards";
import { CustosLojaTabs } from "./components/CustosLojaTabs";
import { ProdutosLojinhaTab } from "./components/ProdutosLojinhaTab";
import { InvestidoresLojinhaTab } from "./components/InvestidoresLojinhaTab";
import { DespesasOperacionaisLojaTab } from "./components/DespesasOperacionaisLojaTab";
import { ModalNovaDespesaLoja } from "./components/ModalNovaDespesaLoja";
import { ModalReembolsoLoja } from "./components/ModalReembolsoLoja";

function CustosLojaContent() {
  const { loading, activeTab } = useCustosLoja();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="text-zinc-500 font-bold text-sm">Carregando custos da lojinha...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 py-4 sm:py-6 max-w-7xl mx-auto w-full px-4">
      {/* Header com Seletor de Evento e Ações */}
      <CustosLojaHeader />

      {/* KPI Cards de Faturamento, Custos, Devoluções e Lucro da Loja */}
      <CustosLojaKpiCards />

      {/* Abas: Produtos Financiados, Investidores e Despesas Operacionais */}
      <CustosLojaTabs />

      {/* Conteúdo da Aba Ativa */}
      {activeTab === "produtos" && <ProdutosLojinhaTab />}
      {activeTab === "investidores" && <InvestidoresLojinhaTab />}
      {activeTab === "operacional" && <DespesasOperacionaisLojaTab />}

      {/* Modais */}
      <ModalNovaDespesaLoja />
      <ModalReembolsoLoja />
    </div>
  );
}

export default function CustosLojaPage() {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="text-zinc-500 font-semibold text-sm">Carregando dados...</span>
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
              Esta área de gestão de custos e investidores da lojinha é reservada aos administradores.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-center"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CustosLojaProvider>
      <CustosLojaContent />
    </CustosLojaProvider>
  );
}
