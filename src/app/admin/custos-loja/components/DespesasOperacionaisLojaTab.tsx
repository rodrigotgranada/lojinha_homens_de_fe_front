"use client";

import React from "react";
import { Receipt, Plus, FileText, CheckCircle2, User, ExternalLink } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";

export const DespesasOperacionaisLojaTab: React.FC = () => {
  const { storeExpenses, formatMoney, setIsExpenseModalOpen } = useCustosLoja();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
            Despesas Operacionais e Insumos da Loja
          </h3>
          <p className="text-xs text-zinc-500">
            Sacolas, bobinas para impressora, taxas de maquininha, crachás e materiais de embalagem.
          </p>
        </div>

        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Despesa da Loja</span>
        </button>
      </div>

      {storeExpenses.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xs space-y-3">
          <Receipt className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
          <h4 className="font-extrabold text-base text-zinc-800 dark:text-zinc-200">
            Nenhuma despesa operacional da loja registrada
          </h4>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Utilize o botão acima para cadastrar gastos como sacolas, bobinas de impressão ou taxas operacionais.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storeExpenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                      {exp.title}
                    </h4>
                    <span className="text-[11px] text-zinc-400">
                      {exp.description || "Insumos da Lojinha"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-zinc-900 dark:text-zinc-50">
                    {formatMoney(exp.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Items */}
              {exp.items && exp.items.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
                  {exp.items.map((it: any) => (
                    <div
                      key={it._id || it.id}
                      className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Pago por: <strong>{it.paidBy}</strong></span>
                        {it.receiptUrl && (
                          <a
                            href={it.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5 ml-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Comprovante
                          </a>
                        )}
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {formatMoney(it.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
