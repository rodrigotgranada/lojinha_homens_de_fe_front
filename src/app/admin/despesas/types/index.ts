import { Event, Expense, ExpenseItem, EventIncome, EventFinancialSummary, User, PayerReportItem } from "@/hooks/useApi";

export type DespesasTab = "obras" | "irmãos" | "receitas" | "relatorio";
export type NatureFilter = "ALL" | "INFRAESTRUTURA" | "OPERACIONAL";

export interface DespesasContextType {
  // Event & Global state
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  selectedEvent: Event | undefined;
  loading: boolean;
  activeTab: DespesasTab;
  setActiveTab: (tab: DespesasTab) => void;
  natureFilter: NatureFilter;
  setNatureFilter: (filter: NatureFilter) => void;
  summaryData: EventFinancialSummary | null;
  summary: EventFinancialSummary["summary"];
  expensesList: Expense[];
  filteredExpenses: Expense[];
  incomesList: EventIncome[];
  payersReport: PayerReportItem[];
  loadFinancialData: () => Promise<void>;
  handlePrint: () => void;
  formatMoney: (val: number) => string;
  formatCurrencyInput: (value: string) => string;
  saving: boolean;

  // Modal 1: Grupo / Obra
  isGroupModalOpen: boolean;
  setIsGroupModalOpen: (open: boolean) => void;
  groupTitle: string;
  setGroupTitle: (title: string) => void;
  groupCategory: string;
  setGroupCategory: (cat: string) => void;
  groupNature: "INFRAESTRUTURA" | "OPERACIONAL";
  setGroupNature: (nature: "INFRAESTRUTURA" | "OPERACIONAL") => void;
  groupDescription: string;
  setGroupDescription: (desc: string) => void;
  handleCategoryChange: (cat: string) => void;
  handleCreateGroup: (e: React.FormEvent) => Promise<void>;
  handleDeleteExpense: (expenseId: string) => Promise<void>;

  // Modal 2: Item da Obra
  isItemModalOpen: boolean;
  setIsItemModalOpen: (open: boolean) => void;
  targetExpenseId: string;
  setTargetExpenseId: (id: string) => void;
  itemDescription: string;
  setItemDescription: (desc: string) => void;
  itemAmount: string;
  setItemAmount: (amount: string) => void;
  itemCpf: string;
  setItemCpf: (cpf: string) => void;
  itemPaidBy: string;
  setItemPaidBy: (name: string) => void;
  itemPayerPhone: string;
  setItemPayerPhone: (phone: string) => void;
  itemIsDonation: boolean;
  setItemIsDonation: (isDonation: boolean) => void;
  itemNotes: string;
  setItemNotes: (notes: string) => void;
  itemReceiptUrl: string;
  setItemReceiptUrl: (url: string) => void;
  uploadingReceipt: boolean;
  handleReceiptUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleAddItem: (e: React.FormEvent) => Promise<void>;
  handleDeleteItem: (expenseId: string, itemId: string) => Promise<void>;

  // Modal 3: Entrada de Receita
  isIncomeModalOpen: boolean;
  setIsIncomeModalOpen: (open: boolean) => void;
  incomeTitle: string;
  setIncomeTitle: (title: string) => void;
  incomeType: string;
  setIncomeType: (type: string) => void;
  customIncomeType: string;
  setCustomIncomeType: (type: string) => void;
  incomeAmount: string;
  setIncomeAmount: (amount: string) => void;
  incomeNotes: string;
  setIncomeNotes: (notes: string) => void;
  handleCreateIncome: (e: React.FormEvent) => Promise<void>;
  handleDeleteIncome: (incomeId: string) => Promise<void>;

  // Modal 4: Reembolso / Baixa
  isRepayModalOpen: boolean;
  setIsRepayModalOpen: (open: boolean) => void;
  repayExpenseId: string;
  repayItemId: string;
  repayItemDescription: string;
  repayPayer: string;
  repayTotalAmount: number;
  repayCurrentValue: string;
  setRepayCurrentValue: (val: string) => void;
  handleOpenRepayModal: (expenseId: string, item: ExpenseItem) => void;
  handleSaveRepayment: (e: React.FormEvent) => Promise<void>;

  // Quick User Modal
  isQuickUserModalOpen: boolean;
  setIsQuickUserModalOpen: (open: boolean) => void;
  quickRegisterCpf: string;
  setQuickRegisterCpf: (cpf: string) => void;
  handleQuickUserSuccess: (user: User) => void;
}
