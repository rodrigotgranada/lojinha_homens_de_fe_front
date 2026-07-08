import React, { useState } from "react";
import { useSales } from "../context/SalesContext";
import { X, FileText, User, Printer, Search, CheckSquare, Square, FileSpreadsheet } from "lucide-react";

export const ExportReportModal = () => {
  const {
    sales,
    events,
    selectedEventId,
    formatCurrency,
    isExportModalOpen,
    setIsExportModalOpen,
    printCpf,
    setPrintCpf,
    printFilterByEvent,
    setPrintFilterByEvent,
    triggerPrint
  } = useSales();

  const [activeTab, setActiveTab] = useState<"event" | "customer">("event");

  if (!isExportModalOpen) return null;

  // ─── Event Stats Calculations ──────────────────────────────────────────
  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const eventName = selectedEvent ? selectedEvent.name : "Todos os Eventos";
  
  const validEventSales = sales.filter(
    (s) => s.status !== "CANCELADO" && (selectedEventId === "all" || s.eventId === selectedEventId)
  );

  const eventRevenue = validEventSales.reduce((acc, s) => acc + s.totalPrice, 0);
  const eventSalesCount = validEventSales.length;
  
  const eventItemsCount = validEventSales.reduce((acc, sale) => {
    return acc + sale.items.reduce((sum, item: any) => sum + item.quantity, 0);
  }, 0);

  // ─── Customer Search Calculations ──────────────────────────────────────
  const cleanSearchCpf = printCpf.replace(/\D/g, "");
  
  // Find valid sales matching the CPF
  const matchedCustomerSales = sales.filter((sale) => {
    const customer = sale.customerId as any;
    if (!customer) return false;
    const cpfMatch = customer.cpf.replace(/\D/g, "") === cleanSearchCpf;
    const eventMatch = !printFilterByEvent || selectedEventId === "all" || sale.eventId === selectedEventId;
    return cpfMatch && eventMatch && sale.status !== "CANCELADO";
  });

  const matchedCustomer = matchedCustomerSales[0]?.customerId as any;
  const customerName = matchedCustomer ? `${matchedCustomer.firstName} ${matchedCustomer.lastName}` : "";
  const customerTotalSpent = matchedCustomerSales.reduce((acc, s) => acc + s.totalPrice, 0);

  // CPF masking input helper
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digits = rawVal.replace(/\D/g, "");
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3)}`;
    } else if (digits.length > 6 && digits.length <= 9) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else if (digits.length > 9) {
      formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
    setPrintCpf(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in no-print">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 rounded-xl">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white">Exportação de Relatórios PDF</h3>
              <p className="text-xs text-zinc-400">Gere resumos gerenciais ou extratos detalhados de compras</p>
            </div>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 rounded-lg transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 pt-3">
          <button
            onClick={() => setActiveTab("event")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "event"
                ? "border-indigo-650 text-indigo-650 dark:text-indigo-400"
                : "border-transparent text-zinc-450 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Relatório do Evento
          </button>
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "customer"
                ? "border-indigo-650 text-indigo-650 dark:text-indigo-400"
                : "border-transparent text-zinc-450 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            <User className="h-4 w-4" />
            Extrato por CPF
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* TAB 1: EVENT SUMMARY */}
          {activeTab === "event" && (
            <div className="space-y-6">
              {/* Event Info Card */}
              <div className="bg-zinc-50 dark:bg-zinc-850/30 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-5 space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Retiro Selecionado</span>
                  <h4 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">{eventName}</h4>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Faturamento</span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white mt-1 block">
                      {formatCurrency(eventRevenue)}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Transações</span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white mt-1 block">
                      {eventSalesCount}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Itens Vendidos</span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white mt-1 block">
                      {eventItemsCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                Este relatório consolidará o faturamento geral do evento, dividindo as vendas por produto (quantidades vendidas e receita gerada por item). Ideal para fechamento de caixa do retiro.
              </div>

              {/* Print Trigger Button */}
              <button
                onClick={() => triggerPrint("event-summary")}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Printer className="h-5 w-5" />
                Imprimir Relatório de Vendas (PDF)
              </button>
            </div>
          )}

          {/* TAB 2: CUSTOMER STATEMENT (EXTRATO) */}
          {activeTab === "customer" && (
            <div className="space-y-6">
              {/* Form Input */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      maxLength={14}
                      value={printCpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-inner focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Filter Options */}
                {selectedEventId !== "all" && (
                  <button
                    onClick={() => setPrintFilterByEvent(!printFilterByEvent)}
                    className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    {printFilterByEvent ? (
                      <CheckSquare className="h-4 w-4 text-indigo-500" />
                    ) : (
                      <Square className="h-4 w-4 text-zinc-350" />
                    )}
                    Filtrar compras apenas do evento atual ({eventName})
                  </button>
                )}
              </div>

              {/* Search Result Preview */}
              {cleanSearchCpf.length === 11 ? (
                matchedCustomerSales.length > 0 ? (
                  <div className="space-y-4">
                    {/* Customer Summary Card */}
                    <div className="bg-zinc-50 dark:bg-zinc-850/30 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-4 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Cliente</span>
                        <h4 className="font-black text-zinc-900 dark:text-white text-base mt-0.5">{customerName}</h4>
                        <p className="text-[10px] text-zinc-450 font-mono mt-0.5">CPF: {printCpf}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-extrabold uppercase text-zinc-400 tracking-wider">Total Consumido</span>
                        <h4 className="font-black text-indigo-650 dark:text-indigo-400 text-lg mt-0.5">
                          {formatCurrency(customerTotalSpent)}
                        </h4>
                        <p className="text-[10px] text-zinc-450 font-semibold">{matchedCustomerSales.length} compras</p>
                      </div>
                    </div>

                    {/* Sales List Snippet */}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto border border-zinc-100 dark:border-zinc-800/50 rounded-xl divide-y divide-zinc-100 dark:divide-zinc-800/40 p-2 bg-white dark:bg-zinc-900">
                      {matchedCustomerSales.map((sale) => (
                        <div key={sale.id} className="py-2.5 px-2 flex justify-between items-center text-xs font-semibold">
                          <div>
                            <p className="text-zinc-800 dark:text-zinc-200">
                              #{sale.id.slice(-8)} — {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">
                              {sale.items.map((it: any) => `${it.quantity}x ${(it.productId as any)?.name ?? "Produto"}`).join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-zinc-950 dark:text-white">{formatCurrency(sale.totalPrice)}</p>
                            <span className={`text-[8px] font-extrabold uppercase tracking-widest ${
                              sale.status === "PAGO" ? "text-emerald-500" : "text-amber-500"
                            }`}>
                              {sale.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Print Button */}
                    <button
                      onClick={() => triggerPrint("customer-extrato")}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      <Printer className="h-5 w-5" />
                      Imprimir Extrato do Cliente (PDF)
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-450 dark:text-zinc-550 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm font-semibold">
                    Nenhuma compra ativa localizada para o CPF {printCpf}.
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-zinc-450 dark:text-zinc-550 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-semibold leading-relaxed">
                  Digite o CPF completo de 11 dígitos do cliente acima para carregar o histórico de compras.
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
