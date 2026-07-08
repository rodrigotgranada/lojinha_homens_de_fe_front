"use client";

import React, { useState } from "react";
import { Product } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { ShoppingCart, Check, Image as ImageIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();
  const [imageError, setImageError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  const isLowStock = product.stock <= (product.minStock ?? 5);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 h-full group">
      {/* Image */}
      <div className="relative aspect-square w-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
        {product.imageUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <ImageIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-2" />
            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {product.name.slice(0, 12)}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {isOutOfStock ? (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Esgotado
          </span>
        ) : isLowStock ? (
          <span className="absolute top-2.5 left-2.5 bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-900/50">
            Crítico ({product.stock})
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30">
            Estoque: {product.stock}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Category badge */}
        {product.category && (
          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/30 self-start">
            {product.category}
          </span>
        )}

        {/* Name */}
        <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h4>

        {/* Price + Stock row */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-850 mt-auto">
          <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500">
            Qtd: {product.stock}
          </span>
          <span className="font-black text-emerald-600 dark:text-emerald-450 text-sm">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            isOutOfStock
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              : addedFeedback
              ? "bg-emerald-500 text-white scale-95"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md hover:shadow-indigo-500/20"
          }`}
        >
          {addedFeedback ? (
            <>
              <Check className="h-4 w-4" />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
};
