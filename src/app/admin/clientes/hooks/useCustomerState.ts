import { useState, useEffect, useCallback, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, User, Sale } from "@/hooks/useApi";

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

  // Fetch users and sales to build faturamento spent map
  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [usersList, salesList] = await Promise.all([
        api.getUsers(),
        api.getSales()
      ]);

      // Calculate faturamento spent mapping
      const spentMap: { [key: string]: number } = {};
      salesList.forEach((sale) => {
        if (sale.status !== "CANCELADO") {
          const cust = sale.customerId as any;
          const custId = cust?._id || cust?.id || cust;
          if (custId) {
            spentMap[custId.toString()] = (spentMap[custId.toString()] || 0) + sale.totalPrice;
          }
        }
      });
      setCustomerSpentMap(spentMap);

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
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (!isLoading && currentUser?.role === "ADMIN") {
      loadCustomers();
    }
  }, [isLoading, currentUser, loadCustomers]);

  // Load sales history when a customer is selected
  useEffect(() => {
    async function loadSales() {
      if (!selectedCustomer) {
        setCustomerSales([]);
        setTotalSpent(0);
        return;
      }
      try {
        setLoadingSales(true);
        const salesData = await api.getSalesByCustomer(selectedCustomer.id);
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
    }
    loadSales();
  }, [selectedCustomer, api]);

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
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const cleanSearch = searchTerm.toLowerCase().replace(/\D/g, "");
      const cleanCpf = customer.cpf.replace(/\D/g, "");

      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        cleanCpf.includes(cleanSearch) ||
        customer.cpf.includes(searchTerm) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
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

    return roleFiltered.map((customer) => ({
      ...customer,
      spent: customerSpentMap[customer.id] || 0
    }));
  }, [customers, activeTab, searchTerm, roleFilter, sortField, sortDirection, customerSpentMap]);

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
    toggleCustomerStatus
  };
};
