import React from "react";

export const SalesHeader = () => {
  return (
    <div>
      <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/30 uppercase tracking-wider">
        Auditoria de Caixa
      </span>
      <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
        Histórico e Estornos de Vendas
      </h1>
      <p className="text-zinc-550 dark:text-zinc-450 text-sm">
        Acompanhe todos os cupons fiscais emitidos no PDV, gerencie pendências e realize devoluções de estoque.
      </p>
    </div>
  );
};
