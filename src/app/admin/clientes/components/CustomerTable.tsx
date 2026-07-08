import React, { useState } from "react";
import { useCustomers } from "../context/CustomerContext";
import { ShoppingCart, Edit, Trash2, RotateCcw, ArrowUp, ArrowDown, ArrowUpDown, X, AlertTriangle, Check, Search } from "lucide-react";
import { User } from "@/hooks/useApi";

export const CustomerTable = () => {
  const {
    filteredCustomers,
    setSelectedCustomer,
    setIsHistoryModalOpen,
    setCustomerToEdit,
    setIsAddEditModalOpen,
    
    // Tabs & sorting variables
    activeTab,
    sortField,
    sortDirection,
    handleSort,
    toggleCustomerStatus,

    // Search and filter variables
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter
  } = useCustomers();

  // Local states for status toggle confirmation
  const [customerToToggle, setCustomerToToggle] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toggling, setToggling] = useState(false);

  const formatCpf = (cpf: string) => {
    const clean = cpf.replace(/\D/g, "");
    if (clean.length !== 11) return cpf;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
  };

  const formatPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length === 11) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
    }
    if (clean.length === 10) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6, 10)}`;
    }
    return phone;
  };

  const renderSortableHeader = (field: string, label: string) => {
    const isCurrent = sortField === field;
    return (
      <th
        onClick={() => handleSort(field)}
        className="py-4 px-6 cursor-pointer select-none hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors group"
      >
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
          {isCurrent ? (
            sortDirection === "asc" ? (
              <ArrowUp className="h-3.5 w-3.5 text-indigo-655 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-indigo-655 text-indigo-600 dark:text-indigo-400" />
            )
          ) : (
            <ArrowUpDown className="h-3.5 w-3.5 opacity-30 group-hover:opacity-80" />
          )}
        </div>
      </th>
    );
  };

  const openConfirmToggle = (customer: User) => {
    setCustomerToToggle(customer);
    setIsConfirmOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!customerToToggle) return;
    try {
      setToggling(true);
      await toggleCustomerStatus(customerToToggle);
      setIsConfirmOpen(false);
      setCustomerToToggle(null);
    } catch (err) {
      console.error("Failed to toggle customer status", err);
    } finally {
      setToggling(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
        {/* Integrated Search and Role Filters Strip */}
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input Box */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, e-mail ou CPF..."
              className="w-full pl-8 pr-8 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Role Pill Buttons Group */}
          <div className="flex gap-1.5 overflow-x-auto self-start md:self-auto shrink-0 pb-1 md:pb-0 scrollbar-none">
            {[
              { key: "all", label: "Todos os Cargos" },
              { key: "user", label: "Clientes" },
              { key: "admin", label: "Administradores" }
            ].map((role) => (
              <button
                key={role.key}
                onClick={() => setRoleFilter(role.key)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer whitespace-nowrap ${
                  roleFilter === role.key
                    ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950 shadow-xs"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/80 text-zinc-400 text-xs font-extrabold uppercase tracking-wider">
                {renderSortableHeader("name", "Nome Completo")}
                {renderSortableHeader("cpf", "CPF")}
                {renderSortableHeader("phone", "Telefone")}
                {renderSortableHeader("email", "E-mail")}
                {renderSortableHeader("role", "Cargo")}
                {renderSortableHeader("spent", "Total Gasto")}
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-zinc-450 dark:text-zinc-500 font-semibold text-sm">
                    Nenhum cliente ou administrador localizado para estes critérios nesta aba.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const fullName = `${customer.firstName} ${customer.lastName}`;

                  return (
                    <tr key={customer.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20 text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all">
                      <td className="py-4 px-6 font-bold text-zinc-900 dark:text-white">{fullName}</td>
                      <td className="py-4 px-6 font-mono text-zinc-505 dark:text-zinc-400 text-xs">{formatCpf(customer.cpf)}</td>
                      <td className="py-4 px-6 text-zinc-550 dark:text-zinc-400">{formatPhone(customer.phone)}</td>
                      <td className="py-4 px-6 text-zinc-450 dark:text-zinc-500 text-xs truncate max-w-[180px]">
                        {customer.email || <span className="italic text-zinc-300 dark:text-zinc-700">Não informado</span>}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                          customer.role === "ADMIN"
                            ? "bg-indigo-50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30"
                            : "bg-zinc-50 dark:bg-zinc-850/30 text-zinc-500 dark:text-zinc-455 border-zinc-150 dark:border-zinc-800"
                        }`}>
                          {customer.role === "ADMIN" ? "Admin" : "Cliente"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-black text-zinc-950 dark:text-white">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL"
                        }).format((customer as any).spent || 0)}
                      </td>
                      <td className="py-4 px-6 text-right flex items-center justify-end gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setCustomerToEdit(customer);
                            setIsAddEditModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-550 dark:text-zinc-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                          title="Editar participante"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        {/* History Button */}
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsHistoryModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                          title="Ver histórico de compras"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>

                        {/* Soft Delete / Toggle Active Status */}
                        {activeTab === "active" ? (
                          <button
                            onClick={() => openConfirmToggle(customer)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-955/35 text-rose-600 dark:text-rose-450 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Inativar participante"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => openConfirmToggle(customer)}
                            className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-955/35 text-emerald-600 dark:text-emerald-450 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Reativar participante"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Activation/Deactivation Confirmation Modal */}
      {isConfirmOpen && customerToToggle && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 max-w-md w-full rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsConfirmOpen(false);
                setCustomerToToggle(null);
              }}
              className="absolute right-4 top-4 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-400 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                customerToToggle.active === false
                  ? "bg-emerald-50 dark:bg-emerald-955/20 text-emerald-500"
                  : "bg-rose-50 dark:bg-rose-955/20 text-rose-500"
              }`}>
                {customerToToggle.active === false ? <RotateCcw className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
              </div>
              <h3 className="text-xl font-black text-zinc-955 dark:text-white">
                {customerToToggle.active === false ? "Reativar Participante?" : "Inativar Participante?"}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {customerToToggle.active === false
                  ? `Deseja reativar o participante "${customerToToggle.firstName} ${customerToToggle.lastName}"? Ele voltará a ficar disponível e ativo para efetuar compras no PDV.`
                  : `Deseja inativar o participante "${customerToToggle.firstName} ${customerToToggle.lastName}"? Ele não poderá ser selecionado no PDV nem fazer compras até ser reativado.`
                }
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsConfirmOpen(false);
                  setCustomerToToggle(null);
                }}
                disabled={toggling}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmToggle}
                disabled={toggling}
                className={`flex-1 flex items-center justify-center gap-1.5 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer ${
                  customerToToggle.active === false
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {toggling ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4.5 w-4.5" />
                    <span>{customerToToggle.active === false ? "Reativar" : "Inativar"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
