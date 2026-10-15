import { apiFetch } from "./apiClient";

export interface ActiveEventInfo {
  id: string;
  name: string;
  slug?: string;
  city?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  isActive: boolean;
}

export interface PublicInscriptionPayload {
  eventId?: string;
  eventSlug?: string;
  cpf: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city?: string;
  birthDate?: string;
  parish?: string;
  type: "ACAMPANTE" | "TRABALHO";
  // Acampante
  weight?: number;
  height?: number;
  referralSource?: string;
  healthRestrictions?: string;
  lgpdAuthorized?: boolean;
  // Trabalho
  preferredRoles?: string[];
  willGiveTestimony?: boolean;
  testimonyDetails?: string;
  testimonyReason?: string;
  previousHfEdition?: string;
  availabilityDays?: string[];
  hasTent?: boolean;
  preCampAvailability?: boolean;
  pastRoles?: string;
  estimatedGuestsCount?: number;
}

export interface InscriptionParticipant {
  id: string;
  _id: string;
  eventId: any;
  userId: any;
  type: "ACAMPANTE" | "TRABALHO";
  status: "CONFIRMADO" | "PENDENTE" | "CANCELADO";
  submittedAt?: string;
  weight?: number;
  height?: number;
  referralSource?: string;
  healthRestrictions?: string;
  lgpdAuthorized?: boolean;
  preferredRoles?: string[];
  willGiveTestimony?: boolean;
  testimonyDetails?: string;
  testimonyReason?: string;
  previousHfEdition?: string;
  availabilityDays?: string[];
  hasTent?: boolean;
  preCampAvailability?: boolean;
  pastRoles?: string;
  estimatedGuestsCount?: number;
  confirmedAt?: string;
  confirmedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const inscriptionService = {
  getActiveEvent: async (): Promise<ActiveEventInfo | null> => {
    return apiFetch<ActiveEventInfo | null>("/inscriptions/active-event");
  },

  getEventBySlug: async (slug: string): Promise<ActiveEventInfo | null> => {
    return apiFetch<ActiveEventInfo | null>(`/inscriptions/event-by-slug/${encodeURIComponent(slug)}`);
  },

  submitInscription: async (
    payload: PublicInscriptionPayload
  ): Promise<{
    success: boolean;
    message: string;
    participant: InscriptionParticipant;
    user: any;
    event: any;
  }> => {
    return apiFetch("/inscriptions/public", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getInscriptions: async (filters?: {
    eventId?: string;
    status?: string;
    type?: string;
    search?: string;
  }): Promise<InscriptionParticipant[]> => {
    const params = new URLSearchParams();
    if (filters?.eventId) params.append("eventId", filters.eventId);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.type) params.append("type", filters.type);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<InscriptionParticipant[]>(`/inscriptions${query}`);
  },

  confirmInscription: async (
    id: string,
    operator = "Admin"
  ): Promise<InscriptionParticipant> => {
    const query = operator ? `?operator=${encodeURIComponent(operator)}` : "";
    return apiFetch<InscriptionParticipant>(`/inscriptions/${id}/confirm${query}`, {
      method: "PATCH",
    });
  },

  cancelInscription: async (
    id: string,
    operator = "Admin"
  ): Promise<InscriptionParticipant> => {
    const query = operator ? `?operator=${encodeURIComponent(operator)}` : "";
    return apiFetch<InscriptionParticipant>(`/inscriptions/${id}/cancel${query}`, {
      method: "PATCH",
    });
  },

  updateParticipantType: async (
    id: string,
    type: "ACAMPANTE" | "TRABALHO"
  ): Promise<InscriptionParticipant> => {
    return apiFetch<InscriptionParticipant>(`/inscriptions/${id}/type`, {
      method: "PATCH",
      body: JSON.stringify({ type }),
    });
  },

  fastRegisterParticipant: async (
    eventId: string,
    userId: string,
    type: "ACAMPANTE" | "TRABALHO",
    operator = "PDV"
  ): Promise<any> => {
    return apiFetch(`/events/${eventId}/participants?operator=${encodeURIComponent(operator)}`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        type,
        status: "CONFIRMADO",
        notes: "Cadastro Rápido de Última Hora (PDV)",
      }),
    });
  },
};
