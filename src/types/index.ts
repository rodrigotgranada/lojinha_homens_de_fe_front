export interface Event {
  id: string;
  name: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: "PROGRAMADO" | "ATIVO" | "ENCERRADO" | "CANCELADO";
  createdAt: string;
}

export interface User {
  id: string;
  cpf: string;
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "USER" | "ADMIN";
  createdBy?: string;
  active?: boolean;
}

export interface Category {
  id: string;
  name: string;
  active?: boolean;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  costPrice?: number;
  sponsorName?: string;
  initialStock?: number;
  imageUrl: string;
  active?: boolean;
  category?: string;
  eventId?: string;
  minStock?: number;
  createdBy?: string;
  updatedBy?: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  costAtPurchase?: number;
}

export interface Sale {
  id: string;
  customerId: string;
  eventId: string;
  items: SaleItem[];
  totalPrice: number;
  status: "PAGO" | "PENDENTE" | "CANCELADO";
  createdAt: string;
}

export interface RepaymentRecord {
  id?: string;
  _id?: string;
  amount: number;
  date: string | Date;
  method: string;
  proofUrl?: string;
  operatorName?: string;
  notes?: string;
}

export interface ExpenseItem {
  _id?: string;
  id?: string;
  description: string;
  amount: number;
  paidBy: string;
  payerPhone?: string;
  isDonation: boolean;
  status: "PENDENTE" | "REEMBOLSADO_PARCIAL" | "REEMBOLSADO" | "DOACAO";
  repaidAmount: number;
  receiptUrl?: string;
  notes?: string;
  date?: string;
  repaymentHistory?: RepaymentRecord[];
}

export interface Expense {
  id: string;
  _id?: string;
  eventId: string;
  title: string;
  category: string;
  nature?: "INFRAESTRUTURA" | "OPERACIONAL";
  description?: string;
  items: ExpenseItem[];
  totalAmount: number;
  totalRepaid: number;
  createdAt?: string;
}

export interface EventIncome {
  id: string;
  _id?: string;
  eventId: string;
  title: string;
  type: "INSCRICOES" | "RIFA" | "EVENTO_BENEFICENTE" | "DOACAO" | "OUTROS" | string;
  amount: number;
  date: string;
  notes?: string;
}

export interface PayerReportItem {
  payerName: string;
  payerPhone: string;
  items: Array<{
    expenseId?: string;
    itemId?: string;
    expenseTitle: string;
    description: string;
    amount: number;
    repaidAmount: number;
    status: string;
    isDonation: boolean;
    nature?: string;
    repaymentHistory?: RepaymentRecord[];
  }>;
  totalPaid: number;
  totalRepaid: number;
  balanceToRepay: number;
  isFullyRepaid: boolean;
  donationsCount: number;
}

export interface EventFinancialSummary {
  summary: {
    totalExpensesAmount: number;
    totalInfraExpenses?: number;
    totalOperExpenses?: number;
    totalExpensesRepaid: number;
    totalExpensesPendingRepay: number;
    totalDonatedItemsCount: number;
    totalStoreInvestment?: number;
    totalStoreRepaid?: number;
    totalStorePendingRepay?: number;
    totalExtraIncomes: number;
    lojinhaRevenue: number;
    lojinhaCost: number;
    lojinhaProfit: number;
    totalAvailableEventFunds: number;
    finalEventBalance: number;
    immediateCashAvailable: number;
    totalGrossRevenueCollected?: number;
    totalActuallyPaidOut?: number;
  };
  categoryTotals: Record<string, number>;
  payersReport: PayerReportItem[];
  expenses: Expense[];
  incomes: EventIncome[];
}

export interface InvestorProductItem {
  productId: string;
  name: string;
  costPrice: number;
  salePrice: number;
  initialStock: number;
  currentStock: number;
  soldQuantity: number;
  totalRevenue: number;
  costToRepay: number;
  totalProfit: number;
  investedAmount: number;
}

export interface InvestorReportItem {
  sponsorName: string;
  products: InvestorProductItem[];
  totalInvested: number;
  totalSoldQuantity: number;
  totalRevenue: number;
  totalToRepay: number;
  totalProfitForRetreat: number;
  repaymentProgress: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalCost?: number;
  totalProfit?: number;
  profitMargin?: number;
  pendingRevenue: number;
  totalSalesCount: number;
  pagoCount: number;
  pendenteCount: number;
  ticketMedio: number;
}

export interface ProductStat {
  name: string;
  quantity: number;
  revenue: number;
  cost?: number;
  profit?: number;
  category: string;
  sponsorName?: string;
}

export interface BuyerStat {
  name: string;
  totalSpent: number;
  cpf: string;
  purchasesCount: number;
}

export interface SalesTimelinePoint {
  time: string;
  amount: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  topSellingProducts: ProductStat[];
  investorsReport?: InvestorReportItem[];
  topBuyers: BuyerStat[];
  salesTimeline: SalesTimelinePoint[];
}

export interface LogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  metadata?: any;
  createdAt: string;
}

export interface ReconciliationItem {
  productId: string;
  quantityToImport: number;
  writeOffQuantity?: number;
  writeOffReason?: "PERDA" | "DOACAO" | "AVARIA" | "OUTRO";
  writeOffNotes?: string;
}

export interface ImportPreviousStockPayload {
  currentEventId: string;
  previousEventId: string;
  items: ReconciliationItem[];
  operatorName?: string;
}
