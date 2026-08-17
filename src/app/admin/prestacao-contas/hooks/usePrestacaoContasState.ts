"use client";

import { useState, useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Event, AnalyticsData } from "@/hooks/useApi";
import { PrestacaoContasContextType } from "../types";

export const usePrestacaoContasState = (): PrestacaoContasContextType => {
  const { currentUser, isLoading: authLoading } = useApp();
  const api = useApi();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // Carregar lista de eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const list = await api.getEvents();
        setEvents(list);
        const active = list.find((e) => e.isActive) || list[0];
        if (active) {
          setSelectedEventId(active.id);
        }
      } catch (e) {
        console.error("Erro ao buscar eventos:", e);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && currentUser?.role === "ADMIN") {
      fetchEvents();
    }
  }, [authLoading, currentUser]);

  // Carregar dados de analytics e investidores do evento selecionado
  useEffect(() => {
    if (!selectedEventId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const data = await api.getEventAnalytics(selectedEventId);
        setAnalytics(data);
      } catch (err) {
        console.error("Erro ao carregar prestação de contas:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedEventId]);

  const handlePrint = () => {
    window.print();
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Totais agregados de todos os investidores
  const investorsList = analytics?.investorsReport || [];
  const totalInvestedGlobal = useMemo(
    () => investorsList.reduce((acc, inv) => acc + inv.totalInvested, 0),
    [investorsList]
  );
  const totalRepayGlobal = useMemo(
    () => investorsList.reduce((acc, inv) => acc + inv.totalToRepay, 0),
    [investorsList]
  );
  const totalProfitGlobal = useMemo(
    () => investorsList.reduce((acc, inv) => acc + inv.totalProfitForRetreat, 0),
    [investorsList]
  );
  const totalRevenueGlobal = useMemo(
    () => investorsList.reduce((acc, inv) => acc + inv.totalRevenue, 0),
    [investorsList]
  );

  return {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    loading,
    analytics,
    investorsList,
    totalInvestedGlobal,
    totalRepayGlobal,
    totalProfitGlobal,
    totalRevenueGlobal,
    handlePrint,
  };
};
