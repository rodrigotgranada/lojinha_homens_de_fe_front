import React, { useState, useEffect } from "react";
import { useCustomers } from "../context/CustomerContext";
import { Modal } from "@/components/ui/Modal";
import { ShoppingBag, ChevronDown, ChevronUp, Clock, AlertCircle, CheckCircle2, Check, Loader2, MessageCircle } from "lucide-react";
import { Product } from "@/hooks/useApi";
import { openWhatsAppCobranca } from "@/utils/whatsappUtils";
import { paymentConfigService } from "@/services/paymentConfigService";
import { PaymentConfig } from "@/types";

export const CustomerHistoryModal = () => {
  const {
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    selectedCustomer,
    setSelectedCustomer,
    customerSales,
    loadingSales,
    totalSpent,
    formatCurrency,
    pendingBalance,
    pendingCount,
    paySale,
    payAllSales,
    payingSaleId,
    payingAll,
    markCustomerCharged
  } = useCustomers();

  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);
  const [pixConfig, setPixConfig] = useState<PaymentConfig | null>(null);

  useEffect(() => {
    if (isHistoryModalOpen) {
      paymentConfigService.getActive().then(setPixConfig).catch(console.error);
    }
  }, [isHistoryModalOpen]);

  const toggleExpand = (saleId: string) => {
    setExpandedSaleId((prev) => (prev === saleId ? null : saleId));
  };

  const handleClose = () => {
    setIsHistoryModalOpen(false);
    setSelectedCustomer(null);
    setExpandedSaleId(null);
  };

  const handlePayAll = async () => {
    if (!selectedCustomer) return;
    const confirm = window.confirm(
      `Deseja quitar TODAS as ${pendingCount} pendência(s) de ${selectedCustomer.firstName} ${selectedCustomer.lastName} no valor total de ${formatCurrency(pendingBalance)}?`
    );
    if (confirm) {
      await payAllSales();
    }
  };

  const handleCobrarWhatsApp = async () => {
    if (!selectedCustomer) return;

    // Se já foi cobrado, avisa o operador para evitar duplicidades acidentais
    if (selectedCustomer.lastChargedAt) {
      const chargeTime = new Date(selectedCustomer.lastChargedAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const confirmSendAgain = window.confirm(
        `AVISO: ${selectedCustomer.firstName} já foi cobrado no WhatsApp em ${chargeTime}${
          selectedCustomer.chargeCount && selectedCustomer.chargeCount > 1
            ? ` (${selectedCustomer.chargeCount} vezes)`
            : ""
        }.\n\nDeseja abrir o WhatsApp e enviar uma nova mensagem de cobrança mesmo assim?`
      );
      if (!confirmSendAgain) return;
    }

    const opened = openWhatsAppCobranca(selectedCustomer, pendingBalance, pixConfig || undefined);
    if (opened) {
      const cId = (selectedCustomer.id || (selectedCustomer as any)._id || "").toString();
      await markCustomerCharged(cId);
    }
  };

  const handlePayIndividual = async (e: React.MouseEvent, saleId: string, amount: number) => {
    e.stopPropagation();
    const confirm = window.confirm(`Deseja marcar esta compra no valor de ${formatCurrency(amount)} como PAGA?`);
    if (confirm) {
      await paySale(saleId);
    }
  };

  const activeSalesCount = customerSales.filter((s) => s.status !== "CANCELADO").length;

  return (
    <Modal
      isOpen={isHistoryModalOpen}
      onClose={handleClose}
      title={`Histórico de Compras - ${selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : ""}`}
      size="lg"
    >
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
        {selectedCustomer && (
          <div className="space-y-3">
            <div className={`bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 grid ${pendingBalance > 0 ? "grid-cols-3" : "grid-cols-2"} gap-3 text-center shadow-xs`}>
              <div>
                <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Compras</p>
                <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1">{activeSalesCount}</h4>
              </div>
              <div>
                <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Geral</p>
                <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1">{formatCurrency(totalSpent)}</h4>
              </div>
              {pendingBalance > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Em Aberto</p>
                  <h4 className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">{formatCurrency(pendingBalance)}</h4>
                </div>
              )}
            </div>

            {/* Banner de Quitado quando não há pendências */}
            {pendingBalance === 0 && activeSalesCount > 0 && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold">Todas as compras deste cliente estão quitadas. Nenhuma pendência em aberto.</span>
              </div>
            )}

            {/* Banner de Aviso quando o cliente já foi cobrado anteriormente */}
            {pendingCount > 0 && selectedCustomer.lastChargedAt && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center gap-2.5 text-blue-900 dark:text-blue-200">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-black">Já cobrado no WhatsApp: </span>
                  <span>
                    Última cobrança enviada em{" "}
                    <strong>
                      {new Date(selectedCustomer.lastChargedAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
                    {selectedCustomer.chargeCount && selectedCustomer.chargeCount > 1
                      ? ` (${selectedCustomer.chargeCount} vezes no total)`
                      : ""}.
                  </span>
                </div>
              </div>
            )}

            {/* Banner de Ação Rápida para Quitar Todas as Pendências */}
            {pendingCount > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col gap-3.5">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                      {pendingCount} compra(s) pendente(s) ({formatCurrency(pendingBalance)})
                    </p>
                    <p className="text-[11px] text-amber-700/80 dark:text-amber-300/70 mt-0.5">
                      Saldo em aberto: <strong>{formatCurrency(pendingBalance)}</strong>. A cobrança pelo WhatsApp enviará apenas esse valor devido.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-500/20">
                  <button
                    type="button"
                    onClick={handleCobrarWhatsApp}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
                    title={`Abrir WhatsApp para cobrar apenas o saldo pendente de ${formatCurrency(pendingBalance)}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {selectedCustomer.lastChargedAt ? "Cobrar Novamente" : "Cobrar no WhatsApp"} ({formatCurrency(pendingBalance)})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePayAll}
                    disabled={payingAll}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-900 dark:text-zinc-100 text-xs font-black rounded-xl border border-zinc-250 dark:border-zinc-700 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {payingAll ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Quitando...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Quitar Todas</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
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
              const isPending = sale.status === "PENDENTE";
              const isPayingThis = payingSaleId === sale.id;

              return (
                <div
                  key={sale.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isPending
                      ? "border-amber-300 dark:border-amber-700/60 bg-amber-50/20 dark:bg-amber-950/10"
                      : isExpanded
                      ? "border-zinc-200 bg-zinc-50/20 dark:border-zinc-800"
                      : "border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50/50"
                  }`}
                >
                  {/* Collapsible Header */}
                  <div
                    onClick={() => toggleExpand(sale.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-mono text-zinc-400">#{sale.id.slice(-8)}</p>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                          sale.status === "PAGO"
                            ? "bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-450 border-emerald-100 dark:border-emerald-900/30"
                            : sale.status === "PENDENTE"
                            ? "bg-amber-50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-450 border-amber-100 dark:border-amber-900/30"
                            : "bg-rose-50 dark:bg-rose-955/20 text-rose-600 dark:text-rose-455 border-rose-100 dark:border-rose-900/30"
                        }`}>
                          {sale.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {dateStr}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <p className="font-black text-sm text-zinc-950 dark:text-white">{formatCurrency(sale.totalPrice)}</p>

                      {/* Botão de Quitar Venda Específica */}
                      {isPending && (
                        <button
                          type="button"
                          onClick={(e) => handlePayIndividual(e, sale.id, sale.totalPrice)}
                          disabled={isPayingThis || payingAll}
                          title="Marcar esta pendência específica como PAGA"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                          {isPayingThis ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          )}
                          <span>Quitar</span>
                        </button>
                      )}

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
