import React from "react";

export const PdvHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-wider">
          Atendimento Rápido
        </span>
        <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
          Ponto de Venda (PDV)
        </h1>
        <p className="text-zinc-550 dark:text-zinc-450 text-sm">
          Adicione lembranças ao carrinho e finalize a compra informando o CPF na fila.
        </p>
      </div>
    </div>
  );
};
