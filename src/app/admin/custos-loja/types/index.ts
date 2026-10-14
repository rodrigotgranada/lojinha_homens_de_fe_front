import { Event, Expense, InvestorReportItem, AnalyticsData, InvestorProductItem } from "@/types";

export type CustosLojaTab = "produtos" | "investidores" | "operacional";

export interface CustosLojaContextType {
  // Event & Selection
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  selectedEvent: Event | undefined;
  loading: boolean;
  activeTab: CustosLojaTab;
  setActiveTab: (tab: CustosLojaTab) => void;

  // Analytics & Investors
  analytics: AnalyticsData | null;
  investorsList: InvestorReportItem[];
  allStoreProducts: InvestorProductItem[];

  // Store Operational Expenses (bags, paper rolls, card machines)
  storeExpenses: Expense[];

  // Financial KPIs
  totalRevenue: number;
  totalInvested: number;
  totalToRepay: number;
  totalProfit: number;
  totalPendingRepay: number;
  totalOperExpenses: number;

  // Actions
  loadData: () => Promise<void>;
  formatMoney: (val: number) => string;

  // Modals
  isExpenseModalOpen: boolean;
  setIsExpenseModalOpen: (open: boolean) => void;
  isRepaymentModalOpen: boolean;
  setIsRepaymentModalOpen: (open: boolean) => void;
  selectedInvestor: InvestorReportItem | null;
  setSelectedInvestor: (inv: InvestorReportItem | null) => void;
  handleCreateStoreExpense: (data: {
    title: string;
    amount: number;
    paidBy: string;
    description?: string;
    receiptUrl?: string;
  }) => Promise<void>;
  handleRepayInvestor: (data: {
    amount: number;
    method: string;
    proofUrl?: string;
    notes?: string;
  }) => Promise<void>;
  saving: boolean;
}
