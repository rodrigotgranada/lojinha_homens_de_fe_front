import { useMemo } from "react";

export interface Event {
  id: string;
  name: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: "PROGRAMADO" | "ATIVO" | "ENCERRADO" | "CANCELADO";
  createdAt: string;
}

export interface User {
  id: string;
  cpf: string;
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "USER" | "ADMIN";
  createdBy?: string;
  active?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  active?: boolean;
  category?: "Vestuário" | "Alimentação" | "Livros" | "Acessórios" | "Outros";
  minStock?: number;
  createdBy?: string;
  updatedBy?: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Sale {
  id: string;
  customerId: string;
  eventId: string;
  items: SaleItem[];
  totalPrice: number;
  status: "PAGO" | "PENDENTE" | "CANCELADO";
  createdAt: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  pendingRevenue: number;
  totalSalesCount: number;
  pagoCount: number;
  pendenteCount: number;
  ticketMedio: number;
}

export interface ProductStat {
  name: string;
  quantity: number;
  revenue: number;
  category: string;
}

export interface BuyerStat {
  name: string;
  totalSpent: number;
  cpf: string;
  purchasesCount: number;
}

export interface SalesTimelinePoint {
  time: string;
  amount: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  topSellingProducts: ProductStat[];
  topBuyers: BuyerStat[];
  salesTimeline: SalesTimelinePoint[];
}

export interface LogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  metadata?: any;
  createdAt: string;
}

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const API_BASE = USE_MOCK
  ? (process.env.NEXT_PUBLIC_MOCK_URL || "http://localhost:5006")
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");

// Helper for making API calls with fallback check
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch from real mock server at ${url}. Make sure you ran 'npm run mock'.`, err);
    throw err;
  }
}

export const useApi = () => {
  const getProducts = async (): Promise<Product[]> => {
    const list = await apiFetch<Product[]>("/products");
    return list.filter((p) => p.active !== false);
  };

  const updateProductStock = async (productId: string, newStock: number): Promise<Product> => {
    return apiFetch<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    });
  };

  const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    return apiFetch<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  };

  const updateProduct = async (productId: string, product: Partial<Product>): Promise<Product> => {
    return apiFetch<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    return apiFetch<void>(`/products/${productId}`, {
      method: "DELETE",
    });
  };

  const getUsers = async (): Promise<User[]> => {
    return apiFetch<User[]>("/users");
  };

  const getUserByCpf = async (cpf: string): Promise<User | null> => {
    const users = await apiFetch<User[]>(`/users?cpf=${cpf}`);
    return users.length > 0 ? users[0] : null;
  };

  const createUser = async (user: Omit<User, "id">): Promise<User> => {
    return apiFetch<User>("/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
  };

  const updateUser = async (userId: string, user: Partial<User>): Promise<User> => {
    return apiFetch<User>(`/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(user),
    });
  };

  const getEvents = async (): Promise<Event[]> => {
    return apiFetch<Event[]>("/events");
  };

  const getActiveEvent = async (): Promise<Event | null> => {
    const events = await apiFetch<Event[]>("/events?isActive=true");
    return events.length > 0 ? events[0] : null;
  };

  const setActiveEvent = async (eventId: string): Promise<Event> => {
    // First, deactivate all events
    const events = await getEvents();
    for (const event of events) {
      if (event.isActive && event.id !== eventId) {
        await apiFetch(`/events/${event.id}`, {
          method: "PATCH",
          body: JSON.stringify({ isActive: false }),
        });
      }
    }
    // Now activate the target event
    return apiFetch<Event>(`/events/${eventId}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: true }),
    });
  };

  const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
    return apiFetch<Event>("/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  };

  const updateEvent = async (eventId: string, data: Partial<Event>): Promise<Event> => {
    return apiFetch<Event>(`/events/${eventId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  const getSales = async (): Promise<Sale[]> => {
    return apiFetch<Sale[]>("/sales");
  };

  const createSale = async (sale: Omit<Sale, "id">): Promise<Sale> => {
    return apiFetch<Sale>("/sales", {
      method: "POST",
      body: JSON.stringify(sale),
    });
  };

  const updateSaleStatus = async (saleId: string, status: "PAGO" | "PENDENTE" | "CANCELADO"): Promise<Sale> => {
    return apiFetch<Sale>(`/sales/${saleId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  };

  const getSalesByCustomer = async (customerId: string): Promise<Sale[]> => {
    return apiFetch<Sale[]>(`/sales?customerId=${customerId}`);
  };

  const cancelSale = async (saleId: string, operatorId: string): Promise<Sale> => {
    return apiFetch<Sale>(`/sales/${saleId}/cancel`, {
      method: "POST",
      body: JSON.stringify({ operatorId }),
    });
  };

  const getEventAnalytics = async (eventId: string): Promise<AnalyticsData> => {
    return apiFetch<AnalyticsData>(`/sales/analytics/event/${eventId}`);
  };

  return useMemo(() => ({
    getProducts,
    updateProductStock,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    getUserByCpf,
    createUser,
    updateUser,
    getEvents,
    getActiveEvent,
    setActiveEvent,
    createEvent,
    updateEvent,
    getSales,
    createSale,
    updateSaleStatus,
    getSalesByCustomer,
    cancelSale,
    getEventAnalytics,
  }), []);
};
