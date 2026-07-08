import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Product } from "@/hooks/useApi";

export const usePdvState = () => {
  const { currentUser, cartCount, isLoading } = useApp();
  const api = useApi();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loadingContent, setLoadingContent] = useState(true);
  
  // Mobile active tab: "catalog" | "cart"
  const [activeTab, setActiveTab] = useState<"catalog" | "cart">("catalog");

  const fetchPdvProducts = useCallback(async () => {
    setLoadingContent(true);
    try {
      const prodList = await api.getProducts();
      setProducts(prodList);
    } catch (err) {
      console.warn("Could not fetch products for PDV. Fallback.", err);
      setProducts([
        { id: "prod-1", name: "Camiseta Oficial Retiro", price: 60.0, stock: 50, imageUrl: "" },
        { id: "prod-2", name: "Bíblia de Estudos Nova", price: 120.0, stock: 15, imageUrl: "" },
        { id: "prod-3", name: "Garrafa Térmica Homens de Fé", price: 45.0, stock: 4, imageUrl: "" },
        { id: "prod-4", name: "Boné Bordado", price: 35.0, stock: 25, imageUrl: "" }
      ]);
    } finally {
      setLoadingContent(false);
    }
  }, [api]);

  useEffect(() => {
    if (!isLoading && currentUser?.role === "ADMIN") {
      fetchPdvProducts();
    }
  }, [isLoading, currentUser, fetchPdvProducts]);

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

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" ||
      p.category === selectedCategory;
    return matchesSearch && matchesCategory && p.active !== false;
  });

  return {
    products,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    loadingContent,
    activeTab,
    setActiveTab,
    filteredProducts,
    currentUser,
    cartCount,
    isLoading
  };
};
