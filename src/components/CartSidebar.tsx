"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { QuickUserModal } from "./QuickUserModal";
import { Modal } from "./ui/Modal";
import { ShoppingBag, AlertTriangle } from "lucide-react";
import { CartItemList } from "./cart/CartItemList";
import { CartCustomerSelector } from "./cart/CartCustomerSelector";
import { CartPaymentSummary } from "./cart/CartPaymentSummary";
import { useCartCheckout } from "./cart/useCartCheckout";

export const CartSidebar: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    activeEvent,
  } = useApp();

  const {
    cpf,
    setCpf,
    isPaid,
    setIsPaid,
    loading,
    error,
    success,
    quickCpf,
    isQuickModalOpen,
    setIsQuickModalOpen,
    inactiveCustomerToReactivate,
    isReactivateModalOpen,
    setIsReactivateModalOpen,
    reactivating,
    itemToDelete,
    setItemToDelete,
    handleCheckout,
    handleQuickRegisterSuccess,
    handleConfirmReactivate,
  } = useCartCheckout();

  return (
    <div className="bg-white dark:bg-zinc-900 border-l border-zinc-150 dark:border-zinc-800 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
          Carrinho de Vendas
        </h3>
        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30">
          {cart.length} itens
        </span>
      </div>

      {/* Cart Items List */}
      <CartItemList
        cart={cart}
        updateQuantity={updateQuantity}
        onConfirmDelete={(productId) => setItemToDelete(productId)}
      />

      {/* Checkout Section */}
      <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-4 shrink-0">
        {error && (
          <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-semibold border border-red-100 dark:border-red-900/20">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-450 p-3 rounded-xl text-sm font-semibold border border-emerald-100 dark:border-emerald-900/20">
            {success}
          </div>
        )}

        {/* Customer Selector */}
        <CartCustomerSelector
          cpf={cpf}
          setCpf={setCpf}
          disabled={cart.length === 0}
          onAddNewUser={(typedCpf) => {
            setIsQuickModalOpen(true);
          }}
        />

        {/* Payment and Totals Summary */}
        <CartPaymentSummary
          cartTotal={cartTotal}
          activeEvent={activeEvent}
          isPaid={isPaid}
          setIsPaid={setIsPaid}
          loading={loading}
          disabled={cart.length === 0 || !cpf || loading}
          onCheckout={() => handleCheckout()}
        />
      </div>

      {/* Quick User Registration Modal */}
      <QuickUserModal
        isOpen={isQuickModalOpen}
        onClose={() => setIsQuickModalOpen(false)}
        cpf={quickCpf || cpf}
        onSuccess={handleQuickRegisterSuccess}
      />

      {/* Reactivate Inactive User Modal */}
      {isReactivateModalOpen && inactiveCustomerToReactivate && (
        <Modal
          isOpen={isReactivateModalOpen}
          onClose={() => {
            setIsReactivateModalOpen(false);
          }}
          title="Participante Inativo"
        >
          <div className="space-y-6">
            <div className="bg-amber-50/10 dark:bg-amber-500/5 border border-amber-200/30 dark:border-amber-900/30 p-4 rounded-2xl flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                O cliente{" "}
                <span className="text-zinc-950 dark:text-white font-extrabold">
                  {inactiveCustomerToReactivate.firstName} {inactiveCustomerToReactivate.lastName}
                </span>{" "}
                está marcado como <span className="text-amber-600 font-black">INATIVO</span>.
              </div>
            </div>
            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
              Deseja reativar este participante para prosseguir com a venda?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setIsReactivateModalOpen(false)}
                disabled={reactivating}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReactivate}
                disabled={reactivating}
                className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer"
              >
                {reactivating ? "Reativando..." : "Reativar e Vender"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Remove Item Confirmation Modal */}
      {itemToDelete && (
        <Modal
          isOpen={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          title="Remover do Carrinho"
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Deseja realmente remover este item do carrinho?
            </p>
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (itemToDelete) removeFromCart(itemToDelete);
                  setItemToDelete(null);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer"
              >
                Remover Item
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
