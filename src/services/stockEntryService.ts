import { apiFetch } from "./apiClient";
import { StockEntry, CreateStockEntryPayload } from "@/types";

export const stockEntryService = {
  getStockEntries: async (productId?: string, eventId?: string): Promise<StockEntry[]> => {
    const params = new URLSearchParams();
    if (productId) params.append("productId", productId);
    if (eventId) params.append("eventId", eventId);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<StockEntry[]>(`/stock-entries${query}`);
  },

  getStockEntriesByProduct: async (productId: string): Promise<StockEntry[]> => {
    return apiFetch<StockEntry[]>(`/stock-entries/product/${productId}`);
  },

  createStockEntry: async (payload: CreateStockEntryPayload): Promise<StockEntry> => {
    return apiFetch<StockEntry>("/stock-entries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  deleteStockEntry: async (
    id: string,
    operatorName = "Admin"
  ): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>(
      `/stock-entries/${id}?operatorName=${encodeURIComponent(operatorName)}`,
      {
        method: "DELETE",
      }
    );
  },
};
