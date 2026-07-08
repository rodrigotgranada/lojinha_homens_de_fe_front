import React from "react";
import { useSales } from "../context/SalesContext";
import { ChevronDown, ChevronUp, CheckCircle, Trash2 } from "lucide-react";
import { Product } from "@/hooks/useApi";

export const SalesTable = () => {
  const {
    filteredSales,
    expandedSaleId,
    toggleExpand,
    formatCurrency,
    setSaleToPay,
    setIsPayModalOpen,
    setSaleToCancel,
    setIsCancelModalOpen
  } = useSales();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800/80 text-zinc-400 text-xs font-extrabold uppercase tracking-wider">
              <th className="py-4 px-6">ID da Venda</th>
              <th className="py-4 px-6">Data/Hora</th>
              <th className="py-4 px-6">Cliente</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-zinc-450 dark:text-zinc-500 font-semibold text-sm">
                  Nenhuma venda localizada para estes critérios de busca.
                </td>
              </tr>
            ) : (
              filteredSales.map((sale) => {
                const customer = sale.customerId as any;
                const customerName = customer ? `${customer.firstName} ${customer.lastName}` : "Consumidor";
                const dateStr = new Date(sale.createdAt).toLocaleString("pt-BR");
                const isExpanded = expandedSaleId === sale.id;

                return (
                  <React.Fragment key={sale.id}>
                    {/* Main Table Row */}
                    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20 text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all">
                      <td className="py-4 px-6 font-mono text-xs text-zinc-400">#{sale.id.slice(-8)}</td>
                      <td className="py-4 px-6 text-zinc-505 dark:text-zinc-400">{dateStr}</td>
                      <td className="py-4 px-6 font-bold">{customerName}</td>
                      <td className="py-4 px-6 font-black text-zinc-955 dark:text-white">
                        {formatCurrency(sale.totalPrice)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                          sale.status === "PAGO"
                            ? "bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-450 border-emerald-100 dark:border-emerald-900/30"
                            : sale.status === "PENDENTE"
                            ? "bg-amber-50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-450 border-amber-100 dark:border-amber-900/30"
                            : "bg-rose-50 dark:bg-rose-955/20 text-rose-600 dark:text-rose-455 border-rose-100 dark:border-rose-900/30"
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleExpand(sale.id)}
                          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-550 dark:text-zinc-400 rounded-lg transition-all"
                          title="Ver detalhes"
                        >
                          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                        
                        {sale.status === "PENDENTE" && (
                          <button
                            onClick={() => {
                              setSaleToPay(sale);
                              setIsPayModalOpen(true);
                            }}
                            className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-955/30 text-emerald-500 dark:text-emerald-450 rounded-lg transition-all hover:text-emerald-650"
                            title="Marcar como Pago"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        
                        {sale.status !== "CANCELADO" && (
                          <button
                            onClick={() => {
                              setSaleToCancel(sale);
                              setIsCancelModalOpen(true);
                            }}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-955/30 text-rose-550 dark:text-rose-400 rounded-lg transition-all hover:text-rose-650"
                            title="Desfazer/Estornar Venda"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </td>
                    </tr>

                    {/* Expanded Subtable Row (Items Breakdown) */}
                    {isExpanded && (
                      <tr className="bg-zinc-50/50 dark:bg-zinc-850/10">
                        <td colSpan={6} className="py-4 px-8 border-t border-b border-zinc-100 dark:border-zinc-800/40">
                          <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">Itens do Cupom</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                                {sale.items.map((item: any, itemIdx) => {
                                  const product = item.productId as Product | undefined;
                                  const productName = product ? product.name : "Produto Removido";
                                  const subtotal = item.quantity * item.priceAtPurchase;

                                  return (
                                    <div key={itemIdx} className="py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-750 dark:text-zinc-300">
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-[10px] font-black">
                                          {item.quantity}x
                                        </span>
                                        <span>{productName}</span>
                                      </div>
                                      <div className="flex items-center gap-4 text-right">
                                        <span className="text-zinc-400">{formatCurrency(item.priceAtPurchase)}/un</span>
                                        <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(subtotal)}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="bg-zinc-100/50 dark:bg-zinc-800/30 rounded-2xl p-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 space-y-2 flex flex-col justify-center">
                                <div className="flex justify-between">
                                  <span>Venda ID:</span>
                                  <span className="font-mono text-zinc-400">{sale.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Data Lançamento:</span>
                                  <span>{dateStr}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Evento ID:</span>
                                  <span className="font-mono text-zinc-450">{sale.eventId}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
