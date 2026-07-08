import React from "react";
import { useCustomers } from "../context/CustomerContext";
import { UserPlus } from "lucide-react";

export const CustomerHeader = () => {
  const { setIsAddEditModalOpen, setCustomerToEdit } = useCustomers();

  const handleNewCustomer = () => {
    setCustomerToEdit(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-wider">
          Gestão de Relacionamento
        </span>
        <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
          Clientes Cadastrados
        </h1>
        <p className="text-zinc-550 dark:text-zinc-450 text-sm">
          Visualize a lista de compradores da lojinha do retiro, pesquise contatos e consulte o histórico de transações fiscais de cada participante.
        </p>
      </div>

      <button
        onClick={handleNewCustomer}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-2xl transition-all shadow-md hover:shadow-lg text-sm shrink-0 cursor-pointer"
      >
        <UserPlus className="h-4.5 w-4.5" />
        Novo Cliente
      </button>
    </div>
  );
};
