import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Event, AnalyticsData, Sale } from "@/hooks/useApi";

export const useDashboardState = () => {
  const { currentUser, isLoading } = useApp();
  const api = useApi();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [error, setError] = useState("");

  // Fetch events list
  useEffect(() => {
    async function loadEvents() {
      if (currentUser?.role !== "ADMIN") return;
      try {
        setLoadingEvents(true);
        const list = await api.getEvents();
        setEvents(list);
        
        // Default to active event if exists, else first event
        const active = list.find((e) => e.isActive);
        if (active) {
          setSelectedEventId(active.id);
        } else if (list.length > 0) {
          setSelectedEventId(list[0].id);
        }
      } catch (err) {
        console.error("Failed to load events", err);
        setError("Erro ao carregar lista de eventos.");
      } finally {
        setLoadingEvents(false);
      }
    }
    if (!isLoading) {
      loadEvents();
    }
  }, [isLoading, currentUser, api]);

  // Fetch analytics for selected event
  const fetchAnalytics = useCallback(async () => {
    if (!selectedEventId) return;
    try {
      setLoadingAnalytics(true);
      setError("");
      
      const [analyticsData, salesData] = await Promise.all([
        api.getEventAnalytics(selectedEventId),
        api.getSales()
      ]);
      
      setAnalytics(analyticsData);
      // Filter sales belonging to the selected event and sort by newest
      setSales(
        salesData
          .filter((s) => s.eventId === selectedEventId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
    } catch (err) {
      console.error("Failed to fetch event analytics", err);
      setError("Erro ao carregar dados consolidados deste evento.");
      setAnalytics(null);
    } finally {
      setLoadingAnalytics(false);
    }
  }, [selectedEventId, api]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Refresh analytics automatically when log is added (e.g. new sale or cancellation occurs)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleRefresh = () => {
      fetchAnalytics();
    };

    window.addEventListener("log_added", handleRefresh);
    window.addEventListener("product_updated", handleRefresh);
    return () => {
      window.removeEventListener("log_added", handleRefresh);
      window.removeEventListener("product_updated", handleRefresh);
    };
  }, [fetchAnalytics]);

  // Format currency
  const formatCurrency = useCallback((val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  }, []);

  return {
    events,
    selectedEventId,
    setSelectedEventId,
    analytics,
    sales,
    loadingEvents,
    loadingAnalytics,
    error,
    fetchAnalytics,
    formatCurrency,
    currentUser,
    isLoading
  };
};
