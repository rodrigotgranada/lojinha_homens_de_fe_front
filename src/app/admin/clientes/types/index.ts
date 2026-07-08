import { User, Sale } from "@/hooks/useApi";

export interface CustomerContextProps {
  customers: User[];
  loading: boolean;
  error: string;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  roleFilter: string;
  setRoleFilter: (filter: string) => void;
  selectedCustomer: User | null;
  setSelectedCustomer: (customer: User | null) => void;
  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;
  customerSales: Sale[];
  loadingSales: boolean;
  formatCurrency: (val: number) => string;
  filteredCustomers: User[];
  totalSpent: number;
  isAddEditModalOpen: boolean;
  setIsAddEditModalOpen: (open: boolean) => void;
  customerToEdit: User | null;
  setCustomerToEdit: (customer: User | null) => void;
  saveCustomer: (data: any) => Promise<void>;
  
  // Sorting and Tabs additions
  activeTab: "active" | "inactive";
  setActiveTab: (tab: "active" | "inactive") => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  toggleCustomerStatus: (customer: User) => Promise<void>;
}
