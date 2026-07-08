import React from "react";
import { useSales } from "../context/SalesContext";
import { X, Trash2, CheckCircle } from "lucide-react";

export const SalesModals = () => {
  const {
    saleToCancel,
    setSaleToCancel,
    isCancelModalOpen,
    setIsCancelModalOpen,
    canceling,
    handleCancelSale,
    saleToPay,
    setSaleToPay,
    isPayModalOpen,
    setIsPayModalOpen,
    paying,
    handlePaySale,
    formatCurrency
  } = useSales();

  return (
    <>
      {/* Cancellation Confirmation Modal */}
      {isCancelModalOpen && saleToCancel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 max-w-md w-full rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCancelModalOpen(false);
                setSaleToCancel(null);
              }}
              className="absolute right-4 top-4 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 flex items-center justify-center">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-zinc-955 dark:text-white">Desfazer esta venda?</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Ao confirmar, todos os itens comprados voltarão imediatamente ao estoque e o dinheiro será deduzido do caixa do evento.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-850/50 rounded-2xl p-4 text-xs font-bold text-zinc-700 dark:text-zinc-300 space-y-1 text-center">
              <p>Código: <span className="font-mono text-zinc-400">#{saleToCancel.id.slice(-8)}</span></p>
              <p>Total do Estorno: <span className="text-rose-500 font-extrabold">{formatCurrency(saleToCancel.totalPrice)}</span></p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setSaleToCancel(null);
                }}
                disabled={canceling}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm"
              >
                Voltar
              </button>
              <button
                onClick={handleCancelSale}
                disabled={canceling}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md flex items-center justify-center gap-1.5"
              >
                {canceling ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Estornando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Confirmar Estorno</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Confirmation Modal */}
      {isPayModalOpen && saleToPay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 max-w-md w-full rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsPayModalOpen(false);
                setSaleToPay(null);
              }}
              className="absolute right-4 top-4 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-505 flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-zinc-950 dark:text-white">Marcar como Pago?</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Confirme se o pagamento desta conta pendente/ficha foi devidamente recebido em dinheiro ou cartão. O caixa do evento será atualizado.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-850/50 rounded-2xl p-4 text-xs font-bold text-zinc-700 dark:text-zinc-300 space-y-1 text-center">
              <p>Código: <span className="font-mono text-zinc-400">#{saleToPay.id.slice(-8)}</span></p>
              <p>Total a Receber: <span className="text-emerald-600 font-extrabold">{formatCurrency(saleToPay.totalPrice)}</span></p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsPayModalOpen(false);
                  setSaleToPay(null);
                }}
                disabled={paying}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm"
              >
                Voltar
              </button>
              <button
                onClick={handlePaySale}
                disabled={paying}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md flex items-center justify-center gap-1.5"
              >
                {paying ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Atualizando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Confirmar Pagamento</span>
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
