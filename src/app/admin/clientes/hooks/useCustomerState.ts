import { useState, useEffect, useCallback, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, User, Sale } from "@/hooks/useApi";
import { normalizeString } from "@/utils/stringUtils";
import { broadcastCrossTabEvent, subscribeCrossTabEvent } from "@/utils/crossTabSync";

export const useCustomerState = () => {
  const { currentUser, isLoading } = useApp();
  const api = useApi();

  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [customerSales, setCustomerSales] = useState<Sale[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);

  // Add/Edit modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<User | null>(null);

  // Tabs and Sorting states
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [customerSpentMap, setCustomerSpentMap] = useState<{ [key: string]: number }>({});
  const [customerPendingMap, setCustomerPendingMap] = useState<{ [key: string]: boolean }>({});
  const [customerPendingAmountMap, setCustomerPendingAmountMap] = useState<{ [key: string]: number }>({});

  // Fetch users and sales to build faturamento spent map
  const loadCustomers = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError("");
      const [usersList, salesList] = await Promise.all([
        api.getUsers(),
        api.getSales()
      ]);

      // Calculate faturamento spent mapping and pending status
      const spentMap: { [key: string]: number } = {};
      const pendingMap: { [key: string]: boolean } = {};
      const pendingAmountMap: { [key: string]: number } = {};
      
      salesList.forEach((sale) => {
        if (sale.status !== "CANCELADO") {
          const cust = sale.customerId as any;
          const custId = cust?._id || cust?.id || cust;
          if (custId) {
            const idStr = custId.toString();
            spentMap[idStr] = (spentMap[idStr] || 0) + sale.totalPrice;
            if (sale.status === "PENDENTE") {
              pendingMap[idStr] = true;
              pendingAmountMap[idStr] = (pendingAmountMap[idStr] || 0) + sale.totalPrice;
            }
          }
        }
      });
      setCustomerSpentMap(spentMap);
      setCustomerPendingMap(pendingMap);
      setCustomerPendingAmountMap(pendingAmountMap);

      // Default alphabetical sort by name
      usersList.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setCustomers(usersList);
    } catch (err) {
      console.error("Failed to fetch users and sales", err);
      setError("Erro ao carregar lista de usuários.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (!isLoading && currentUser?.role === "ADMIN") {
      loadCustomers();
    }
  }, [isLoading, currentUser, loadCustomers]);

  // Debt settlement states
  const [payingSaleId, setPayingSaleId] = useState<string | null>(null);
  const [payingAll, setPayingAll] = useState(false);

  const fetchCustomerSales = useCallback(async (customerId: string) => {
    try {
      setLoadingSales(true);
      const salesData = await api.getSalesByCustomer(customerId);
      setCustomerSales(salesData);

      // Sum only PAID/PENDENTE sales (exclude CANCELADO)
      const spent = salesData
        .filter((s) => s.status !== "CANCELADO")
        .reduce((total, s) => total + s.totalPrice, 0);
      setTotalSpent(spent);
    } catch (err) {
      console.error("Failed to load customer sales history", err);
      setCustomerSales([]);
      setTotalSpent(0);
    } finally {
      setLoadingSales(false);
    }
  }, [api]);

  // Load sales history when a customer is selected
  useEffect(() => {
    if (!selectedCustomer) {
      setCustomerSales([]);
      setTotalSpent(0);
      return;
    }
    const cId = (selectedCustomer.id || (selectedCustomer as any)._id || "").toString();
    if (cId) {
      fetchCustomerSales(cId);
    }
  }, [selectedCustomer, fetchCustomerSales]);

  // Pending balance & count for the currently selected customer
  const { pendingBalance, pendingCount } = useMemo(() => {
    const pendingSales = customerSales.filter((s) => s.status === "PENDENTE");
    const balance = pendingSales.reduce((acc, s) => acc + s.totalPrice, 0);
    return {
      pendingBalance: balance,
      pendingCount: pendingSales.length
    };
  }, [customerSales]);

  // Pay single sale
  const paySale = useCallback(async (saleId: string) => {
    if (!selectedCustomer) return;
    const cId = (selectedCustomer.id || (selectedCustomer as any)._id || "").toString();
    const sId = (saleId || "").toString();
    if (!sId) return;

    try {
      setPayingSaleId(sId);
      await api.updateSaleStatus(sId, "PAGO");
      await Promise.all([
        cId ? fetchCustomerSales(cId) : Promise.resolve(),
        loadCustomers(true)
      ]);
      // Notifica as outras abas (Vendas, Diretoria) em tempo real
      broadcastCrossTabEvent("SALES_UPDATED");
    } catch (err) {
      console.error("Erro ao quitar venda individual:", err);
      alert("Erro ao quitar venda. Tente novamente.");
    } finally {
      setPayingSaleId(null);
    }
  }, [selectedCustomer, api, fetchCustomerSales, loadCustomers]);

  // Pay all debts of selected customer
  const payAllSales = useCallback(async () => {
    if (!selectedCustomer) return;
    const cId = (selectedCustomer.id || (selectedCustomer as any)._id || "").toString();
    if (!cId) return;

    try {
      setPayingAll(true);
      await (api as any).payAllCustomerSales(cId);
      await Promise.all([
        fetchCustomerSales(cId),
        loadCustomers(true)
      ]);
      // Reset da indicação local de cobrança já que as pendências foram zeradas
      setSelectedCustomer((prev) => (prev ? { ...prev, lastChargedAt: undefined, chargeCount: 0 } : prev));
      // Notifica as outras abas (Vendas, Diretoria) em tempo real
      broadcastCrossTabEvent("SALES_UPDATED");
    } catch (err) {
      console.error("Erro ao quitar todas as vendas do cliente:", err);
      alert("Erro ao quitar todas as dívidas. Tente novamente.");
    } finally {
      setPayingAll(false);
    }
  }, [selectedCustomer, api, fetchCustomerSales, loadCustomers]);

  // Mark customer as charged via WhatsApp
  const markCustomerCharged = useCallback(async (customerId: string) => {
    try {
      const updated = await (api as any).markUserCharged(customerId);
      if (updated) {
        setSelectedCustomer((prev) => (prev ? { ...prev, ...updated } : prev));
        setCustomers((prev) =>
          prev.map((c) => {
            const cId = (c.id || (c as any)._id || "").toString();
            return cId === customerId ? { ...c, ...updated } : c;
          })
        );
      }
    } catch (err) {
      console.error("Erro ao registrar cobrança no cliente:", err);
    }
  }, [api]);

  // Escuta alterações de vendas vindas de outras abas ou ao focar nesta aba
  useEffect(() => {
    const unsubscribe = subscribeCrossTabEvent(["SALES_UPDATED"], () => {
      loadCustomers(true);
      if (selectedCustomer) {
        const cId = (selectedCustomer.id || (selectedCustomer as any)._id || "").toString();
        if (cId) {
          fetchCustomerSales(cId);
        }
      }
    });
    return unsubscribe;
  }, [loadCustomers, selectedCustomer, fetchCustomerSales]);

  // Save customer (Create or Update)
  const saveCustomer = useCallback(async (data: any) => {
    if (customerToEdit) {
      await api.updateUser(customerToEdit.id, data);
    } else {
      await api.createUser({
        ...data,
        createdBy: currentUser?.id
      });
    }
    await loadCustomers();
  }, [customerToEdit, api, currentUser, loadCustomers]);

  // Toggle active / inactive customer status
  const toggleCustomerStatus = useCallback(async (customer: User) => {
    const newActiveState = customer.active === false ? true : false;
    await api.updateUser(customer.id, { active: newActiveState });
    await loadCustomers();
  }, [api, loadCustomers]);

  // Sort callback
  const handleSort = useCallback((field: string) => {
    setSortDirection((prev) => {
      if (sortField === field) {
        return prev === "asc" ? "desc" : "asc";
      }
      return "asc";
    });
    setSortField(field);
  }, [sortField]);

  // Format currency
  const formatCurrency = useCallback((val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  }, []);

  // Filter and Sort Customers
  const filteredCustomers = useMemo(() => {
    // 1. Filter by Active/Inactive tab
    const tabFiltered = customers.filter((customer) => {
      const isInactive = customer.active === false;
      return activeTab === "active" ? !isInactive : isInactive;
    });

    // 2. Filter by search query
    const searchFiltered = tabFiltered.filter((customer) => {
      const fullName = normalizeString(`${customer.firstName} ${customer.lastName}`);
      const cleanSearch = searchTerm.toLowerCase().replace(/\D/g, "");
      const cleanCpf = customer.cpf.replace(/\D/g, "");
      const normalizedSearchTerm = normalizeString(searchTerm);

      if (!searchTerm.trim()) return true;

      return (
        fullName.includes(normalizedSearchTerm) ||
        (cleanSearch !== "" && cleanCpf.includes(cleanSearch)) ||
        normalizeString(customer.cpf).includes(normalizedSearchTerm) ||
        (customer.email && normalizeString(customer.email).includes(normalizedSearchTerm))
      );
    });

    // 3. Filter by Role
    const roleFiltered = searchFiltered.filter((customer) => {
      return (
        roleFilter === "all" ||
        customer.role.toLowerCase() === roleFilter.toLowerCase()
      );
    });

    // 4. Sort
    roleFiltered.sort((a, b) => {
      let valA: any = "";
      let valB: any = "";

      switch (sortField) {
        case "name":
          valA = `${a.firstName} ${a.lastName}`.toLowerCase();
          valB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);

        case "cpf":
          valA = a.cpf.replace(/\D/g, "");
          valB = b.cpf.replace(/\D/g, "");
          break;

        case "phone":
          valA = a.phone.replace(/\D/g, "");
          valB = b.phone.replace(/\D/g, "");
          break;

        case "email":
          valA = (a.email || "").toLowerCase();
          valB = (b.email || "").toLowerCase();
          break;

        case "role":
          valA = a.role.toLowerCase();
          valB = b.role.toLowerCase();
          break;

        case "spent":
          valA = customerSpentMap[a.id] || 0;
          valB = customerSpentMap[b.id] || 0;
          return sortDirection === "asc" ? valA - valB : valB - valA;

        default:
          return 0;
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return roleFiltered.map((customer) => {
      const cId = (customer.id || (customer as any)._id || "").toString();
      return {
        ...customer,
        spent: customerSpentMap[cId] ?? customerSpentMap[customer.id] ?? 0,
        hasPending: customerPendingMap[cId] ?? customerPendingMap[customer.id] ?? false,
        pendingAmount: customerPendingAmountMap[cId] ?? customerPendingAmountMap[customer.id] ?? 0
      };
    });
  }, [customers, activeTab, searchTerm, roleFilter, sortField, sortDirection, customerSpentMap, customerPendingMap, customerPendingAmountMap]);

  return {
    customers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    selectedCustomer,
    setSelectedCustomer,
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    customerSales,
    loadingSales,
    formatCurrency,
    filteredCustomers,
    totalSpent,
    currentUser,
    isLoading,
    isAddEditModalOpen,
    setIsAddEditModalOpen,
    customerToEdit,
    setCustomerToEdit,
    saveCustomer,
    
    // Tabs & sorting exports
    activeTab,
    setActiveTab,
    sortField,
    sortDirection,
    handleSort,
    toggleCustomerStatus,

    // Debt settlement exports
    pendingBalance,
    pendingCount,
    paySale,
    payAllSales,
    payingSaleId,
    payingAll,
    markCustomerCharged
  };
};
