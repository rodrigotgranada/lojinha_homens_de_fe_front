"use client";

import React, { useState } from "react";
import { Product } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { ShoppingCart, Check, Image as ImageIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
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
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 h-full group ${
      compact ? "p-3 rounded-2xl gap-3 shadow-xs" : "p-4 rounded-3xl gap-4 shadow-sm"
    }`}>
      {/* Image */}
      <div className={`relative aspect-square w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center ${
        compact ? "rounded-xl" : "rounded-2xl"
      }`}>
        {product.imageUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <ImageIcon className={`text-zinc-300 dark:text-zinc-700 mb-1 ${compact ? "h-6 w-6" : "h-10 w-10 mb-2"}`} />
            <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {product.name.slice(0, 10)}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {isOutOfStock ? (
          <span className={`absolute top-2 left-2 bg-red-650 text-white font-black uppercase tracking-wider ${
            compact ? "text-[8px] px-2 py-0.5 rounded-md" : "text-[10px] px-2.5 py-0.5 rounded-full"
          }`}>
            Esgotado
          </span>
        ) : isLowStock ? (
          <span className={`absolute top-2 left-2 bg-red-100 dark:bg-red-955/70 text-red-600 dark:text-red-400 font-black uppercase tracking-wider border ${
            compact
              ? "text-[8px] px-1.5 py-0.5 rounded-md border-red-200 dark:border-red-900/40"
              : "text-[10px] px-2.5 py-0.5 rounded-full border-red-200 dark:border-red-900/50"
          }`}>
            Crítico ({product.stock})
          </span>
        ) : (
          <span className={`absolute top-2 left-2 bg-emerald-100 dark:bg-emerald-955/60 text-emerald-650 dark:text-emerald-400 font-black uppercase tracking-wider border ${
            compact
              ? "text-[8px] px-1.5 py-0.5 rounded-md border-emerald-200/50 dark:border-emerald-900/30"
              : "text-[10px] px-2.5 py-0.5 rounded-full border-emerald-200 dark:border-emerald-900/30"
          }`}>
            Estoque: {product.stock}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2.5 flex-1">
        {/* Category badge */}
        {!compact && product.category && (
          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/30 self-start">
            {product.category}
          </span>
        )}

        {/* Name */}
        <h4 className={`font-extrabold text-zinc-900 dark:text-white leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
          compact ? "text-xs" : "text-sm"
        }`}>
          {product.name}
        </h4>

        {/* Price + Stock row */}
        <div className={`flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850 ${
          compact ? "pt-1.5 mt-0" : "pt-2 mt-auto"
        }`}>
          <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500">
            Qtd: {product.stock}
          </span>
          <span className={`font-black text-emerald-600 dark:text-emerald-450 ${
            compact ? "text-xs font-black" : "text-sm"
          }`}>
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all cursor-pointer ${
            compact ? "py-2 text-xs" : "py-2.5 text-sm"
          } ${
            isOutOfStock
              ? "bg-zinc-100 dark:bg-zinc-850 text-zinc-450 cursor-not-allowed"
              : addedFeedback
              ? "bg-emerald-500 text-white scale-95"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md hover:shadow-indigo-500/20"
          }`}
        >
          {addedFeedback ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
};
