import { apiFetch } from "./apiClient";
import { Product, ImportPreviousStockPayload } from "@/types";

export const productService = {
  getProducts: async (eventId?: string): Promise<Product[]> => {
    const query = eventId ? `?eventId=${eventId}` : "";
    const list = await apiFetch<Product[]>(`/products${query}`);
    return list.filter((p) => p.active !== false);
  },

  getAllProducts: async (eventId?: string): Promise<Product[]> => {
    const query = eventId ? `?all=true&eventId=${eventId}` : "?all=true";
    return apiFetch<Product[]>(`/products${query}`);
  },

  getRemainingStockFromEvent: async (eventId: string): Promise<Product[]> => {
    return apiFetch<Product[]>(`/products/remaining-stock/${eventId}`);
  },

  importStockReconciliation: async (payload: ImportPreviousStockPayload): Promise<{
    importedCount: number;
    writtenOffCount: number;
    createdProducts: Product[];
  }> => {
    return apiFetch("/products/import-stock-reconciliation", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateProductStock: async (productId: string, newStock: number): Promise<Product> => {
    return apiFetch<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    });
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    return apiFetch<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  updateProduct: async (productId: string, product: Partial<Product>): Promise<Product> => {
    return apiFetch<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  },

  deleteProduct: async (productId: string): Promise<void> => {
    return apiFetch<void>(`/products/${productId}`, {
      method: "DELETE",
    });
  },
};
