import { apiFetch } from "./apiClient";
import { PaymentConfig, CreatePaymentConfigPayload } from "@/types";

export const paymentConfigService = {
  async getActive(): Promise<PaymentConfig> {
    try {
      return await apiFetch<PaymentConfig>("/payment-configs/active");
    } catch (err) {
      // Fallback padrão se offline ou erro
      return {
        id: "default",
        pixKey: "homensdefe.pel@gmail.com",
        keyType: "EMAIL",
        merchantName: "Alcides",
        bankName: "Nubank",
        city: "Pelotas",
        description: "Chave Oficial do Retiro",
        isDefault: true,
        active: true,
      };
    }
  },

  async getAll(): Promise<PaymentConfig[]> {
    try {
      return await apiFetch<PaymentConfig[]>("/payment-configs");
    } catch (err) {
      console.warn("Erro ao buscar configurações de pagamento:", err);
      return [];
    }
  },

  async create(payload: CreatePaymentConfigPayload): Promise<PaymentConfig> {
    return await apiFetch<PaymentConfig>("/payment-configs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async update(
    id: string,
    payload: Partial<CreatePaymentConfigPayload>
  ): Promise<PaymentConfig> {
    return await apiFetch<PaymentConfig>(`/payment-configs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  async setDefault(id: string): Promise<PaymentConfig> {
    return await apiFetch<PaymentConfig>(`/payment-configs/${id}/default`, {
      method: "PATCH",
    });
  },

  async delete(id: string): Promise<PaymentConfig> {
    return await apiFetch<PaymentConfig>(`/payment-configs/${id}`, {
      method: "DELETE",
    });
  },
};
