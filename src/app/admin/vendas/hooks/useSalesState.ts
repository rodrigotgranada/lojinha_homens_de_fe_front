import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Sale, Event } from "@/hooks/useApi";

export const useSalesState = () => {
  const { currentUser, isLoading, activeEvent } = useApp();
  const api = useApi();

  const [sales, setSales] = useState<Sale[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);

  // Cancellation modal state
  const [saleToCancel, setSaleToCancel] = useState<Sale | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [canceling, setCanceling] = useState(false);

  // Pay modal state
  const [saleToPay, setSaleToPay] = useState<Sale | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  // Print & Export state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [printType, setPrintType] = useState<"event-summary" | "customer-extrato" | null>(null);
  const [printCpf, setPrintCpf] = useState("");
  const [printFilterByEvent, setPrintFilterByEvent] = useState(true);

  const triggerPrint = (type: "event-summary" | "customer-extrato") => {
    setPrintType(type);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Fetch sales
  const loadSales = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getSales();
      setSales(data);
    } catch (err) {
      console.error("Failed to load sales", err);
      setError("Erro ao carregar lista de vendas do servidor.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Load events and set active event as default selector
  useEffect(() => {
    async function loadEvents() {
      try {
        const list = await api.getEvents();
        setEvents(list);
        const active = list.find((e) => e.isActive);
        if (active) {
          setSelectedEventId(active.id);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      }
    }
    if (!isLoading && currentUser?.role === "ADMIN") {
      loadEvents();
      loadSales();
    }
  }, [isLoading, currentUser, api, loadSales]);

  // Refresh sales list automatically in real-time when new sales or cancellations occur
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleRefresh = () => {
      loadSales();
    };

    window.addEventListener("log_added", handleRefresh);
    return () => {
      window.removeEventListener("log_added", handleRefresh);
    };
  }, [loadSales]);

  // Clean success/error alerts after 5s
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Handle cancel confirmation
  const handleCancelSale = async () => {
    if (!saleToCancel) return;
    try {
      setCanceling(true);
      setError("");
      const operatorId = currentUser ? currentUser.id : "system";
      
      const updatedSale = await api.cancelSale(saleToCancel.id, operatorId);
      
      // Update local state status
      setSales((prev) =>
        prev.map((s) => (s.id === saleToCancel.id ? updatedSale : s))
      );
      
      setSuccess("Venda desfeita com sucesso! Estoque e caixa foram atualizados.");
      setIsCancelModalOpen(false);
      setSaleToCancel(null);
    } catch (err) {
      console.error("Failed to cancel sale", err);
      setError("Erro ao estornar venda. Tente novamente.");
    } finally {
      setCanceling(false);
    }
  };

  // Handle mark as paid confirmation
  const handlePaySale = async () => {
    if (!saleToPay) return;
    try {
      setPaying(true);
      setError("");
      
      const updatedSale = await api.updateSaleStatus(saleToPay.id, "PAGO");
      
      // Update local state status
      setSales((prev) =>
        prev.map((s) => (s.id === saleToPay.id ? updatedSale : s))
      );
      
      setSuccess("Venda marcada como PAGA com sucesso!");
      setIsPayModalOpen(false);
      setSaleToPay(null);
    } catch (err) {
      console.error("Failed to pay sale", err);
      setError("Erro ao atualizar status da venda. Tente novamente.");
    } finally {
      setPaying(false);
    }
  };

  // Toggle row expansion
  const toggleExpand = (saleId: string) => {
    setExpandedSaleId((prev) => (prev === saleId ? null : saleId));
  };

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  // Filter sales
  const filteredSales = sales.filter((sale) => {
    // Search filter: customer name, CPF, or Sale ID
    const customer = sale.customerId as any;
    const customerName = customer ? `${customer.firstName} ${customer.lastName}`.toLowerCase() : "";
    const customerCpf = customer ? customer.cpf.replace(/\D/g, "") : "";
    const cleanSearch = searchTerm.toLowerCase().replace(/\D/g, "");
    
    const matchesSearch =
      customerName.includes(searchTerm.toLowerCase()) ||
      customerCpf.includes(cleanSearch) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      sale.status.toLowerCase() === statusFilter.toLowerCase();

    // Event filter
    const matchesEvent =
      selectedEventId === "all" ||
      sale.eventId === selectedEventId;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  return {
    sales,
    events,
    selectedEventId,
    setSelectedEventId,
    loading,
    error,
    success,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    expandedSaleId,
    setExpandedSaleId,
    saleToCancel,
    setSaleToCancel,
    isCancelModalOpen,
    setIsCancelModalOpen,
    canceling,
    saleToPay,
    setSaleToPay,
    isPayModalOpen,
    setIsPayModalOpen,
    paying,
    isExportModalOpen,
    setIsExportModalOpen,
    printType,
    setPrintType,
    printCpf,
    setPrintCpf,
    printFilterByEvent,
    setPrintFilterByEvent,
    triggerPrint,
    loadSales,
    handleCancelSale,
    handlePaySale,
    toggleExpand,
    formatCurrency,
    filteredSales,
    currentUser,
    isLoading
  };
};
