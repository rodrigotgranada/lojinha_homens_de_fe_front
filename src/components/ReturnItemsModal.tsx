"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Sale, Product, User } from "@/types";
import { saleService } from "@/services/saleService";
import { useApp } from "@/context/AppContext";
import {
  RotateCcw,
  AlertTriangle,
  Info,
  CheckCircle2,
  DollarSign,
  Plus,
  Minus,
  Loader2,
  Receipt,
  User as UserIcon,
} from "lucide-react";

interface ReturnItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: Sale | null;
  onSuccess: () => void;
}

export const ReturnItemsModal: React.FC<ReturnItemsModalProps> = ({
  isOpen,
  onClose,
  sale,
  onSuccess,
}) => {
  const { currentUser } = useApp();
  const [returnQuantities, setReturnQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState<"DINHEIRO" | "PIX" | "CREDITO">("DINHEIRO");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && sale) {
      setReturnQuantities({});
      setReason("");
      setRefundMethod("DINHEIRO");
      setError("");
    }
  }, [isOpen, sale]);

  // Format currency helper
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // Helper to get product details
  const getItemDetails = (item: any) => {
    const product = item.productId as Product | undefined;
    const productIdStr = product
      ? ((product as any)._id || product.id || "").toString()
      : (item.productId || "").toString();
    const productName = product?.name || "Produto";
    const unitPrice = Number(item.priceAtPurchase) || 0;
    const originalQty = Number(item.quantity) || 0;
    const alreadyReturned = Number(item.returnedQuantity) || 0;
    const availableToReturn = Math.max(0, originalQty - alreadyReturned);

    return {
      productIdStr,
      productName,
      unitPrice,
      originalQty,
      alreadyReturned,
      availableToReturn,
    };
  };

  const handleQuantityChange = (productId: string, nextQty: number, maxQty: number) => {
    const clamped = Math.max(0, Math.min(nextQty, maxQty));
    setReturnQuantities((prev) => ({
      ...prev,
      [productId]: clamped,
    }));
  };

  // Calculations
  const { totalRefundAmount, totalItemsCount, willFullyCancel } = useMemo(() => {
    if (!sale || !sale.items) {
      return { totalRefundAmount: 0, totalItemsCount: 0, willFullyCancel: false };
    }

    let refund = 0;
    let count = 0;
    let allReturned = true;

    for (const item of sale.items) {
      const details = getItemDetails(item);
      const selectedQty = returnQuantities[details.productIdStr] || 0;
      refund += selectedQty * details.unitPrice;
      count += selectedQty;

      if (details.alreadyReturned + selectedQty < details.originalQty) {
        allReturned = false;
      }
    }

    return {
      totalRefundAmount: refund,
      totalItemsCount: count,
      willFullyCancel: allReturned && count > 0,
    };
  }, [sale, returnQuantities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sale) return;

    if (totalItemsCount <= 0) {
      setError("Selecione pelo menos 1 unidade de algum item para devolução.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const saleId = (sale.id || (sale as any)._id || "").toString();
      const operatorName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
        : "Admin";

      const itemsPayload = Object.entries(returnQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([productId, quantity]) => ({
          productId,
          quantity,
        }));

      await saleService.returnSaleItems(saleId, {
        items: itemsPayload,
        reason: reason.trim(),
        refundMethod: sale.status === "PAGO" ? refundMethod : undefined,
        operatorId: currentUser?.id,
        operatorName,
      });

      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error("Erro ao processar devolução:", err);
      const msg = err instanceof Error ? err.message : "Erro ao processar devolução de itens.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!sale) return null;

  const saleIdShort = (sale.id || (sale as any)._id || "").toString().slice(-8);
  const customer = sale.customerId as User | undefined;
  const customerName = customer
    ? `${customer.firstName} ${customer.lastName || ""}`.trim()
    : "Cliente";
  const isPaid = sale.status === "PAGO";
  const isPending = sale.status === "PENDENTE";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Devolução de Itens da Venda"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Sale Header Summary */}
        <div className="bg-zinc-100 dark:bg-zinc-850/60 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-zinc-500" />
              <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                Venda #{saleIdShort}
              </span>
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isPaid
                  ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40"
                  : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
              }`}
            >
              {sale.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <UserIcon className="h-3.5 w-3.5 text-zinc-400" />
              {customerName}
            </span>
            <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
              Valor Atual: {formatCurrency(sale.totalPrice)}
            </span>
          </div>
        </div>

        {/* Informative Alert */}
        {isPaid ? (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-2.5 text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div className="text-xs space-y-1">
              <p className="font-bold">Esta venda já foi PAGA.</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Ao confirmar a devolução, você deve estornar o valor físico em dinheiro ou PIX para o cliente. O estoque retornará ao evento automaticamente.
              </p>
            </div>
          </div>
        ) : isPending ? (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl flex items-start gap-2.5 text-blue-800 dark:text-blue-300">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
            <div className="text-xs space-y-1">
              <p className="font-bold">Esta venda está PENDENTE (Fiado).</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                O valor dos itens devolvidos será subtraído do saldo em aberto do cliente automaticamente.
              </p>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Items Breakdown & Selection */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
            Selecione a quantidade a devolver:
          </p>

          <div className="space-y-2.5 max-h-[38vh] overflow-y-auto pr-1">
            {sale.items.map((item: any, idx: number) => {
              const details = getItemDetails(item);
              const selectedQty = returnQuantities[details.productIdStr] || 0;
              const subtotalReturn = selectedQty * details.unitPrice;
              const isDisabled = details.availableToReturn <= 0;

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    selectedQty > 0
                      ? "bg-amber-50/50 dark:bg-amber-950/15 border-amber-300 dark:border-amber-800/80 shadow-xs"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  } ${isDisabled ? "opacity-60 bg-zinc-50 dark:bg-zinc-900" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {details.productName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                        <span>{formatCurrency(details.unitPrice)}/un</span>
                        <span>•</span>
                        <span>Comprou: {details.originalQty} un</span>
                        {details.alreadyReturned > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-600 dark:text-amber-400 font-bold">
                              Já devolvido: {details.alreadyReturned} un
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stepper Controls */}
                    <div className="flex items-center gap-3 shrink-0">
                      {isDisabled ? (
                        <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                          Esgotado
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-250 dark:border-zinc-700">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                details.productIdStr,
                                selectedQty - 1,
                                details.availableToReturn
                              )
                            }
                            disabled={selectedQty <= 0}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 active:scale-95 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            title="Diminuir"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center font-black text-sm text-zinc-900 dark:text-zinc-100">
                            {selectedQty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                details.productIdStr,
                                selectedQty + 1,
                                details.availableToReturn
                              )
                            }
                            disabled={selectedQty >= details.availableToReturn}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 active:scale-95 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            title="Aumentar"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}

                      {selectedQty > 0 && (
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 min-w-[70px] text-right">
                          - {formatCurrency(subtotalReturn)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refund Method (If Sale was PAGO and items selected) */}
        {isPaid && totalItemsCount > 0 && (
          <div className="space-y-2 pt-1 border-t border-zinc-150 dark:border-zinc-800">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Forma de Devolução do Dinheiro ao Cliente:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRefundMethod("DINHEIRO")}
                className={`py-2 px-3 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  refundMethod === "DINHEIRO"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white dark:bg-zinc-850 text-zinc-700 dark:text-zinc-300 border-zinc-250 dark:border-zinc-700 hover:bg-zinc-50"
                }`}
              >
                💵 Dinheiro
              </button>
              <button
                type="button"
                onClick={() => setRefundMethod("PIX")}
                className={`py-2 px-3 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  refundMethod === "PIX"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white dark:bg-zinc-850 text-zinc-700 dark:text-zinc-300 border-zinc-250 dark:border-zinc-700 hover:bg-zinc-50"
                }`}
              >
                📱 PIX
              </button>
              <button
                type="button"
                onClick={() => setRefundMethod("CREDITO")}
                className={`py-2 px-3 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  refundMethod === "CREDITO"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white dark:bg-zinc-850 text-zinc-700 dark:text-zinc-300 border-zinc-250 dark:border-zinc-700 hover:bg-zinc-50"
                }`}
              >
                🎟️ Crédito
              </button>
            </div>
          </div>
        )}

        {/* Reason Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Motivo da devolução (opcional):
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex: Troca de tamanho, desistência de bombom, etc."
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-250 dark:border-zinc-750 bg-white dark:bg-zinc-850 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Live Calculation Summary */}
        {totalItemsCount > 0 && (
          <div className="bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-zinc-600 dark:text-zinc-400">
              <span>Itens a devolver:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {totalItemsCount} unidade{totalItemsCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300">
              <span>Total a estornar / abater:</span>
              <span className="font-black text-rose-600 dark:text-rose-400 text-sm">
                - {formatCurrency(totalRefundAmount)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100 pt-1 border-t border-zinc-200 dark:border-zinc-800">
              <span>Novo valor total da venda:</span>
              <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                {formatCurrency(Math.max(0, sale.totalPrice - totalRefundAmount))}
              </span>
            </div>
            {willFullyCancel && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1">
                * Todos os itens foram selecionados: a venda será cancelada integralmente.
              </p>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-150 dark:border-zinc-800">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="text-xs"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || totalItemsCount <= 0}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-xs flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                <span>Confirmar Devolução ({formatCurrency(totalRefundAmount)})</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
