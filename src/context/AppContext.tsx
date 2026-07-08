"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, Event, User, useApi } from "@/hooks/useApi";
import { io } from "socket.io-client";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  activeEvent: Event | null;
  refreshActiveEvent: () => Promise<void>;
  setActiveEventState: (event: Event | null) => void;

  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginUser: (cpf: string, phone: string) => Promise<User | null>;
  logoutUser: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const api = useApi();

  // Load Active Event and Current User session on mount
  const refreshActiveEvent = useCallback(async () => {
    try {
      const active = await api.getActiveEvent();
      setActiveEvent(active);
    } catch (error) {
      console.error("Could not fetch active event from API. Fallback to default in-memory active event.", error);
      // Fallback
      setActiveEvent({
        id: "evt-1",
        name: "Homens de Fé - Versão 3",
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }
  }, [api]);

  useEffect(() => {
    const initApp = async () => {
      setIsLoading(true);
      await refreshActiveEvent();
      
      // Load user session from localStorage if exists
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user_session");
        if (storedUser) {
          try {
            setCurrentUserState(JSON.parse(storedUser));
          } catch (e) {
            localStorage.removeItem("user_session");
          }
        }
      }
      setIsLoading(false);
    };

    initApp();
  }, [refreshActiveEvent]);

  // Connect to Socket.io backend server for real-time stock/log sync
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip connecting to WebSockets in mock mode since json-server doesn't support them
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      console.log("Mock mode active. Skipped WebSocket backend connection.");
      return;
    }

    const socketUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("WebSocket connected to backend:", socketUrl);
    });

    socket.on("stock_changed", (data: { productId: string; newStock: number }) => {
      window.dispatchEvent(
        new CustomEvent("product_stock_updated", {
          detail: { productId: data.productId, newStock: data.newStock },
        })
      );
    });

    socket.on("product_status_changed", (data: { productId: string; active: boolean }) => {
      window.dispatchEvent(
        new CustomEvent("product_status_updated", {
          detail: { productId: data.productId, active: data.active },
        })
      );
    });

    socket.on("product_changed", (updatedProduct: any) => {
      window.dispatchEvent(
        new CustomEvent("product_updated", {
          detail: updatedProduct,
        })
      );
    });

    socket.on("log_added", (log: any) => {
      window.dispatchEvent(
        new CustomEvent("log_added", {
          detail: log,
        })
      );
    });

    return () => {
      console.log("Disconnecting WebSocket connection...");
      socket.disconnect();
    };
  }, []);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        // Limit quantity to available stock
        const newQty = Math.min(existingItem.quantity + quantity, product.stock);
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      // Add as new item
      return [...prevCart, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const clampedQty = Math.max(1, Math.min(quantity, item.product.stock));
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Authentication operations
  const loginUser = async (cpf: string, phone: string): Promise<User | null> => {
    setIsLoading(true);
    const cleanPhone = phone.replace(/\D/g, "");
    try {
      const user = await api.getUserByCpf(cpf);
      if (user) {
        if (user.role !== "ADMIN") {
          setIsLoading(false);
          return null;
        }
        
        // Validate user phone as password
        const userPhoneClean = user.phone.replace(/\D/g, "");
        if (userPhoneClean !== cleanPhone) {
          setIsLoading(false);
          throw new Error("Senha incorreta (o celular cadastrado deve ser usado como senha).");
        }

        setCurrentUserState(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("user_session", JSON.stringify(user));
        }
        setIsLoading(false);
        return user;
      }
    } catch (error: any) {
      console.error("API login failed, checking fallback users", error);
      // Fallback logic for demo (only ADMIN fallbacks are allowed)
      if (cpf === "11111111111" || cpf === "admin") {
        const user: User = {
          id: "usr-2",
          cpf: "11111111111",
          firstName: "Gabriel",
          lastName: "Admin",
          phone: "53988888881",
          email: "gabriel.admin@email.com",
          role: "ADMIN"
        };
        if (cleanPhone !== "53988888881" && cpf !== "admin") {
          setIsLoading(false);
          throw new Error("Senha incorreta (o celular cadastrado deve ser usado como senha).");
        }
        setCurrentUserState(user);
        localStorage.setItem("user_session", JSON.stringify(user));
        setIsLoading(false);
        return user;
      } else if (cpf === "22222222222") {
        const user: User = {
          id: "usr-3",
          cpf: "22222222222",
          firstName: "Lucas",
          lastName: "Admin",
          phone: "53988888882",
          email: "lucas.admin@email.com",
          role: "ADMIN"
        };
        if (cleanPhone !== "53988888882") {
          setIsLoading(false);
          throw new Error("Senha incorreta (o celular cadastrado deve ser usado como senha).");
        }
        setCurrentUserState(user);
        localStorage.setItem("user_session", JSON.stringify(user));
        setIsLoading(false);
        return user;
      }
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
    return null;
  };

  const logoutUser = () => {
    setCurrentUserState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_session");
    }
  };

  const setActiveEventState = (event: Event | null) => {
    setActiveEvent(event);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        activeEvent,
        refreshActiveEvent,
        setActiveEventState,
        currentUser,
        setCurrentUser: setCurrentUserState,
        loginUser,
        logoutUser,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
