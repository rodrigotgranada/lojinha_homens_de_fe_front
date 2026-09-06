"use client";

import React from "react";
import {
  DollarSign,
  Layers,
  Users,
  TrendingUp,
  Wallet,
  CheckCircle2,
  Printer,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDespesas } from "../context/DespesasContext";

export const RelatorioGeralTab: React.FC = () => {
  const {
    summary,
    expensesList,
    incomesList,
    payersReport,
    formatMoney,
    handlePrint,
  } = useDespesas();

  const totalIncomes = summary.totalExtraIncomes || 0;
  const lojinhaRev = summary.lojinhaRevenue || 0;
  const lojinhaCst = summary.lojinhaCost || 0;
  const lojinhaProf = summary.lojinhaProfit || 0;
  const totalFunds = summary.totalAvailableEventFunds || 0;
  const totalExpenses = summary.totalExpensesAmount || 0;
  const finalBalance = summary.finalEventBalance || 0;
  const pendingRepay = summary.totalExpensesPendingRepay || 0;
  const totalRepaid = summary.totalExpensesRepaid || 0;
  const immediateCash = summary.immediateCashAvailable ?? (totalIncomes + lojinhaRev - totalRepaid - (summary.totalStoreRepaid || 0));

  return (
    <div className="space-y-6">
      {/* Botão de Impressão e Cabeçalho do Relatório */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Balanço Consolidado
            </span>
            <h3 className="text-xl font-black text-zinc-950 dark:text-white">
              Relatório Executivo & Prestação Geral do Evento
            </h3>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Demonstrativo completo de Entradas, Saídas, Reembolsos aos voluntários, Disponibilidade Física de Caixa e Superávit Final.
          </p>
        </div>

        <Button
          onClick={handlePrint}
          className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 flex items-center gap-2 text-xs font-bold shrink-0 cursor-pointer shadow-md"
        >
          <Printer className="h-4 w-4" />
          Imprimir Relatório Completo (A4)
        </Button>
      </div>

      {/* DESTAQUE: DISPONIBILIDADE IMEDIATA EM CAIXA VS SUPERÁVIT */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Fluxo de Caixa Físico (Disponibilidade Real)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            {formatMoney(immediateCash)}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
            Total de dinheiro real arrecadado (Receitas Extras + Vendas Loja) <strong>subtraído apenas do que já foi devolvido fisicamente aos irmãos</strong>. Este é o saldo em mãos neste momento.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 flex flex-col gap-1 min-w-[240px]">
          <span className="text-xs text-emerald-100 font-bold uppercase">Superávit Final Previsto</span>
          <span className="text-2xl font-black">{formatMoney(finalBalance)}</span>
          <span className="text-[10px] text-emerald-200">
            (Após quitar todos os R$ {formatMoney(pendingRepay + (summary.totalStorePendingRepay || 0))} restantes)
          </span>
        </div>
      </div>

      {/* QUADRO 1: RESUMO DO BALANÇO FINANCEIRO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TOTAL ENTRADAS */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                (+) Total de Entradas / Caixa
              </span>
              <h4 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
                {formatMoney(totalFunds)}
              </h4>
            </div>
            <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-xs">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="border-t border-emerald-200/50 dark:border-emerald-900/40 pt-2 text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Receitas Extras (Inscrições, Rifas):</span>
              <strong className="text-emerald-700 dark:text-emerald-400">{formatMoney(totalIncomes)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Lucro Líquido da Lojinha:</span>
              <strong className="text-indigo-600 dark:text-indigo-400">+{formatMoney(lojinhaProf)}</strong>
            </div>
            <div className="text-[10px] text-zinc-400">
              (Faturamento Loja: {formatMoney(lojinhaRev)} - Custo a devolver: {formatMoney(lojinhaCst)})
            </div>
          </div>
        </div>

        {/* TOTAL SAÍDAS / DESPESAS */}
        <div className="bg-rose-50/50 dark:bg-rose-955/20 border border-rose-200/80 dark:border-rose-900/40 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                (-) Custos Gerais do Evento
              </span>
              <h4 className="text-2xl font-black text-rose-800 dark:text-rose-300 mt-1">
                {formatMoney(totalExpenses + (summary.totalStoreInvestment || 0))}
              </h4>
            </div>
            <div className="p-2.5 bg-rose-500 text-white rounded-2xl shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="border-t border-rose-200/50 dark:border-rose-900/40 pt-2 text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>🏗️ Infraestrutura & Benfeitorias:</span>
              <strong className="text-zinc-900 dark:text-white">{formatMoney(summary.totalInfraExpenses || 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span>🍽️ Operacional / Consumo:</span>
              <strong className="text-zinc-900 dark:text-white">{formatMoney(summary.totalOperExpenses || 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span>👕 Confecção / Investimento Loja:</span>
              <strong className="text-amber-700 dark:text-amber-400">{formatMoney(summary.totalStoreInvestment || 0)}</strong>
            </div>
            <div className="flex justify-between text-[11px] pt-1 border-t border-rose-200/40 dark:border-rose-900/30">
              <span>Já Devolvido: <strong className="text-emerald-600">{formatMoney(totalRepaid + (summary.totalStoreRepaid || 0))}</strong></span>
              <span>Pendente: <strong className="text-amber-600">{formatMoney(pendingRepay + (summary.totalStorePendingRepay || 0))}</strong></span>
            </div>
          </div>
        </div>

        {/* SALDO LÍQUIDO FINAL */}
        <div className={`border rounded-3xl p-5 shadow-sm space-y-3 ${
          finalBalance >= 0
            ? "bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50"
            : "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block text-indigo-700 dark:text-indigo-400">
                (=) Saldo Líquido Final do Retiro
              </span>
              <h4 className={`text-2xl font-black mt-1 ${
                finalBalance >= 0 ? "text-indigo-900 dark:text-indigo-200" : "text-amber-700 dark:text-amber-400"
              }`}>
                {formatMoney(finalBalance)}
              </h4>
            </div>
            <div className={`p-2.5 rounded-2xl text-white shadow-xs ${finalBalance >= 0 ? "bg-indigo-600" : "bg-amber-500"}`}>
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="border-t border-indigo-200/50 dark:border-indigo-900/40 pt-2 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <p className="font-semibold">
              {finalBalance >= 0
                ? "🎉 Superávit positivo! Saldo que fica retido no fundo de caixa do Retiro após cobrir todas as despesas."
                : "⚠️ Déficit de caixa! O total de despesas superou as arrecadações do evento."}
            </p>
          </div>
        </div>
      </div>

      {/* QUADRO 2: QUANTO E PARA QUEM PAGAR (REEMBOLSOS A IRMÃOS) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <h4 className="text-base font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              1. Para Quem e Quanto Pagar? (Reembolsos aos Irmãos Financiadores)
            </h4>
            <p className="text-xs text-zinc-500">
              Extrato consolidado de cada participante que comprou itens/materiais do próprio bolso.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total a Reembolsar</span>
            <span className="text-base font-black text-amber-600 dark:text-amber-400">
              {formatMoney(pendingRepay + (summary.totalStorePendingRepay || 0))}
            </span>
          </div>
        </div>

        {payersReport.length === 0 ? (
          <p className="text-xs text-zinc-400 italic py-4 text-center">Nenhum irmão possui compras lançadas para este evento.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 uppercase font-black text-[10px]">
                  <th className="py-2.5 px-3">Irmão / Pagador</th>
                  <th className="py-2.5 px-3">Telefone</th>
                  <th className="py-2.5 px-3 text-center">Itens Comprados</th>
                  <th className="py-2.5 px-3 text-right">Total Tirado do Bolso</th>
                  <th className="py-2.5 px-3 text-right">Já Reembolsado</th>
                  <th className="py-2.5 px-3 text-right text-amber-600 dark:text-amber-400 font-black">Saldo Restante a Devolver</th>
                  <th className="py-2.5 px-3 text-center">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                {payersReport.map((p, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="py-3 px-3 font-bold text-zinc-900 dark:text-white">
                      {p.payerName}
                    </td>
                    <td className="py-3 px-3 text-zinc-500">
                      {p.payerPhone || "Não informado"}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
                        {p.items.length} item(ns)
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-zinc-900 dark:text-white">
                      {formatMoney(p.totalPaid)}
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-600 font-semibold">
                      {formatMoney(p.totalRepaid)}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-amber-600 dark:text-amber-400 text-sm">
                      {formatMoney(p.balanceToRepay)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.isFullyRepaid ? (
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Quitado
                        </span>
                      ) : (
                        <span className="bg-amber-100 dark:bg-amber-955/40 text-amber-700 dark:text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                          Pendente
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUADRO 3: DISCRIMINAÇÃO DETALHADA DE TODAS AS ENTRADAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ENTRADAS DETALHADAS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h4 className="text-sm font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              2. Detalhamento das Entradas ({incomesList.length + 1})
            </h4>
            <span className="text-xs font-black text-emerald-600">{formatMoney(totalFunds)}</span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {/* Lojinha */}
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-indigo-950 dark:text-indigo-200 block">
                  Vendas da Lojinha (Lucro Líquido)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Bruto: {formatMoney(lojinhaRev)} | Custo repassado: {formatMoney(lojinhaCst)}
                </span>
              </div>
              <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                +{formatMoney(lojinhaProf)}
              </span>
            </div>

            {/* Receitas Extras */}
            {incomesList.map((inc) => (
              <div key={inc.id || inc._id} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-zinc-900 dark:text-white block">
                    {inc.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase font-black">
                    {inc.type} · {new Date(inc.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                  +{formatMoney(inc.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SAÍDAS / DESPESAS DETALHADAS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h4 className="text-sm font-black text-zinc-950 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-rose-500" />
              3. Detalhamento das Despesas ({expensesList.length})
            </h4>
            <span className="text-xs font-black text-rose-600">{formatMoney(totalExpenses)}</span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {expensesList.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-4 text-center">Nenhuma despesa cadastrada.</p>
            ) : (
              expensesList.map((exp) => (
                <div key={exp.id || exp._id} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-zinc-900 dark:text-white block flex items-center gap-1.5">
                      {exp.nature === "INFRAESTRUTURA" ? "🏗️" : "🍽️"} {exp.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold">
                      {exp.items.length} item(ns) · {exp.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-zinc-900 dark:text-white block">
                      {formatMoney(exp.totalAmount)}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Devolvido: {formatMoney(exp.totalRepaid)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
