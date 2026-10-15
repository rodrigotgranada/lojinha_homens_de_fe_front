import { apiFetch } from "./apiClient";
import { Event, User, Category } from "@/types";

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    return apiFetch<Event[]>("/events");
  },

  getActiveEvent: async (): Promise<Event | null> => {
    const events = await apiFetch<Event[]>("/events?isActive=true");
    return events.length > 0 ? events[0] : null;
  },

  getActiveEvents: async (): Promise<Event[]> => {
    return apiFetch<Event[]>("/events?isActive=true");
  },

  getEventBySlug: async (slug: string): Promise<Event> => {
    return apiFetch<Event>(`/events/by-slug/${encodeURIComponent(slug)}`);
  },

  setActiveEvent: async (eventId: string, active = true): Promise<Event> => {
    return apiFetch<Event>(`/events/${eventId}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: active, status: active ? "ATIVO" : "PROGRAMADO" }),
    });
  },

  createEvent: async (event: Omit<Event, "id" | "createdAt">): Promise<Event> => {
    return apiFetch<Event>("/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  },

  updateEvent: async (eventId: string, data: Partial<Event>): Promise<Event> => {
    return apiFetch<Event>(`/events/${eventId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

export const userService = {
  getUsers: async (eventId?: string): Promise<User[]> => {
    const query = eventId ? `?eventId=${eventId}` : "";
    return apiFetch<User[]>(`/users${query}`);
  },

  searchUsers: async (queryText: string, eventId?: string): Promise<User[]> => {
    const params = new URLSearchParams({ q: queryText });
    if (eventId) params.append("eventId", eventId);
    return apiFetch<User[]>(`/users/search?${params.toString()}`);
  },

  linkUserToEvent: async (
    userId: string,
    eventId: string,
    type: "ACAMPANTE" | "TRABALHO" = "ACAMPANTE"
  ): Promise<User> => {
    return apiFetch<User>(`/users/${userId}/link-event`, {
      method: "POST",
      body: JSON.stringify({ eventId, type }),
    });
  },

  getUserByCpf: async (cpf: string): Promise<User | null> => {
    const users = await apiFetch<User[]>(`/users?cpf=${cpf}`);
    return users.length > 0 ? users[0] : null;
  },

  createUser: async (user: Omit<User, "id">): Promise<User> => {
    return apiFetch<User>("/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
  },

  updateUser: async (userId: string, user: Partial<User>): Promise<User> => {
    return apiFetch<User>(`/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(user),
    });
  },

  markUserCharged: async (userId: string): Promise<User> => {
    return apiFetch<User>(`/users/${userId}/charged`, {
      method: "PATCH",
    });
  },
};

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    return apiFetch<Category[]>("/categories");
  },

  createCategory: async (name: string): Promise<Category> => {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },

  updateCategory: async (id: string, name: string): Promise<Category> => {
    return apiFetch<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    });
  },

  deleteCategory: async (id: string): Promise<Category> => {
    return apiFetch<Category>(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};
