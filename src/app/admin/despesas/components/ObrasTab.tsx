"use client";

import React from "react";
import {
  Building2,
  Utensils,
  Plus,
  Trash2,
  Paperclip,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../context/DespesasContext";

export const ObrasTab: React.FC = () => {
  const {
    filteredExpenses,
    natureFilter,
    setIsGroupModalOpen,
    setTargetExpenseId,
    setIsItemModalOpen,
    handleDeleteExpense,
    handleOpenRepayModal,
    handleDeleteItem,
    formatMoney
  } = useDespesas();

  if (filteredExpenses.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl py-16 px-6 text-center shadow-xs flex flex-col items-center justify-center gap-3">
        <Building2 className="h-12 w-12 text-zinc-400 opacity-60" />
        <h3 className="text-lg font-black text-zinc-900 dark:text-white">
          {natureFilter === "ALL"
            ? "Nenhuma despesa ou obra cadastrada"
            : `Nenhuma despesa do tipo ${natureFilter === "INFRAESTRUTURA" ? "Infraestrutura/Obras" : "Operacional/Consumo"} encontrada`}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-md">
          Cadastre os grupos para discriminar materiais, compras e doações vinculadas ao evento.
        </p>
        <Button onClick={() => setIsGroupModalOpen(true)} className="mt-2">
          <Plus className="h-4 w-4 mr-1.5" />
          Cadastrar Despesa / Obra
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredExpenses.map((exp) => {
        const isInfra =
          exp.nature === "INFRAESTRUTURA" ||
          exp.category === "OBRA" ||
          exp.category === "LOCACAO" ||
          exp.category === "ESTRUTURA";

        return (
          <div
            key={exp.id || exp._id}
            className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-5 break-inside-avoid"
          >
            {/* Header da Obra / Despesa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black ${
                    isInfra
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                      : "bg-orange-50 dark:bg-orange-955/40 text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {isInfra ? <Building2 className="h-5 w-5" /> : <Utensils className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                      {exp.title}
                    </h3>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isInfra
                          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50"
                          : "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200/50"
                      }`}
                    >
                      {isInfra ? "🏗️ Infraestrutura" : "🍽️ Operacional"}
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {exp.category}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-zinc-500 mt-0.5">{exp.description}</p>
                  )}
                </div>
              </div>

              {/* Resumo da Obra & Ações */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Custo Total
                  </span>
                  <span className="text-lg font-black text-zinc-900 dark:text-white">
                    {formatMoney(exp.totalAmount)}
                  </span>
                </div>

                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800" />

                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
                    Devolvido
                  </span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                    {formatMoney(exp.totalRepaid)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 ml-2 print:hidden">
                  <Button
                    size="sm"
                    onClick={() => {
                      setTargetExpenseId(exp.id || exp._id || "");
                      setIsItemModalOpen(true);
                    }}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50 cursor-pointer font-bold text-xs"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Item
                  </Button>
                  <button
                    onClick={() => handleDeleteExpense(exp.id || exp._id || "")}
                    className="p-2 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                    title="Excluir grupo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabela de Itens Discriminados */}
            {exp.items.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-2">
                Nenhum item discriminado ainda nesta despesa. Clique no botão &quot;+ Item&quot; acima para lançar materiais comprados ou doados.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Item / Material</th>
                      <th className="py-2.5 px-3">Comprado / Doado Por</th>
                      <th className="py-2.5 px-3 text-right">Valor</th>
                      <th className="py-2.5 px-3 text-center">Status / Tipo</th>
                      <th className="py-2.5 px-3 text-right">Reembolsado</th>
                      <th className="py-2.5 px-3 text-right print:hidden">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                    {exp.items.map((item) => {
                      const itemId = item._id?.toString() || item.id || "";
                      return (
                        <tr key={itemId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-zinc-900 dark:text-white block">
                                {item.description}
                              </span>
                              {item.receiptUrl && (
                                <a
                                  href={item.receiptUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-md hover:bg-indigo-100 transition-all text-[10px] font-bold flex items-center gap-0.5"
                                  title="Ver comprovante da compra"
                                >
                                  <Paperclip className="h-3 w-3" />
                                  Nota
                                </a>
                              )}
                            </div>
                            {item.notes && (
                              <span className="text-[10px] text-zinc-400 block">{item.notes}</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                              {item.paidBy}
                            </span>
                            {item.payerPhone && (
                              <span className="text-[10px] text-zinc-400 block">{item.payerPhone}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right font-black text-zinc-900 dark:text-white">
                            {item.isDonation ? (
                              <span className="text-pink-600 dark:text-pink-400 font-bold">Doação</span>
                            ) : (
                              formatMoney(item.amount)
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {item.isDonation ? (
                              <span className="bg-pink-50 dark:bg-pink-955/30 text-pink-600 dark:text-pink-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-pink-200/50">
                                Doação
                              </span>
                            ) : item.status === "REEMBOLSADO" ? (
                              <span className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                                Quitado
                              </span>
                            ) : item.status === "REEMBOLSADO_PARCIAL" ? (
                              <span className="bg-amber-50 dark:bg-amber-955/30 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-200/50">
                                Parcial
                              </span>
                            ) : (
                              <span className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-red-200/50">
                                Pendente
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-amber-600 dark:text-amber-400">
                            {item.isDonation ? "-" : formatMoney(item.repaidAmount)}
                          </td>
                          <td className="py-3 px-3 text-right print:hidden">
                            <div className="flex items-center justify-end gap-1.5">
                              {!item.isDonation && item.status !== "REEMBOLSADO" && item.repaidAmount < item.amount ? (
                                <button
                                  onClick={() => handleOpenRepayModal(exp.id || exp._id || "", item)}
                                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-955/40 dark:text-amber-300 dark:hover:bg-amber-900/50 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                                  title="Dar baixa de devolução/reembolso"
                                >
                                  Dar Baixa
                                </button>
                              ) : !item.isDonation ? (
                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Pago
                                </span>
                              ) : null}
                              <button
                                onClick={() => handleDeleteItem(exp.id || exp._id || "", itemId)}
                                className="p-1 text-zinc-400 hover:text-red-500 rounded-md transition-all cursor-pointer"
                                title="Remover item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
