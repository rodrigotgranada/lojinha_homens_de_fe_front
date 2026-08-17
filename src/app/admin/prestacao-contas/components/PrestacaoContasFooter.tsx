"use client";

import React from "react";

export const PrestacaoContasFooter: React.FC = () => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-5 space-y-2 print:border-zinc-300">
      <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
        📋 Diretrizes de Repasse aos Investidores:
      </h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        1. O valor na coluna <strong>&quot;Devolver (Custo)&quot;</strong> corresponde exatamente ao capital investido na produção/compra das peças que já foram vendidas e pagas no caixa.<br />
        2. O valor de <strong>&quot;Lucro do Retiro&quot;</strong> já é líquido de custos e deve ser integralmente destinado para as despesas e fundo de caixa do Retiro Homens de Fé.<br />
        3. Itens não vendidos permanecem no estoque do retiro para o próximo evento ou podem ser devolvidos conforme alinhamento prévio com o patrocinador.
      </p>
    </div>
  );
};
