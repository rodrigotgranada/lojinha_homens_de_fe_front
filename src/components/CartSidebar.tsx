"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, User, SaleItem } from "@/hooks/useApi";
import { QuickUserModal } from "./QuickUserModal";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Trash2, Plus, Minus, CreditCard, UserCheck, ShoppingBag, AlertTriangle } from "lucide-react";
import { logService } from "@/services/logService";

export const CartSidebar: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
    activeEvent,
    currentUser,
  } = useApp();

  const api = useApi();

  const [cpf, setCpf] = useState("");
  const [isPaid, setIsPaid] = useState(true); // Toggle: true = PAGO, false = PENDENTE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Quick Register Modal States
  const [quickCpf, setQuickCpf] = useState("");
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);

  // Inactive Customer Warning / Reactivation Modal States
  const [inactiveCustomerToReactivate, setInactiveCustomerToReactivate] = useState<User | null>(null);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [reactivating, setReactivating] = useState(false);

  // Cart Item Removal confirmation state
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Format CPF as 999.999.999-99
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    let formatted = rawVal;
    if (rawVal.length > 3) {
      formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3)}`;
    }
    if (rawVal.length > 6) {
      formatted = `${formatted.slice(0, 7)}.${rawVal.slice(6)}`;
    }
    if (rawVal.length > 9) {
      formatted = `${formatted.slice(0, 11)}-${rawVal.slice(9, 11)}`;
    }
    setCpf(formatted.slice(0, 14));
  };

  const handleCheckout = async (customerUser?: User) => {
    setError("");
    setSuccess("");

    if (cart.length === 0) {
      setError("O carrinho está vazio.");
      return;
    }

    if (!activeEvent) {
      setError("Não há nenhum evento ativo selecionado no momento.");
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    if (!customerUser && cleanCpf.length !== 11) {
      setError("Por favor, digite um CPF válido (11 dígitos).");
      return;
    }

    setLoading(true);

    try {
      let finalCustomer: User | null = customerUser || null;

      if (!finalCustomer) {
        // Look up customer by CPF
        finalCustomer = await api.getUserByCpf(cleanCpf);

        if (!finalCustomer) {
          // Customer not found, trigger Quick Register Modal
          setQuickCpf(cpf);
          setIsQuickModalOpen(true);
          setLoading(false);
          return;
        }
      }

      // Check if the customer user is inactive
      if (finalCustomer && finalCustomer.active === false) {
        setInactiveCustomerToReactivate(finalCustomer);
        setIsReactivateModalOpen(true);
        setLoading(false);
        return;
      }

      // Customer found/created and is active, proceed to place order
      // 1. Prepare items
      const saleItems: SaleItem[] = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      }));

      // 2. Decrement stock for each product in DB and log stock change
      const operatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Operador";
      const operatorId = currentUser ? currentUser.id : "system";

      for (const item of cart) {
        const newStock = Math.max(0, item.product.stock - item.quantity);
        await api.updateProductStock(item.product.id, newStock);

        await logService.createLog({
          userId: operatorId,
          userName: operatorName,
          action: "stock_update",
          description: `${operatorName} vendeu item e atualizou o estoque de "${item.product.name}" para ${newStock}`,
          metadata: { productId: item.product.id, oldStock: item.product.stock, newStock }
        });
      }

      // 3. Create sale
      await api.createSale({
        customerId: finalCustomer.id,
        eventId: activeEvent.id,
        items: saleItems,
        totalPrice: cartTotal,
        status: isPaid ? "PAGO" : "PENDENTE",
        createdAt: new Date().toISOString(),
      });

      // 4. Create Sale Log
      const itemsDescription = cart.map(i => `${i.quantity}x ${i.product.name}`).join(", ");
      await logService.createLog({
        userId: operatorId,
        userName: operatorName,
        action: "sale_create",
        description: `${operatorName} vendeu os itens [ ${itemsDescription} ] no valor total de R$ ${cartTotal.toFixed(2)} para o cliente ${finalCustomer.firstName} (CPF: ${finalCustomer.cpf})`,
        metadata: {
          customerId: finalCustomer.id,
          customerName: `${finalCustomer.firstName} ${finalCustomer.lastName}`,
          totalPrice: cartTotal,
          items: saleItems,
          eventId: activeEvent.id
        }
      });

      setSuccess(`Venda concluída com sucesso para ${finalCustomer.firstName}!`);
      clearCart();
      setCpf("");
      setIsPaid(true);
    } catch (err) {
      console.error("Error checking out", err);
      setError("Ocorreu um erro ao processar a venda. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRegisterSuccess = (newUser: User) => {
    handleCheckout(newUser);
  };

  const handleConfirmReactivate = async () => {
    if (!inactiveCustomerToReactivate) return;
    try {
      setReactivating(true);
      setError("");
      
      // 1. Reactivate customer
      const updatedUser = await api.updateUser(inactiveCustomerToReactivate.id, { active: true });
      
      // Close modal
      setIsReactivateModalOpen(false);
      setInactiveCustomerToReactivate(null);
      
      // 2. Complete checkout with reactivated customer
      await handleCheckout(updatedUser);
    } catch (err) {
      console.error("Failed to reactivate customer during checkout", err);
      setError("Erro ao reativar cliente. Tente novamente.");
    } finally {
      setReactivating(false);
    }
  };

  const handleDecrement = (productId: string, currentQty: number) => {
    if (currentQty === 1) {
      setItemToDelete(productId);
    } else {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const formatCpf = (c: string) => {
    const clean = c.replace(/\D/g, "");
    if (clean.length !== 11) return c;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
  };

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
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[30vh] md:max-h-none md:min-h-0 py-1">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 py-10">
            <ShoppingBag className="h-12 w-12 stroke-1 mb-2 opacity-50" />
            <p className="text-sm font-medium">O carrinho está vazio</p>
            <p className="text-xs">Selecione produtos no catálogo</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                  {item.product.name}
                </h5>
                <span className="text-xs text-indigo-650 dark:text-indigo-400 font-bold">
                  R$ {item.product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => handleDecrement(item.product.id, item.quantity)}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-md text-zinc-550 cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-md text-zinc-550 disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => setItemToDelete(item.product.id)}
                className="text-zinc-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

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

        <div className="flex justify-between items-baseline">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Total:</span>
          <span className="text-2xl font-black text-zinc-900 dark:text-white">
            R$ {cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Active Event Indicator */}
        <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-xs font-semibold">
          <span className="text-zinc-500 dark:text-zinc-400">Evento Ativo:</span>
          <span className="font-bold text-indigo-650 dark:text-indigo-400 truncate max-w-[180px]">
            {activeEvent ? activeEvent.name : "Nenhum Ativo"}
          </span>
        </div>

        {/* Toggle Pago/Pendente */}
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Pago na hora?</span>
            <span className="text-xs text-zinc-400 font-semibold">Marque se o pagamento já foi recebido</span>
          </div>
          <button
            type="button"
            onClick={() => setIsPaid(!isPaid)}
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
              isPaid ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                isPaid ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* Client CPF Lookup */}
        <Input
          label="CPF do Cliente"
          id="cart-client-cpf"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={handleCpfChange}
          icon={<UserCheck className="h-5 w-5" />}
          disabled={cart.length === 0}
        />

        <Button
          onClick={() => handleCheckout()}
          loading={loading}
          disabled={cart.length === 0 || !cpf || loading}
          className="w-full py-4 text-base font-bold shadow-lg shadow-indigo-600/10 cursor-pointer flex gap-2"
        >
          <CreditCard className="h-5 w-5" />
          Concluir Venda
        </Button>
      </div>

      {/* Quick User Registration Modal */}
      <QuickUserModal
        isOpen={isQuickModalOpen}
        onClose={() => setIsQuickModalOpen(false)}
        cpf={quickCpf}
        onSuccess={handleQuickRegisterSuccess}
      />

      {/* Reactivate Inactive User Modal */}
      {isReactivateModalOpen && inactiveCustomerToReactivate && (
        <Modal
          isOpen={isReactivateModalOpen}
          onClose={() => {
            setIsReactivateModalOpen(false);
            setInactiveCustomerToReactivate(null);
          }}
          title="Participante Inativo"
        >
          <div className="space-y-6">
            <div className="bg-amber-50/10 dark:bg-amber-500/5 border border-amber-200/30 dark:border-amber-900/30 p-4 rounded-2xl flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                O cliente <span className="text-zinc-950 dark:text-white font-extrabold">{inactiveCustomerToReactivate.firstName} {inactiveCustomerToReactivate.lastName}</span> (CPF: {formatCpf(inactiveCustomerToReactivate.cpf)}) está marcado como <span className="text-amber-600 dark:text-amber-500 font-black">INATIVO</span>.
              </div>
            </div>
            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
              Deseja reativar este participante para prosseguir e registrar a venda?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsReactivateModalOpen(false);
                  setInactiveCustomerToReactivate(null);
                }}
                disabled={reactivating}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReactivate}
                disabled={reactivating}
                className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                {reactivating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Reativando...</span>
                  </>
                ) : (
                  <span>Reativar e Vender</span>
                )}
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
              Deseja realmente remover o item <span className="text-zinc-900 dark:text-white font-extrabold">"{cart.find((it) => it.product.id === itemToDelete)?.product.name}"</span> do carrinho?
            </p>
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
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
