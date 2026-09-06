import { apiFetch } from "./apiClient";
import {
  Expense,
  ExpenseItem,
  EventFinancialSummary,
  EventIncome,
  RepaymentRecord,
} from "@/types";

export const expenseService = {
  getExpenses: async (eventId: string): Promise<Expense[]> => {
    return apiFetch<Expense[]>(`/expenses?eventId=${eventId}`);
  },

  getEventFinancialSummary: async (eventId: string): Promise<EventFinancialSummary> => {
    return apiFetch<EventFinancialSummary>(`/expenses/summary/${eventId}`);
  },

  createExpense: async (data: {
    eventId: string;
    title: string;
    category?: string;
    nature?: "INFRAESTRUTURA" | "OPERACIONAL";
    description?: string;
    operatorName?: string;
  }): Promise<Expense> => {
    return apiFetch<Expense>("/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addExpenseItem: async (
    expenseId: string,
    item: Omit<ExpenseItem, "id" | "_id" | "repaymentHistory"> & { operatorName?: string }
  ): Promise<Expense> => {
    return apiFetch<Expense>(`/expenses/${expenseId}/items`, {
      method: "POST",
      body: JSON.stringify(item),
    });
  },

  addRepayment: async (
    expenseId: string,
    itemId: string,
    repayment: {
      amount: number;
      method?: string;
      proofUrl?: string;
      operatorName?: string;
      notes?: string;
    }
  ): Promise<Expense> => {
    return apiFetch<Expense>(`/expenses/${expenseId}/items/${itemId}/repayments`, {
      method: "POST",
      body: JSON.stringify(repayment),
    });
  },

  updateExpenseItem: async (
    expenseId: string,
    itemId: string,
    item: Partial<ExpenseItem> & { operatorName?: string }
  ): Promise<Expense> => {
    return apiFetch<Expense>(`/expenses/${expenseId}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(item),
    });
  },

  deleteExpenseItem: async (
    expenseId: string,
    itemId: string,
    operatorName?: string
  ): Promise<Expense> => {
    return apiFetch<Expense>(`/expenses/${expenseId}/items/${itemId}`, {
      method: "DELETE",
      body: JSON.stringify({ operatorName }),
    });
  },

  deleteExpense: async (
    expenseId: string,
    operatorName?: string
  ): Promise<void> => {
    return apiFetch<void>(`/expenses/${expenseId}`, {
      method: "DELETE",
      body: JSON.stringify({ operatorName }),
    });
  },

  // Receitas Extras
  getEventIncomes: async (eventId: string): Promise<EventIncome[]> => {
    return apiFetch<EventIncome[]>(`/expenses/incomes/list?eventId=${eventId}`);
  },

  createEventIncome: async (data: {
    eventId: string;
    title: string;
    type: string;
    amount: number;
    notes?: string;
    operatorName?: string;
  }): Promise<EventIncome> => {
    return apiFetch<EventIncome>("/expenses/incomes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  deleteEventIncome: async (
    id: string,
    operatorName?: string
  ): Promise<void> => {
    return apiFetch<void>(`/expenses/incomes/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ operatorName }),
    });
  },
};
