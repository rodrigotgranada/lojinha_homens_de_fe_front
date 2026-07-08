"use client";

import React, { useEffect } from "react";
import { usePdvState } from "./hooks/usePdvState";
import { PdvProvider } from "./context/PdvContext";
import { PdvHeader } from "./components/PdvHeader";
import { PdvCatalog } from "./components/PdvCatalog";
import { CartSidebar } from "@/components/CartSidebar";
import { ShieldAlert, ShoppingCart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PdvPage() {
  const pdvState = usePdvState();
  const {
    currentUser,
    cartCount,
    isLoading,
    activeTab,
    setActiveTab
  } = pdvState;

  // Custom Full Screen Layout for PDV: Hide footer & negate padding top/bottom
  useEffect(() => {
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    
    if (footer) footer.style.display = "none";
    if (main) {
      main.style.paddingTop = "0px";
      main.style.paddingBottom = "0px";
      main.style.height = "calc(100vh - 64px)";
      main.style.maxHeight = "calc(100vh - 64px)";
    }
    
    return () => {
      if (footer) footer.style.display = "";
      if (main) {
        main.style.paddingTop = "";
        main.style.paddingBottom = "";
        main.style.height = "";
        main.style.maxHeight = "";
      }
    };
  }, []);

  // Security Check: Loading
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="text-zinc-555 font-semibold">Carregando Ponto de Venda...</span>
      </div>
    );
  }

  // Security Check: Authorization
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-955 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Esta área é reservada para voluntários e administradores do PDV.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PdvProvider value={pdvState}>
      <div className="flex-1 flex flex-col gap-6 py-4 h-full min-h-0">
        {/* PDV Header */}
        <PdvHeader />

        {/* Tabs for mobile devices */}
        <div className="flex md:hidden border-b border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 rounded-xl shadow-xs">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              activeTab === "catalog"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-zinc-550 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Catálogo
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold relative transition-all cursor-pointer ${
              activeTab === "cart"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-zinc-550 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Carrinho
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-6 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Left Side: Catalog Search & Grid */}
          <div
            className={`${
              activeTab === "catalog" ? "flex" : "hidden"
            } md:flex md:col-span-2 flex-col gap-5 h-full min-h-0`}
          >
            <PdvCatalog />
          </div>

          {/* Right Side: Cart Sidebar */}
          <div
            className={`${
              activeTab === "cart" ? "block" : "hidden"
            } md:block md:col-span-1 h-full min-h-0`}
          >
            <CartSidebar />
          </div>
        </div>
      </div>
    </PdvProvider>
  );
}
