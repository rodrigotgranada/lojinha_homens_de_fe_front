"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import {
  useApi,
  Event,
  Expense,
  ExpenseItem,
  EventIncome,
  EventFinancialSummary,
  User,
  PayerReportItem,
} from "@/hooks/useApi";
import { DespesasContextType, DespesasTab, NatureFilter } from "../types";

export const useDespesasState = (): DespesasContextType => {
  const { currentUser, isLoading: authLoading } = useApp();
  const api = useApi();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<DespesasTab>("obras");
  const [natureFilter, setNatureFilter] = useState<NatureFilter>("ALL");

  const [summaryData, setSummaryData] = useState<EventFinancialSummary | null>(null);

  // Modal 1: Criação de Obra / Despesa
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupCategory, setGroupCategory] = useState("OBRA");
  const [groupNature, setGroupNature] = useState<"INFRAESTRUTURA" | "OPERACIONAL">("INFRAESTRUTURA");
  const [groupDescription, setGroupDescription] = useState("");

  // Modal 2: Lançar Item Comprado ou Doado
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [targetExpenseId, setTargetExpenseId] = useState<string>("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [itemCpf, setItemCpf] = useState("");
  const [itemPaidBy, setItemPaidBy] = useState("");
  const [itemPayerPhone, setItemPayerPhone] = useState("");
  const [itemIsDonation, setItemIsDonation] = useState(false);
  const [itemNotes, setItemNotes] = useState("");
  const [itemReceiptUrl, setItemReceiptUrl] = useState("");
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [isQuickUserModalOpen, setIsQuickUserModalOpen] = useState(false);
  const [quickRegisterCpf, setQuickRegisterCpf] = useState("");

  // Modal 3: Entrada de Receita
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeType, setIncomeType] = useState("INSCRICOES");
  const [customIncomeType, setCustomIncomeType] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeNotes, setIncomeNotes] = useState("");

  // Modal 4: Reembolso rápido
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [repayExpenseId, setRepayExpenseId] = useState("");
  const [repayItemId, setRepayItemId] = useState("");
  const [repayItemDescription, setRepayItemDescription] = useState("");
  const [repayPayer, setRepayPayer] = useState("");
  const [repayTotalAmount, setRepayTotalAmount] = useState(0);
  const [repayCurrentValue, setRepayCurrentValue] = useState("");

  const [saving, setSaving] = useState(false);

  // Formatação de Moeda
  const formatMoney = (val: number) => {
    return (val || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatCurrencyInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "0,00";
    const numberValue = parseInt(digits, 10);
    const floatValue = numberValue / 100;
    return floatValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Carregar eventos do sistema
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
        console.error("Erro ao carregar eventos:", e);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && currentUser?.role === "ADMIN") {
      fetchEvents();
    }
  }, [authLoading, currentUser]);

  // Resetar campos do modal de Item sempre que ele for aberto
  useEffect(() => {
    if (isItemModalOpen) {
      setItemDescription("");
      setItemAmount("");
      setItemCpf("");
      setItemPaidBy("");
      setItemPayerPhone("");
      setItemIsDonation(false);
      setItemNotes("");
      setItemReceiptUrl("");
    }
  }, [isItemModalOpen]);

  // Carregar resumo financeiro do evento
  const loadFinancialData = useCallback(async () => {
    if (!selectedEventId) return;
    try {
      setLoading(true);
      const data = await api.getEventFinancialSummary(selectedEventId);
      setSummaryData(data);
    } catch (e) {
      console.error("Erro ao buscar resumo financeiro:", e);
    } finally {
      setLoading(false);
    }
  }, [selectedEventId]);

  useEffect(() => {
    loadFinancialData();
  }, [loadFinancialData]);

  // Sincronizar Categoria com Natureza automaticamente no modal
  const handleCategoryChange = (cat: string) => {
    setGroupCategory(cat);
    if (cat === "OBRA" || cat === "LOCACAO" || cat === "ESTRUTURA") {
      setGroupNature("INFRAESTRUTURA");
    } else {
      setGroupNature("OPERACIONAL");
    }
  };

  // Handlers de Criação / Edição de Grupos de Despesa
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupTitle.trim() || !selectedEventId) return;
    setSaving(true);
    try {
      await api.createExpense({
        eventId: selectedEventId,
        title: groupTitle.trim(),
        category: groupCategory,
        nature: groupNature,
        description: groupDescription.trim(),
        operatorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin",
      });
      setIsGroupModalOpen(false);
      setGroupTitle("");
      setGroupDescription("");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao criar obra:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleQuickUserSuccess = (newUser: User) => {
    setIsQuickUserModalOpen(false);
    setItemCpf(newUser.cpf);
    setItemPaidBy(`${newUser.firstName} ${newUser.lastName}`);
    setItemPayerPhone(newUser.phone || "");
  };

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingReceipt(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Falha no upload");
      const data = await res.json();
      setItemReceiptUrl(data.url);
    } catch (err) {
      console.error("Erro ao enviar comprovante:", err);
      alert("Erro ao enviar comprovante da compra.");
    } finally {
      setUploadingReceipt(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription.trim() || !itemPaidBy.trim() || !targetExpenseId) return;
    setSaving(true);
    try {
      const cleanAmount = itemAmount ? parseFloat(itemAmount.replace(/\./g, "").replace(",", ".")) : 0;
      await api.addExpenseItem(targetExpenseId, {
        description: itemDescription.trim(),
        amount: cleanAmount,
        paidBy: itemPaidBy.trim(),
        payerPhone: itemPayerPhone.trim(),
        isDonation: itemIsDonation,
        status: itemIsDonation ? "DOACAO" : "PENDENTE",
        repaidAmount: 0,
        receiptUrl: itemReceiptUrl,
        notes: itemNotes.trim(),
        operatorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin",
      });
      setIsItemModalOpen(false);
      setItemDescription("");
      setItemAmount("");
      setItemCpf("");
      setItemPaidBy("");
      setItemPayerPhone("");
      setItemIsDonation(false);
      setItemNotes("");
      setItemReceiptUrl("");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeTitle.trim() || !incomeAmount || !selectedEventId) return;
    setSaving(true);
    try {
      const cleanAmount = parseFloat(incomeAmount.replace(/\./g, "").replace(",", ".")) || 0;
      const finalType = incomeType === "OUTRO_CUSTOM" ? (customIncomeType.trim() || "OUTROS") : incomeType;

      await api.createEventIncome({
        eventId: selectedEventId,
        title: incomeTitle.trim(),
        type: finalType,
        amount: cleanAmount,
        notes: incomeNotes.trim(),
        operatorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin",
      });
      setIsIncomeModalOpen(false);
      setIncomeTitle("");
      setIncomeType("INSCRICOES");
      setCustomIncomeType("");
      setIncomeAmount("");
      setIncomeNotes("");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao criar entrada de receita:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleOpenRepayModal = (expenseId: string, item: ExpenseItem) => {
    setRepayExpenseId(expenseId);
    setRepayItemId(item._id?.toString() || item.id || "");
    setRepayItemDescription(item.description);
    setRepayPayer(item.paidBy);
    setRepayTotalAmount(item.amount);
    setRepayCurrentValue((item.amount - item.repaidAmount).toFixed(2).replace(".", ","));
    setIsRepayModalOpen(true);
  };

  const handleSaveRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repayExpenseId || !repayItemId) return;
    setSaving(true);
    try {
      const cleanRepay = parseFloat(repayCurrentValue.replace(/\./g, "").replace(",", ".")) || 0;
      await api.updateExpenseItem(repayExpenseId, repayItemId, {
        repaidAmount: cleanRepay,
        operatorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin",
      });
      setIsRepayModalOpen(false);
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao registrar reembolso:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (expenseId: string, itemId: string) => {
    if (!confirm("Deseja realmente remover este item da obra?")) return;
    try {
      await api.deleteExpenseItem(expenseId, itemId, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao deletar item:", err);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm("Deseja realmente excluir este grupo de despesa e todos os seus itens?")) return;
    try {
      await api.deleteExpense(expenseId, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao deletar grupo:", err);
    }
  };

  const handleDeleteIncome = async (incomeId: string) => {
    if (!confirm("Deseja remover esta entrada de receita?")) return;
    try {
      await api.deleteEventIncome(incomeId, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin");
      loadFinancialData();
    } catch (err) {
      console.error("Erro ao deletar receita:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const summary = summaryData?.summary || {
    totalExpensesAmount: 0,
    totalInfraExpenses: 0,
    totalOperExpenses: 0,
    totalExpensesRepaid: 0,
    totalExpensesPendingRepay: 0,
    totalDonatedItemsCount: 0,
    totalExtraIncomes: 0,
    lojinhaRevenue: 0,
    lojinhaCost: 0,
    lojinhaProfit: 0,
    totalAvailableEventFunds: 0,
    finalEventBalance: 0,
  };

  const expensesList = summaryData?.expenses || [];
  const incomesList = summaryData?.incomes || [];
  const payersReport = summaryData?.payersReport || [];

  const filteredExpenses = expensesList.filter((exp) => {
    if (natureFilter === "ALL") return true;
    const isInfra = exp.nature === "INFRAESTRUTURA" || exp.category === "OBRA" || exp.category === "LOCACAO" || exp.category === "ESTRUTURA";
    if (natureFilter === "INFRAESTRUTURA") return isInfra;
    return !isInfra;
  });

  return {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    loading,
    activeTab,
    setActiveTab,
    natureFilter,
    setNatureFilter,
    summaryData,
    summary,
    expensesList,
    filteredExpenses,
    incomesList,
    payersReport,
    loadFinancialData,
    handlePrint,
    formatMoney,
    formatCurrencyInput,
    saving,

    // Modal 1
    isGroupModalOpen,
    setIsGroupModalOpen,
    groupTitle,
    setGroupTitle,
    groupCategory,
    setGroupCategory,
    groupNature,
    setGroupNature,
    groupDescription,
    setGroupDescription,
    handleCategoryChange,
    handleCreateGroup,
    handleDeleteExpense,

    // Modal 2
    isItemModalOpen,
    setIsItemModalOpen,
    targetExpenseId,
    setTargetExpenseId,
    itemDescription,
    setItemDescription,
    itemAmount,
    setItemAmount,
    itemCpf,
    setItemCpf,
    itemPaidBy,
    setItemPaidBy,
    itemPayerPhone,
    setItemPayerPhone,
    itemIsDonation,
    setItemIsDonation,
    itemNotes,
    setItemNotes,
    itemReceiptUrl,
    setItemReceiptUrl,
    uploadingReceipt,
    handleReceiptUpload,
    handleAddItem,
    handleDeleteItem,

    // Modal 3
    isIncomeModalOpen,
    setIsIncomeModalOpen,
    incomeTitle,
    setIncomeTitle,
    incomeType,
    setIncomeType,
    customIncomeType,
    setCustomIncomeType,
    incomeAmount,
    setIncomeAmount,
    incomeNotes,
    setIncomeNotes,
    handleCreateIncome,
    handleDeleteIncome,

    // Modal 4
    isRepayModalOpen,
    setIsRepayModalOpen,
    repayExpenseId,
    repayItemId,
    repayItemDescription,
    repayPayer,
    repayTotalAmount,
    repayCurrentValue,
    setRepayCurrentValue,
    handleOpenRepayModal,
    handleSaveRepayment,

    // Quick user
    isQuickUserModalOpen,
    setIsQuickUserModalOpen,
    quickRegisterCpf,
    setQuickRegisterCpf,
    handleQuickUserSuccess,
  };
};
