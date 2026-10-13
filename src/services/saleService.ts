import { apiFetch } from "./apiClient";
import { Sale, AnalyticsData } from "@/types";

export const saleService = {
  getSales: async (eventId?: string): Promise<Sale[]> => {
    const query = eventId && eventId !== "all" ? `?eventId=${eventId}` : "";
    return apiFetch<Sale[]>(`/sales${query}`);
  },

  createSale: async (sale: Omit<Sale, "id" | "createdAt"> & { operatorId?: string }): Promise<Sale> => {
    return apiFetch<Sale>("/sales", {
      method: "POST",
      body: JSON.stringify(sale),
    });
  },

  updateSaleStatus: async (saleId: string, status: "PAGO" | "PENDENTE" | "CANCELADO"): Promise<Sale> => {
    return apiFetch<Sale>(`/sales/${saleId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  payAllCustomerSales: async (customerId: string): Promise<{ updatedCount: number; totalPaid: number }> => {
    return apiFetch<{ updatedCount: number; totalPaid: number }>(`/sales/customer/${customerId}/pay-all`, {
      method: "PATCH",
    });
  },

  getSalesByCustomer: async (customerId: string): Promise<Sale[]> => {
    return apiFetch<Sale[]>(`/sales?customerId=${customerId}`);
  },

  cancelSale: async (saleId: string, operatorId: string): Promise<Sale> => {
    return apiFetch<Sale>(`/sales/${saleId}/cancel`, {
      method: "POST",
      body: JSON.stringify({ operatorId }),
    });
  },

  getEventAnalytics: async (eventId: string): Promise<AnalyticsData> => {
    return apiFetch<AnalyticsData>(`/sales/analytics/event/${eventId}`);
  },
};
