"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, User, SaleItem } from "@/hooks/useApi";
import { logService } from "@/services/logService";

export const useCartCheckout = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    activeEvent,
    currentUser,
  } = useApp();

  const api = useApi();

  const [cpf, setCpf] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [quickCpf, setQuickCpf] = useState("");
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);

  const [inactiveCustomerToReactivate, setInactiveCustomerToReactivate] = useState<User | null>(null);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [reactivating, setReactivating] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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
        finalCustomer = await api.getUserByCpf(cleanCpf);

        if (!finalCustomer) {
          setQuickCpf(cpf);
          setIsQuickModalOpen(true);
          setLoading(false);
          return;
        }
      }

      if (finalCustomer && finalCustomer.active === false) {
        setInactiveCustomerToReactivate(finalCustomer);
        setIsReactivateModalOpen(true);
        setLoading(false);
        return;
      }

      const saleItems: SaleItem[] = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      }));

      const operatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Operador";
      const operatorId = currentUser ? currentUser.id : "system";

      // 1. Criar a venda no backend (que já atualiza atomicamente o estoque via $inc)
      await api.createSale({
        customerId: finalCustomer.id,
        eventId: activeEvent.id,
        items: saleItems,
        totalPrice: cartTotal,
        status: isPaid ? "PAGO" : "PENDENTE",
        operatorId,
      });

      // 2. Registrar Log da Venda
      const itemsDescription = cart.map((i) => `${i.quantity}x ${i.product.name}`).join(", ");
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
          eventId: activeEvent.id,
        },
      });

      setSuccess(`Venda concluída com sucesso para ${finalCustomer.firstName}!`);
      clearCart();
      setCpf("");
      setIsPaid(true);
    } catch (err: any) {
      console.error("Error checking out", err);
      setError(err.message || "Ocorreu um erro ao processar a venda. Tente novamente.");
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
      const updatedUser = await api.updateUser(inactiveCustomerToReactivate.id, { active: true });
      setIsReactivateModalOpen(false);
      setInactiveCustomerToReactivate(null);
      await handleCheckout(updatedUser);
    } catch (err) {
      console.error("Failed to reactivate customer", err);
      setError("Erro ao reativar cliente. Tente novamente.");
    } finally {
      setReactivating(false);
    }
  };

  return {
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
  };
};
