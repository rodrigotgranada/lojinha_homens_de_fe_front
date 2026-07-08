import { Product } from "@/hooks/useApi";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const API_BASE = USE_MOCK
  ? (process.env.NEXT_PUBLIC_MOCK_URL || "http://localhost:5006")
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`ProductService error: ${res.statusText}`);
  }
  return await res.json();
}

export const productService = {
  /**
   * Retrieves all products from the mock database.
   */
  getProducts: async (all = false): Promise<Product[]> => {
    const endpoint = all ? "/products?all=true" : "/products";
    return fetchJson<Product[]>(endpoint);
  },

  /**
   * Creates a new product.
   */
  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    return fetchJson<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  /**
   * Updates an existing product.
   */
  updateProduct: async (productId: string, product: Partial<Product>): Promise<Product> => {
    return fetchJson<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  },

  /**
   * Deletes a product.
   */
  deleteProduct: async (productId: string): Promise<void> => {
    return fetchJson<void>(`/products/${productId}`, {
      method: "DELETE",
    });
  },

  /**
   * Increments or decrements a product's stock levels.
   */
  updateStock: async (productId: string, newStock: number): Promise<Product> => {
    return fetchJson<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    });
  }
};
