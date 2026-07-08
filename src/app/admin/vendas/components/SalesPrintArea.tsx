import React from "react";
import { useSales } from "../context/SalesContext";

export const SalesPrintArea = () => {
  const {
    sales,
    events,
    selectedEventId,
    printType,
    printCpf,
    printFilterByEvent,
    formatCurrency
  } = useSales();

  if (!printType) return null;

  const todayStr = new Date().toLocaleString("pt-BR");
  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const eventName = selectedEvent ? selectedEvent.name : "Todos os Eventos";

  // ─── Event Summary Compilation ─────────────────────────────────────────
  const validEventSales = sales.filter(
    (s) => s.status !== "CANCELADO" && (selectedEventId === "all" || s.eventId === selectedEventId)
  );

  const eventRevenue = validEventSales.reduce((acc, s) => acc + s.totalPrice, 0);
  const eventPaidRevenue = validEventSales
    .filter((s) => s.status === "PAGO")
    .reduce((acc, s) => acc + s.totalPrice, 0);
  const eventPendingRevenue = validEventSales
    .filter((s) => s.status === "PENDENTE")
    .reduce((acc, s) => acc + s.totalPrice, 0);

  const eventSalesCount = validEventSales.length;
  const eventPaidCount = validEventSales.filter((s) => s.status === "PAGO").length;
  const eventPendingCount = validEventSales.filter((s) => s.status === "PENDENTE").length;

  const eventItemsCount = validEventSales.reduce((acc, sale) => {
    return acc + sale.items.reduce((sum, item: any) => sum + item.quantity, 0);
  }, 0);

  // Group by product
  const productBreakdown: Record<string, { name: string; quantity: number; revenue: number }> = {};
  validEventSales.forEach((sale) => {
    sale.items.forEach((item: any) => {
      const product = item.productId;
      const prodId = product?.id || product || "unknown";
      const name = product?.name || "Produto Removido";
      if (!productBreakdown[prodId]) {
        productBreakdown[prodId] = { name, quantity: 0, revenue: 0 };
      }
      productBreakdown[prodId].quantity += item.quantity;
      productBreakdown[prodId].revenue += item.quantity * item.priceAtPurchase;
    });
  });

  const productsList = Object.values(productBreakdown).sort((a, b) => b.revenue - a.revenue);

  // ─── Customer Extrato Compilation ──────────────────────────────────────
  const cleanSearchCpf = printCpf.replace(/\D/g, "");
  const customerSales = sales.filter((sale) => {
    const customer = sale.customerId as any;
    if (!customer) return false;
    const cpfMatch = customer.cpf.replace(/\D/g, "") === cleanSearchCpf;
    const eventMatch = !printFilterByEvent || selectedEventId === "all" || sale.eventId === selectedEventId;
    return cpfMatch && eventMatch && sale.status !== "CANCELADO";
  });

  const matchedCustomer = customerSales[0]?.customerId as any;
  const customerName = matchedCustomer ? `${matchedCustomer.firstName} ${matchedCustomer.lastName}` : "Consumidor";
  const customerTotalSpent = customerSales.reduce((acc, s) => acc + s.totalPrice, 0);
  const customerTotalPaid = customerSales
    .filter((s) => s.status === "PAGO")
    .reduce((acc, s) => acc + s.totalPrice, 0);
  const customerTotalPending = customerSales
    .filter((s) => s.status === "PENDENTE")
    .reduce((acc, s) => acc + s.totalPrice, 0);

  return (
    <div className="hidden print:block bg-white text-black p-8 max-w-4xl mx-auto font-sans leading-normal">
      {/* ⛪ Print Header */}
      <div className="flex justify-between items-center border-b-2 border-zinc-900 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight uppercase flex items-center gap-2">
            <span>⛪</span> Lojinha Homens de Fé
          </h1>
          <p className="text-xs text-zinc-500 font-bold tracking-wider mt-0.5">
            SISTEMA DE GESTÃO DE RETIROS ESPIRITUAIS
          </p>
        </div>
        <div className="text-right text-xs text-zinc-500">
          <p className="font-bold">Data de Emissão</p>
          <p className="font-mono mt-0.5">{todayStr}</p>
        </div>
      </div>

      {/* ─── CASE 1: EVENT SUMMARY REPORT ─── */}
      {printType === "event-summary" && (
        <div className="space-y-8">
          {/* Report Title */}
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-black uppercase tracking-wide border-b border-zinc-200 pb-2">
              Relatório Consolidado de Vendas
            </h2>
            <p className="text-sm font-bold text-zinc-600">
              Retiro: <span className="text-zinc-900">{eventName}</span>
            </p>
          </div>

          {/* Metrics Summary Grid */}
          <div className="grid grid-cols-3 gap-6 border-b border-t border-zinc-200 py-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-450 tracking-wider">Faturamento do Evento</span>
              <div className="space-y-0.5">
                <span className="text-2xl font-black">{formatCurrency(eventRevenue)}</span>
                <div className="text-[10px] text-zinc-500 font-semibold space-y-0.5">
                  <p>Confirmado (Pago): {formatCurrency(eventPaidRevenue)} ({eventPaidCount} ordens)</p>
                  <p>Em aberto (Fiado): {formatCurrency(eventPendingRevenue)} ({eventPendingCount} ordens)</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-450 tracking-wider">Volume de Cupons</span>
              <div className="space-y-0.5">
                <span className="text-2xl font-black">{eventSalesCount}</span>
                <p className="text-[10px] text-zinc-500 font-semibold">Total de cupons emitidos no caixa</p>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-450 tracking-wider">Total de Itens Vendidos</span>
              <div className="space-y-0.5">
                <span className="text-2xl font-black">{eventItemsCount} unidades</span>
                <p className="text-[10px] text-zinc-500 font-semibold">Volume acumulado de saída de estoque</p>
              </div>
            </div>
          </div>

          {/* Products Breakdown Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-450">Faturamento Detalhado por Produto</h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-zinc-800 text-zinc-600 font-extrabold uppercase">
                  <th className="py-2.5">Descrição do Produto</th>
                  <th className="py-2.5 text-center">Quantidade Vendida</th>
                  <th className="py-2.5 text-right">Faturamento Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {productsList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-zinc-450 italic">
                      Nenhum item vendido registrado para este evento.
                    </td>
                  </tr>
                ) : (
                  productsList.map((prod, idx) => (
                    <tr key={idx} className="font-semibold text-zinc-800">
                      <td className="py-3 font-bold">{prod.name}</td>
                      <td className="py-3 text-center">{prod.quantity}x</td>
                      <td className="py-3 text-right font-bold text-zinc-950">{formatCurrency(prod.revenue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── CASE 2: CUSTOMER STATEMENT REPORT ─── */}
      {printType === "customer-extrato" && (
        <div className="space-y-8">
          {/* Report Title */}
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-black uppercase tracking-wide border-b border-zinc-200 pb-2">
              Extrato Detalhado de Compras do Cliente
            </h2>
            <p className="text-sm font-bold text-zinc-650">
              Retiro de Referência: <span className="text-zinc-900">{printFilterByEvent ? eventName : "Todos os Eventos"}</span>
            </p>
          </div>

          {/* Customer Metadata and Statement summary */}
          <div className="grid grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
            <div className="space-y-2">
              <div>
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Nome do Retirante</span>
                <p className="text-base font-black text-zinc-900 mt-0.5">{customerName}</p>
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Documento (CPF)</span>
                <p className="text-sm font-bold text-zinc-800 font-mono mt-0.5">{printCpf}</p>
              </div>
            </div>
            <div className="space-y-2 border-l border-zinc-250 pl-6">
              <div>
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Total Consumido Acumulado</span>
                <p className="text-2xl font-black text-indigo-650 mt-0.5">{formatCurrency(customerTotalSpent)}</p>
              </div>
              <div className="text-[10px] text-zinc-500 font-bold space-y-0.5 mt-2">
                <p className="text-emerald-600">Total Pago: {formatCurrency(customerTotalPaid)}</p>
                <p className="text-amber-600">Total Fiado (Pendente): {formatCurrency(customerTotalPending)}</p>
              </div>
            </div>
          </div>

          {/* Purchase Coupons History Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-450">Histórico de Cupons Emitidos</h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-zinc-800 text-zinc-650 font-extrabold uppercase">
                  <th className="py-2.5">Data/Hora</th>
                  <th className="py-2.5">Cupom ID</th>
                  <th className="py-2.5">Lista de Itens</th>
                  <th className="py-2.5 text-center">Status</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {customerSales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-zinc-450 italic">
                      Nenhuma compra encontrada para este CPF no período selecionado.
                    </td>
                  </tr>
                ) : (
                  customerSales.map((sale, idx) => {
                    const dateStr = new Date(sale.createdAt).toLocaleString("pt-BR");
                    const itemsStr = sale.items
                      .map((it: any) => `${it.quantity}x ${(it.productId as any)?.name ?? "Produto"}`)
                      .join(", ");

                    return (
                      <tr key={idx} className="font-semibold text-zinc-800">
                        <td className="py-3 text-zinc-600">{dateStr}</td>
                        <td className="py-3 font-mono text-[10px] text-zinc-500">#{sale.id.slice(-8)}</td>
                        <td className="py-3 font-bold max-w-[250px] truncate" title={itemsStr}>
                          {itemsStr}
                        </td>
                        <td className="py-3 text-center">
                          <span className={`text-[9px] font-extrabold uppercase tracking-wide ${
                            sale.status === "PAGO" ? "text-emerald-600" : "text-amber-600"
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-zinc-950">
                          {formatCurrency(sale.totalPrice)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📄 Print Footer Disclaimer */}
      <div className="border-t border-zinc-200 mt-12 pt-4 text-center text-[10px] text-zinc-450 font-semibold space-y-1">
        <p>Lojinha Virtual Retiros — Documento para controle interno pastoral.</p>
        <p className="font-mono text-[9px] text-zinc-400">ID de Auditoria do Relatório: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
      </div>
    </div>
  );
};
