"use client";

import React from "react";
import { Button } from "../ui/Button";
import { CreditCard } from "lucide-react";
import { Event } from "@/types";

interface CartPaymentSummaryProps {
  cartTotal: number;
  activeEvent: Event | null;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  loading: boolean;
  disabled: boolean;
  onCheckout: () => void;
}

export const CartPaymentSummary: React.FC<CartPaymentSummaryProps> = ({
  cartTotal,
  activeEvent,
  isPaid,
  setIsPaid,
  loading,
  disabled,
  onCheckout,
}) => {
  return (
    <div className="space-y-4">
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
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Pago na hora?
          </span>
          <span className="text-xs text-zinc-400 font-semibold">
            Marque se o pagamento já foi recebido
          </span>
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

      <Button
        onClick={onCheckout}
        loading={loading}
        disabled={disabled}
        className="w-full py-4 text-base font-bold shadow-lg shadow-indigo-600/10 cursor-pointer flex gap-2"
      >
        <CreditCard className="h-5 w-5" />
        Concluir Venda
      </Button>
    </div>
  );
};
