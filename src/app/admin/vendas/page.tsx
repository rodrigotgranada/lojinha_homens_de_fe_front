"use client";

import React from "react";
import { useSalesState } from "./hooks/useSalesState";
import { SalesProvider } from "./context/SalesContext";
import { SalesHeader } from "./components/SalesHeader";
import { SalesFilter } from "./components/SalesFilter";
import { SalesTable } from "./components/SalesTable";
import { SalesModals } from "./components/SalesModals";
import { ExportReportModal } from "./components/ExportReportModal";
import { SalesPrintArea } from "./components/SalesPrintArea";
import { ShieldAlert, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SalesAuditPage() {
  const salesState = useSalesState();
  const {
    currentUser,
    isLoading,
    loading,
    error,
    success
  } = salesState;

  // Security Check: Loading
  if (isLoading || loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-505 font-semibold text-sm">Carregando histórico de vendas...</span>
      </div>
    );
  }

  // Security Check: Authorization
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-955 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Esta área de auditoria e cancelamentos é reservada exclusivamente para administradores.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SalesProvider value={salesState}>
      <div className="flex-1 flex flex-col gap-6 py-6 max-w-7xl mx-auto w-full px-4 print:p-0">
        
        {/* Interactive Layout: Hidden when printing */}
        <div className="print:hidden flex flex-col gap-6 w-full">
          {/* Header Section */}
          <SalesHeader />

          {/* Action Messages */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3.5 rounded-2xl flex items-center gap-2 text-sm shadow-xs animate-fade-in">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3.5 rounded-2xl flex items-center gap-2 text-sm shadow-xs animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Filter and Search Section */}
          <SalesFilter />

          {/* Audits Table */}
          <SalesTable />

          {/* Confirmation Modals (Cancel and Pay) */}
          <SalesModals />

          {/* PDF Report and Statement Modal Dialog */}
          <ExportReportModal />
        </div>

        {/* Print-Only Layout: Visible only when printing */}
        <SalesPrintArea />
        
      </div>
    </SalesProvider>
  );
}
