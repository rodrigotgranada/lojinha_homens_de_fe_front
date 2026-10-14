"use client";

import React, { useState, useEffect } from "react";
import { X, HandCoins, Upload, Check, AlertCircle } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";
import { uploadService } from "@/services/uploadService";

export const ModalReembolsoLoja: React.FC = () => {
  const {
    isRepaymentModalOpen,
    setIsRepaymentModalOpen,
    selectedInvestor,
    setSelectedInvestor,
    handleRepayInvestor,
    formatMoney,
    saving,
  } = useCustosLoja();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("PIX");
  const [proofUrl, setProofUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);

  const pendingBalance = selectedInvestor
    ? Math.max(0, selectedInvestor.totalInvested - selectedInvestor.totalToRepay)
    : 0;

  useEffect(() => {
    if (selectedInvestor) {
      // Suggest the full pending balance or amount to repay
      const toSuggest = selectedInvestor.totalToRepay > 0 ? selectedInvestor.totalToRepay : pendingBalance;
      setAmount(toSuggest.toFixed(2));
      setProofUrl("");
      setNotes("");
    }
  }, [selectedInvestor, pendingBalance]);

  if (!isRepaymentModalOpen || !selectedInvestor) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadService.uploadReceipt(file);
      setProofUrl(url);
    } catch (err: any) {
      alert(`Erro no upload: ${err?.message || "Tente novamente."}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseFloat(amount.replace(/[^\d.,]/g, "").replace(",", "."));
    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("Informe um valor de devolução válido.");
      return;
    }

    await handleRepayInvestor({
      amount: cleanAmount,
      method,
      proofUrl: proofUrl || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in-0 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <HandCoins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50">
                Devolução ao Investidor da Loja
              </h3>
              <p className="text-xs text-zinc-500">{selectedInvestor.sponsorName}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsRepaymentModalOpen(false);
              setSelectedInvestor(null);
            }}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Context Banner */}
        <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-zinc-400 block font-bold uppercase text-[10px]">Total Investido</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
              {formatMoney(selectedInvestor.totalInvested)}
            </span>
          </div>
          <div>
            <span className="text-zinc-400 block font-bold uppercase text-[10px]">A Devolver (Vendido)</span>
            <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
              {formatMoney(selectedInvestor.totalToRepay)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Valor a Devolver (R$) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Forma de Pagamento
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              >
                <option value="PIX">PIX</option>
                <option value="DINHEIRO">Dinheiro em Mãos</option>
                <option value="TRANSFERENCIA">Transferência Bancária</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Observações do Repasse
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Devolução parcial referente às vendas do sábado à noite..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500 resize-none"
            />
          </div>

          {/* Comprovante */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Comprovante do Pix / Recibo
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-zinc-500" />
                <span>{uploading ? "Enviando..." : "Anexar Comprovante"}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              {proofUrl && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Anexado
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-150 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setIsRepaymentModalOpen(false);
                setSelectedInvestor(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
            >
              {saving ? "Registrando..." : "Confirmar Devolução"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
