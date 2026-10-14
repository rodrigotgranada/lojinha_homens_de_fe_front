import { apiFetch } from "./apiClient";

export interface UserHistoryParticipation {
  id: string;
  eventId: string;
  eventName: string;
  eventStatus?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  type: "ACAMPANTE" | "TRABALHO";
  status: "CONFIRMADO" | "PENDENTE" | "CANCELADO";
  submittedAt?: string;
  confirmedAt?: string;
  confirmedBy?: string;
  healthRestrictions?: string;
  weight?: number;
  height?: number;
  preferredRoles?: string[];
  willGiveTestimony?: boolean;
  testimonyDetails?: string;
  availabilityDays?: string[];
  hasTent?: boolean;
  preCampAvailability?: boolean;
  pastRoles?: string;
  estimatedGuestsCount?: number;
}

export interface UserHistorySaleItem {
  productId?: any;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface UserHistoryEventSales {
  eventId: string;
  eventName: string;
  totalSpent: number;
  totalPending: number;
  salesCount: number;
  sales: any[];
}

export interface UserHistoryResponse {
  user: {
    id: string;
    _id?: string;
    cpf: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    city?: string;
    birthDate?: string;
    parish?: string;
    role?: string;
    active?: boolean;
    createdAt?: string;
  };
  participations: UserHistoryParticipation[];
  financialSummary: {
    totalSpent: number;
    totalPending: number;
    totalPurchases: number;
  };
  salesByEvent: UserHistoryEventSales[];
}

export const userService = {
  getUserHistory: async (userId: string): Promise<UserHistoryResponse> => {
    return apiFetch<UserHistoryResponse>(`/users/${userId}/history`);
  },
  getUsers: async (): Promise<any[]> => {
    return apiFetch<any[]>("/users");
  },
  getUserById: async (userId: string): Promise<any> => {
    return apiFetch<any>(`/users/${userId}`);
  },
};
