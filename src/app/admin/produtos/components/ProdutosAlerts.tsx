"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useProdutos } from "../context/ProdutosContext";

export const ProdutosAlerts: React.FC = () => {
  const { activeProducts } = useProdutos();

  if (!activeProducts.some((p) => p.stock <= (p.minStock ?? 5))) {
    return null;
  }

  return (
    <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 shrink-0 animate-pulse mt-0.5" />
      <div>
        <p className="font-bold text-sm">Alerta: Itens com Estoque Crítico!</p>
        <p className="text-xs mt-0.5">
          Existem itens que atingiram ou estão abaixo do estoque crítico recomendado. Considere repor antes do próximo período de vendas.
        </p>
      </div>
    </div>
  );
};
