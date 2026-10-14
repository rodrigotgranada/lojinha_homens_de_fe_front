"use client";

import React, { useState } from "react";
import { X, Receipt, Upload, AlertCircle, Check } from "lucide-react";
import { useCustosLoja } from "../context/CustosLojaContext";
import { uploadService } from "@/services/uploadService";

export const ModalNovaDespesaLoja: React.FC = () => {
  const { isExpenseModalOpen, setIsExpenseModalOpen, handleCreateStoreExpense, saving } = useCustosLoja();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("Caixa do Retiro");
  const [description, setDescription] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!isExpenseModalOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadService.uploadReceipt(file);
      setReceiptUrl(url);
    } catch (err: any) {
      alert(`Erro no upload: ${err?.message || "Tente novamente."}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseFloat(amount.replace(/[^\d.,]/g, "").replace(",", "."));
    if (!title.trim() || isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("Preencha o título e um valor válido.");
      return;
    }

    await handleCreateStoreExpense({
      title: title.trim(),
      amount: cleanAmount,
      paidBy: paidBy.trim() || "Caixa do Retiro",
      description: description.trim(),
      receiptUrl: receiptUrl || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in-0 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50">
                Nova Despesa Operacional da Loja
              </h3>
              <p className="text-xs text-zinc-500">Sacolas, bobinas, maquininha ou insumos</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpenseModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Título da Despesa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: 500 Sacolas personalizadas da Loja"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Valor (R$) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="R$ 150,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Pago Por
              </label>
              <input
                type="text"
                placeholder="Ex: Caixa do Retiro ou Nome do Irmão"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Observações / Detalhes
            </label>
            <textarea
              rows={2}
              placeholder="Informações adicionais do fornecedor ou nota fiscal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-800 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500 resize-none"
            />
          </div>

          {/* Comprovante */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Comprovante / Nota Fiscal
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
              {receiptUrl && (
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
              onClick={() => setIsExpenseModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar Despesa"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
