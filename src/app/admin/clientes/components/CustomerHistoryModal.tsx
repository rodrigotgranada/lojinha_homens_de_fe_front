import React, { useState } from "react";
import { useCustomers } from "../context/CustomerContext";
import { Modal } from "@/components/ui/Modal";
import { ShoppingBag, ChevronDown, ChevronUp, Clock, AlertCircle } from "lucide-react";
import { Product } from "@/hooks/useApi";

export const CustomerHistoryModal = () => {
  const {
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    selectedCustomer,
    setSelectedCustomer,
    customerSales,
    loadingSales,
    totalSpent,
    formatCurrency
  } = useCustomers();

  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);

  const toggleExpand = (saleId: string) => {
    setExpandedSaleId((prev) => (prev === saleId ? null : saleId));
  };

  const handleClose = () => {
    setIsHistoryModalOpen(false);
    setSelectedCustomer(null);
    setExpandedSaleId(null);
  };

  const activeSalesCount = customerSales.filter((s) => s.status !== "CANCELADO").length;

  return (
    <Modal
      isOpen={isHistoryModalOpen}
      onClose={handleClose}
      title={`Histórico de Compras - ${selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : ""}`}
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {selectedCustomer && (
          <div className="bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Compras Efetuadas</p>
              <h4 className="text-xl font-black text-zinc-950 dark:text-white mt-0.5">{activeSalesCount}</h4>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Acumulado</p>
              <h4 className="text-xl font-black text-emerald-600 dark:text-emerald-450 mt-0.5">{formatCurrency(totalSpent)}</h4>
            </div>
          </div>
        )}

        {loadingSales ? (
          <div className="py-12 flex justify-center items-center">
            <svg className="animate-spin h-6 w-6 text-indigo-650" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="ml-2.5 text-xs text-zinc-500 font-semibold">Buscando transações...</span>
          </div>
        ) : customerSales.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 dark:text-zinc-550 space-y-2">
            <ShoppingBag className="h-10 w-10 mx-auto stroke-1 opacity-50" />
            <p className="font-semibold text-xs">Nenhum registro de compra encontrado para este usuário.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customerSales.map((sale) => {
              const isExpanded = expandedSaleId === sale.id;
              const dateStr = new Date(sale.createdAt).toLocaleString("pt-BR");

              return (
                <div
                  key={sale.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isExpanded
                      ? "border-zinc-200 bg-zinc-50/20 dark:border-zinc-800"
                      : "border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50/50"
                  }`}
                >
                  {/* Collapsible Header */}
                  <div
                    onClick={() => toggleExpand(sale.id)}
                    className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-zinc-400">#{sale.id.slice(-8)}</p>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {dateStr}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        sale.status === "PAGO"
                          ? "bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-450 border-emerald-100 dark:border-emerald-900/30"
                          : sale.status === "PENDENTE"
                          ? "bg-amber-50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-450 border-amber-100 dark:border-amber-900/30"
                          : "bg-rose-50 dark:bg-rose-955/20 text-rose-600 dark:text-rose-455 border-rose-100 dark:border-rose-900/30"
                      }`}>
                        {sale.status}
                      </span>
                      <p className="font-bold text-sm text-zinc-950 dark:text-white">{formatCurrency(sale.totalPrice)}</p>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                    </div>
                  </div>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div className="p-4 bg-zinc-50/50 dark:bg-zinc-850/10 border-t border-zinc-100 dark:border-zinc-800/40 divide-y divide-zinc-100 dark:divide-zinc-800/40 text-xs">
                      {sale.items.map((item: any, idx) => {
                        const product = item.productId as Product | undefined;
                        const productName = product ? product.name : "Produto Removido";
                        const subtotal = item.quantity * item.priceAtPurchase;

                        return (
                          <div key={idx} className="py-2 flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-[10px] font-black">
                                {item.quantity}x
                              </span>
                              <span>{productName}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-zinc-400 mr-2">{formatCurrency(item.priceAtPurchase)}/un</span>
                              <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(subtotal)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
