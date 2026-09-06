"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { ShieldAlert, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProdutosProvider, useProdutos } from "./context/ProdutosContext";
import { ProdutosAlerts } from "./components/ProdutosAlerts";
import { ProdutosTabs } from "./components/ProdutosTabs";
import { ProdutosTable } from "./components/ProdutosTable";
import { ProdutoModal } from "./components/ProdutoModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ImportPreviousStockModal } from "./components/ImportPreviousStockModal";

function GerenciamentoProdutosContent() {
  const {
    handleOpenAddModal,
    isConfirmOpen,
    setIsConfirmOpen,
    handleConfirmAction,
    productNameToDelete,
    deleting,
    confirmAction,
    loadProducts,
  } = useProdutos();

  const { activeEvent } = useApp();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-6 py-4">
      {/* Product List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider">
            Estoque Geral
          </span>
          <h1 className="text-3xl font-black text-zinc-950 dark:text-white mt-1">
            Gerenciamento de Produtos
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm">
            Cadastre novos produtos, edite valores e acompanhe os níveis de estoque crítico do retiro.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeEvent && (
            <Button
              variant="secondary"
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 cursor-pointer border-indigo-200 text-indigo-700 dark:border-indigo-900/40 dark:text-indigo-300"
            >
              <RefreshCw className="h-4 w-4" />
              Importar Sobras de Retiros
            </Button>
          )}

          <Button onClick={handleOpenAddModal} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-5 w-5" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Alertas */}
      <ProdutosAlerts />

      {/* Abas de Navegação */}
      <ProdutosTabs />

      {/* Tabela de Produtos */}
      <ProdutosTable />

      {/* Modais de CRUD */}
      <ProdutoModal />

      {/* Modal de Importação e Conciliação de Sobras */}
      {activeEvent && (
        <ImportPreviousStockModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          currentEventId={activeEvent.id}
          onSuccess={() => loadProducts()}
        />
      )}

      {/* Modal de Confirmação de Desativação */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmAction}
        title={confirmAction === "deactivate" ? "Desativar Produto?" : "Ativar Produto?"}
        message={
          confirmAction === "deactivate"
            ? `Deseja realmente desativar o produto "${productNameToDelete}"? Ele não estará mais disponível para novas vendas no PDV nem no estoque, mas seu histórico de vendas será preservado para relatórios futuros.`
            : `Deseja realmente reativar o produto "${productNameToDelete}"? Ele voltará a ficar disponível para novas vendas no PDV e visualização no estoque geral.`
        }
        confirmText={confirmAction === "deactivate" ? "Confirmar Desativação" : "Confirmar Ativação"}
        cancelText="Voltar"
        variant={confirmAction === "deactivate" ? "danger" : "info"}
        isLoading={deleting}
      />
    </div>
  );
}

export default function GerenciamentoProdutosPage() {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="text-zinc-555 font-semibold">Carregando estoque...</span>
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
    <ProdutosProvider>
      <GerenciamentoProdutosContent />
    </ProdutosProvider>
  );
}
