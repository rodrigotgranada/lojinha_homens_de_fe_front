"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { RepaymentRecord } from "@/types";
import { Calendar, DollarSign, UserCheck, Paperclip } from "lucide-react";

interface RepaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemDescription: string;
  payerName: string;
  totalAmount: number;
  repaidAmount: number;
  history: RepaymentRecord[];
  formatMoney: (val: number) => string;
}

export const RepaymentHistoryModal: React.FC<RepaymentHistoryModalProps> = ({
  isOpen,
  onClose,
  itemDescription,
  payerName,
  totalAmount,
  repaidAmount,
  history,
  formatMoney,
}) => {
  const pending = Math.max(0, totalAmount - repaidAmount);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Extrato de Parcelas de Reembolso"
    >
      <div className="space-y-4">
        <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-1.5">
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">
            {payerName}
          </span>
          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">
            {itemDescription}
          </h4>
          <div className="flex justify-between text-xs pt-1 border-t border-zinc-200 dark:border-zinc-700">
            <span>Total: <strong>{formatMoney(totalAmount)}</strong></span>
            <span>Devolvido: <strong className="text-emerald-600">{formatMoney(repaidAmount)}</strong></span>
            <span>Pendente: <strong className="text-amber-600">{formatMoney(pending)}</strong></span>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {history.length === 0 ? (
            <p className="text-xs text-zinc-400 italic py-6 text-center">
              Nenhuma parcela registrada no histórico deste item.
            </p>
          ) : (
            history.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl flex items-center justify-between shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                    {formatMoney(rec.amount)} via {rec.method}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(rec.date).toLocaleDateString("pt-BR")}
                    </span>
                    {rec.operatorName && (
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        {rec.operatorName}
                      </span>
                    )}
                  </div>
                </div>

                {rec.proofUrl && (
                  <a
                    href={rec.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Paperclip className="h-3.5 w-3.5" />
                    Comprovante
                  </a>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
