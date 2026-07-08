import React from "react";
import { useCustomers } from "../context/CustomerContext";
import { Search } from "lucide-react";

export const CustomerSearch = () => {
  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter
  } = useCustomers();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <Search className="h-4.5 w-4.5" />
        </span>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou CPF..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        {["all", "user", "admin"].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider ${
              roleFilter === role
                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850"
            }`}
          >
            {role === "all" ? "Todos os Cargos" : role === "user" ? "Clientes" : "Administradores"}
          </button>
        ))}
      </div>
    </div>
  );
};
