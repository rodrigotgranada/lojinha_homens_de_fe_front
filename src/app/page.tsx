"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Product, Sale } from "@/hooks/useApi";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { LogIn, UserPlus, FileText, ShoppingCart, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function HomePage() {
  const { currentUser, activeEvent, isLoading } = useApp();
  const api = useApi();

  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);

  const fetchHomeData = useCallback(async () => {
    setLoadingContent(true);
    try {
      // Fetch catalog
      const prodList = await api.getProducts();
      setProducts(prodList);

      // Fetch user purchases if logged in
      if (currentUser) {
        // If admin, fetch all sales, if customer, fetch customer sales
        const salesList = currentUser.role === "ADMIN" 
          ? await api.getSales() 
          : await api.getSalesByCustomer(currentUser.id);
        
        // Sort sales descending by date
        salesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSales(salesList);
      }
    } catch (err) {
      console.warn("Could not load API data for home. Running fallbacks.", err);
      // Fallback data
      setProducts([
        { id: "prod-1", name: "Camiseta Oficial Retiro", price: 60.0, stock: 50, imageUrl: "" },
        { id: "prod-2", name: "Bíblia de Estudos Nova", price: 120.0, stock: 15, imageUrl: "" },
        { id: "prod-3", name: "Garrafa Térmica Homens de Fé", price: 45.0, stock: 4, imageUrl: "" },
        { id: "prod-4", name: "Boné Bordado", price: 35.0, stock: 25, imageUrl: "" }
      ]);
      if (currentUser && currentUser.id === "usr-1") {
        setSales([
          {
            id: "sale-1",
            customerId: "usr-1",
            eventId: "evt-1",
            items: [{ productId: "prod-1", quantity: 1, priceAtPurchase: 60.0 }],
            totalPrice: 60.0,
            status: "PENDENTE",
            createdAt: new Date().toISOString()
          }
        ]);
      }
    } finally {
      setLoadingContent(false);
    }
  }, [api, currentUser]);

  useEffect(() => {
    if (!isLoading) {
      fetchHomeData();
    }
  }, [isLoading, currentUser, fetchHomeData]);

  // Real-time stock sync via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStockUpdate = (e: Event) => {
      const { productId, newStock } = (e as CustomEvent).detail;
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
      );
    };

    window.addEventListener("product_stock_updated", handleStockUpdate);
    return () => {
      window.removeEventListener("product_stock_updated", handleStockUpdate);
    };
  }, []);

  // Real-time status sync via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStatusUpdate = (e: Event) => {
      const { productId, active } = (e as CustomEvent).detail;
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, active } : p))
      );
    };

    window.addEventListener("product_status_updated", handleStatusUpdate);
    return () => {
      window.removeEventListener("product_status_updated", handleStatusUpdate);
    };
  }, []);

  // Real-time general product updates via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleProductUpdate = (e: Event) => {
      const updatedProduct = (e as CustomEvent).detail as Product;
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    };

    window.addEventListener("product_updated", handleProductUpdate);
    return () => {
      window.removeEventListener("product_updated", handleProductUpdate);
    };
  }, []);

  // Helper to find product name
  const getProductName = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    return prod ? prod.name : `Produto #${productId}`;
  };

  if (isLoading || loadingContent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-500 font-semibold text-sm">Carregando painel...</span>
      </div>
    );
  }

  // Not Logged In View
  if (!currentUser) {
    return (
      <div className="flex-1 flex flex-col gap-12 py-6">
        {/* Banner Hero */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col items-start gap-6">
          <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center justify-center pr-10 pointer-events-none">
            <span className="text-[200px] leading-none">⛪</span>
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {activeEvent ? activeEvent.name : "Edição Atual"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Lojinha Virtual para Retiros e Encontros
            </h1>
            <p className="text-lg text-indigo-100 font-medium">
              Adquira lembranças, camisetas, livros e acessórios oficiais do retiro de forma simples e rápida.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 relative z-10">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-indigo-700 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <LogIn className="h-5 w-5" />
              Acessar Painel Admin
            </Link>
          </div>
        </div>

        {/* Catalog Preview */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Nossos Produtos
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Faça login no painel para realizar vendas, gerenciar estoque ou auditar transações.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="opacity-85 pointer-events-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Logged In View
  return (
    <div className="flex-1 flex flex-col gap-10 py-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Portal do {currentUser.role === "ADMIN" ? "Administrador" : "Retirante"}
          </span>
          <h1 className="text-3xl font-black text-zinc-950 dark:text-white mt-1">
            Olá, {currentUser.firstName}!
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Acompanhe o histórico de suas compras abaixo e confira o catálogo oficial.
          </p>
        </div>

        {currentUser.role === "ADMIN" && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all"
          >
            Acessar Painel Admin
          </Link>
        )}
      </div>

      {/* Grid: Purchase History (full width or sidebar depending on content) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Purchase History */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-3">
            <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Minhas Compras
          </h2>

          {sales.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 text-center text-zinc-400 dark:text-zinc-500">
              <Clock className="h-12 w-12 stroke-1 mb-2 mx-auto opacity-50" />
              <p className="text-sm font-semibold">Nenhuma compra encontrada</p>
              <p className="text-xs">Quando você realizar uma compra no PDV, ela aparecerá aqui.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sales.map((sale) => {
                const dateStr = new Date(sale.createdAt).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short"
                });
                const isPaid = sale.status === "PAGO";

                return (
                  <div
                    key={sale.id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                          #{sale.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {dateStr}
                        </div>
                      </div>

                      {/* Items */}
                      <ul className="space-y-1">
                        {sale.items.map((item, idx) => (
                          <li key={idx} className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            {item.quantity}x {getProductName(item.productId)}
                            <span className="text-xs font-normal text-zinc-400 ml-1.5">
                              (R$ {item.priceAtPurchase.toFixed(2)} cada)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                      <span className="text-xl font-black text-zinc-900 dark:text-white">
                        R$ {sale.totalPrice.toFixed(2)}
                      </span>

                      {/* Status Badge */}
                      {isPaid ? (
                        <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-900/50">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Pago
                        </span>
                      ) : (
                        <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200 dark:border-amber-900/50">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Pendente
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Info/Events */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-3">
            🎯 Evento Ativo
          </h2>

          <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-lg space-y-4">
            <span className="bg-indigo-700/60 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Edição Oficial Ativa
            </span>
            {activeEvent ? (
              <>
                <h3 className="text-2xl font-black tracking-tight">{activeEvent.name}</h3>
                <p className="text-xs text-indigo-200">
                  Cadastrado em {new Date(activeEvent.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold">Nenhum evento ativo selecionado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
