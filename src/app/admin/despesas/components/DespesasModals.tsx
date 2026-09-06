"use client";

import React from "react";
import { NewExpenseGroupModal } from "./modals/NewExpenseGroupModal";
import { NewExpenseItemModal } from "./modals/NewExpenseItemModal";
import { NewIncomeModal } from "./modals/NewIncomeModal";
import { QuickRepaymentModal } from "./modals/QuickRepaymentModal";
import { QuickUserModal } from "@/components/QuickUserModal";
import { useDespesas } from "../context/DespesasContext";

export const DespesasModals: React.FC = () => {
  const {
    isQuickUserModalOpen,
    setIsQuickUserModalOpen,
    quickRegisterCpf,
    handleQuickUserSuccess,
  } = useDespesas();

  return (
    <>
      <NewExpenseGroupModal />
      <NewExpenseItemModal />
      <NewIncomeModal />
      <QuickRepaymentModal />
      <QuickUserModal
        isOpen={isQuickUserModalOpen}
        onClose={() => setIsQuickUserModalOpen(false)}
        cpf={quickRegisterCpf}
        onSuccess={handleQuickUserSuccess}
      />
    </>
  );
};
