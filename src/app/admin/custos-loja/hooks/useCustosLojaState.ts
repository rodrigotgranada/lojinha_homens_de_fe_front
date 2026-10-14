"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { expenseService } from "@/services/expenseService";
import { Event, Expense, InvestorReportItem, AnalyticsData, InvestorProductItem } from "@/types";
import { CustosLojaContextType, CustosLojaTab } from "../types";

export const useCustosLojaState = (): CustosLojaContextType => {
  const { currentUser, activeEvent, isLoading: authLoading } = useApp();
  const api = useApi();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<CustosLojaTab>("produtos");

  // Analytics & Investors
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [storeExpenses, setStoreExpenses] = useState<Expense[]>([]);

  // Modals
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isRepaymentModalOpen, setIsRepaymentModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorReportItem | null>(null);

  // Load events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const list = await api.getEvents();
        setEvents(list);
        if (activeEvent?.id) {
          setSelectedEventId(activeEvent.id);
        } else {
          const active = list.find((e) => e.isActive) || list[0];
          if (active) setSelectedEventId(active.id);
        }
      } catch (e) {
        console.error("Erro ao buscar eventos para custos da lojinha:", e);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && currentUser?.role === "ADMIN") {
      fetchEvents();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading, currentUser, activeEvent?.id]);

  // Load data for the selected event
  const loadData = useCallback(async () => {
    if (!selectedEventId) return;
    setLoading(true);
    try {
      const [analyticsData, expensesData] = await Promise.all([
        api.getEventAnalytics(selectedEventId),
        expenseService.getExpenses(selectedEventId),
      ]);

      setAnalytics(analyticsData);

      // Filter store operational expenses
      const storeOnly = (expensesData || []).filter(
        (exp) =>
          exp.nature === "LOJINHA_INVESTIMENTO" ||
          exp.nature === "LOJINHA_DOACAO" ||
          exp.category === "LOJINHA" ||
          exp.title?.toLowerCase().includes("lojinha") ||
          exp.title?.toLowerCase().includes("loja")
      );
      setStoreExpenses(storeOnly);
    } catch (err) {
      console.error("Erro ao carregar dados de custos da lojinha:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedEventId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Process investors list & all store products
  const investorsList: InvestorReportItem[] = useMemo(() => {
    return analytics?.investorsReport || [];
  }, [analytics]);

  const allStoreProducts: InvestorProductItem[] = useMemo(() => {
    const prods: InvestorProductItem[] = [];
    investorsList.forEach((inv) => {
      inv.products?.forEach((p) => prods.push(p));
    });
    return prods;
  }, [investorsList]);

  // Financial KPIs
  const totalRevenue = useMemo(() => {
    return analytics?.summary?.totalRevenue || 0;
  }, [analytics]);

  const totalInvested = useMemo(() => {
    return investorsList.reduce((acc, inv) => acc + (inv.totalInvested || 0), 0);
  }, [investorsList]);

  const totalToRepay = useMemo(() => {
    return investorsList.reduce((acc, inv) => acc + (inv.totalToRepay || 0), 0);
  }, [investorsList]);

  const totalProfit = useMemo(() => {
    return investorsList.reduce((acc, inv) => acc + (inv.totalProfitForRetreat || 0), 0);
  }, [investorsList]);

  const totalPendingRepay = useMemo(() => {
    return Math.max(0, totalInvested - totalToRepay);
  }, [totalInvested, totalToRepay]);

  const totalOperExpenses = useMemo(() => {
    return storeExpenses.reduce((acc, exp) => acc + (exp.totalAmount || 0), 0);
  }, [storeExpenses]);

  // Actions
  const handleCreateStoreExpense = async (data: {
    title: string;
    amount: number;
    paidBy: string;
    description?: string;
    receiptUrl?: string;
  }) => {
    if (!selectedEventId) return;
    setSaving(true);
    try {
      const group = await expenseService.createExpense({
        eventId: selectedEventId,
        title: data.title,
        category: "LOJINHA",
        nature: "LOJINHA_INVESTIMENTO",
        description: data.description || "Despesa operacional da Lojinha",
        operatorName: currentUser?.firstName || "Admin",
      });

      if (data.amount > 0) {
        await expenseService.addExpenseItem(group.id, {
          description: data.title,
          amount: data.amount,
          paidBy: data.paidBy || "Caixa do Retiro",
          isDonation: false,
          receiptUrl: data.receiptUrl,
          operatorName: currentUser?.firstName || "Admin",
        });
      }

      await loadData();
      setIsExpenseModalOpen(false);
    } catch (err: any) {
      console.error("Erro ao registrar despesa da loja:", err);
      alert(`Erro: ${err?.message || "Não foi possível registrar despesa."}`);
    } finally {
      setSaving(false);
    }
  };

  const handleRepayInvestor = async (data: {
    amount: number;
    method: string;
    proofUrl?: string;
    notes?: string;
  }) => {
    if (!selectedInvestor || !selectedEventId) return;
    setSaving(true);
    try {
      // Find or create an expense item for tracking this repayment
      const matchingExpense = storeExpenses.find((e) =>
        e.items?.some((i) => i.paidBy.toLowerCase() === selectedInvestor.sponsorName.toLowerCase())
      );

      if (matchingExpense && matchingExpense.items.length > 0) {
        const item = matchingExpense.items.find(
          (i) => i.paidBy.toLowerCase() === selectedInvestor.sponsorName.toLowerCase()
        ) || matchingExpense.items[0];

        await expenseService.addRepayment(matchingExpense.id, (item as any)._id?.toString() || item.id, {
          amount: data.amount,
          method: data.method,
          proofUrl: data.proofUrl,
          notes: data.notes || `Devolução de investimento a ${selectedInvestor.sponsorName}`,
          operatorName: currentUser?.firstName || "Admin",
        });
      } else {
        // Create an expense group & item for this investor's product lot repayment
        const newGroup = await expenseService.createExpense({
          eventId: selectedEventId,
          title: `Confecção de Produtos - ${selectedInvestor.sponsorName}`,
          category: "LOJINHA",
          nature: "LOJINHA_INVESTIMENTO",
          description: `Financiamento de lote da Lojinha por ${selectedInvestor.sponsorName}`,
          operatorName: currentUser?.firstName || "Admin",
        });

        const updated = await expenseService.addExpenseItem(newGroup.id, {
          description: `Lote de Produtos (${selectedInvestor.products.map((p) => p.name).join(", ")})`,
          amount: selectedInvestor.totalInvested || data.amount,
          paidBy: selectedInvestor.sponsorName,
          isDonation: false,
          operatorName: currentUser?.firstName || "Admin",
        });

        const createdItem = updated.items[0];
        if (createdItem) {
          await expenseService.addRepayment(newGroup.id, (createdItem as any)._id?.toString() || createdItem.id, {
            amount: data.amount,
            method: data.method,
            proofUrl: data.proofUrl,
            notes: data.notes,
            operatorName: currentUser?.firstName || "Admin",
          });
        }
      }

      await loadData();
      setIsRepaymentModalOpen(false);
      setSelectedInvestor(null);
    } catch (err: any) {
      console.error("Erro ao registrar devolução ao investidor:", err);
      alert(`Erro: ${err?.message || "Não foi possível registrar o pagamento."}`);
    } finally {
      setSaving(false);
    }
  };

  const formatMoney = (val: number) => {
    return (val || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    loading,
    activeTab,
    setActiveTab,
    analytics,
    investorsList,
    allStoreProducts,
    storeExpenses,
    totalRevenue,
    totalInvested,
    totalToRepay,
    totalProfit,
    totalPendingRepay,
    totalOperExpenses,
    loadData,
    formatMoney,
    isExpenseModalOpen,
    setIsExpenseModalOpen,
    isRepaymentModalOpen,
    setIsRepaymentModalOpen,
    selectedInvestor,
    setSelectedInvestor,
    handleCreateStoreExpense,
    handleRepayInvestor,
    saving,
  };
};
