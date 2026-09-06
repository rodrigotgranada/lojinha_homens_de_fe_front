"use client";

import React from "react";
import { CartItem } from "@/context/AppContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

interface CartItemListProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  onConfirmDelete: (productId: string) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({
  cart,
  updateQuantity,
  onConfirmDelete,
}) => {
  const handleDecrement = (productId: string, currentQty: number) => {
    if (currentQty === 1) {
      onConfirmDelete(productId);
    } else {
      updateQuantity(productId, currentQty - 1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 py-10">
        <ShoppingBag className="h-12 w-12 stroke-1 mb-2 opacity-50" />
        <p className="text-sm font-medium">O carrinho está vazio</p>
        <p className="text-xs">Selecione produtos no catálogo</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[30vh] md:max-h-none md:min-h-0 py-1">
      {cart.map((item) => (
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
            onClick={() => onConfirmDelete(item.product.id)}
            className="text-zinc-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
