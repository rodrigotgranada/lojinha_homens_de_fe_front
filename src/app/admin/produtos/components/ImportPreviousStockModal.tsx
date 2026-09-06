"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { productService } from "@/services/productService";
import { eventService } from "@/services/eventService";
import { Event, Product } from "@/types";
import { Boxes, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface ImportPreviousStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEventId: string;
  onSuccess: () => void;
}

interface ItemRowState {
  product: Product;
  selected: boolean;
  quantityToImport: number;
  writeOffQuantity: number;
  writeOffReason: "PERDA" | "DOACAO" | "AVARIA" | "OUTRO";
  writeOffNotes: string;
}

export const ImportPreviousStockModal: React.FC<ImportPreviousStockModalProps> = ({
  isOpen,
  onClose,
  currentEventId,
  onSuccess,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedPrevEventId, setSelectedPrevEventId] = useState<string>("");
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [remainingProducts, setRemainingProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [rowStates, setRowStates] = useState<Record<string, ItemRowState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1. Carregar lista de eventos anteriores
  useEffect(() => {
    if (isOpen) {
      const fetchEvents = async () => {
        try {
          setLoadingEvents(true);
          const list = await eventService.getEvents();
          const prevEvents = list.filter((e) => e.id !== currentEventId);
          setEvents(prevEvents);
          if (prevEvents.length > 0) {
            setSelectedPrevEventId(prevEvents[0].id);
          }
        } catch (e) {
          console.error("Erro ao carregar eventos:", e);
        } finally {
          setLoadingEvents(false);
        }
      };
      fetchEvents();
    }
  }, [isOpen, currentEventId]);

  // 2. Carregar produtos com sobra do evento selecionado
  useEffect(() => {
    if (selectedPrevEventId) {
      const fetchStock = async () => {
        try {
          setLoadingProducts(true);
          setError("");
          const list = await productService.getRemainingStockFromEvent(selectedPrevEventId);
          setRemainingProducts(list);

          const initialMap: Record<string, ItemRowState> = {};
          list.forEach((p) => {
            initialMap[p.id] = {
              product: p,
              selected: true,
              quantityToImport: p.stock,
              writeOffQuantity: 0,
              writeOffReason: "PERDA",
              writeOffNotes: "",
            };
          });
          setRowStates(initialMap);
        } catch (e: any) {
          console.error("Erro ao carregar sobras:", e);
          setError(e.message || "Erro ao buscar sobras do evento.");
        } finally {
          setLoadingProducts(false);
        }
      };
      fetchStock();
    }
  }, [selectedPrevEventId]);

  const handleToggleSelect = (id: string) => {
    setRowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id]?.selected,
      },
    }));
  };

  const handleQtyChange = (id: string, newImportQty: number) => {
    const prod = rowStates[id]?.product;
    if (!prod) return;

    const clampedImport = Math.max(0, Math.min(newImportQty, prod.stock));
    const writeOff = Math.max(0, prod.stock - clampedImport);

    setRowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantityToImport: clampedImport,
        writeOffQuantity: writeOff,
      },
    }));
  };

  const handleReasonChange = (id: string, reason: "PERDA" | "DOACAO" | "AVARIA" | "OUTRO") => {
    setRowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        writeOffReason: reason,
      },
    }));
  };

  const handleSubmit = async () => {
    const selectedItems = Object.values(rowStates).filter((r) => r.selected);
    if (selectedItems.length === 0) {
      setError("Selecione pelo menos 1 item para importar.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        currentEventId,
        previousEventId: selectedPrevEventId,
        items: selectedItems.map((item) => ({
          productId: item.product.id,
          quantityToImport: item.quantityToImport,
          writeOffQuantity: item.writeOffQuantity,
          writeOffReason: item.writeOffReason,
          writeOffNotes: item.writeOffNotes,
        })),
      };

      await productService.importStockReconciliation(payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Erro ao conciliar estoque:", err);
      setError(err.message || "Falha ao processar importação.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Importar e Conciliar Sobras de Retiros Anteriores"
    >
      <div className="space-y-6">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Transfira o estoque remanescente de edições anteriores para o retiro atual. Caso a contagem física seja menor que o saldo registrado, o sistema dará baixa auditada com o motivo selecionado.
        </p>

        {/* Seletor de Evento Anterior */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Selecione o Retiro Anterior de Origem:
          </label>
          <select
            value={selectedPrevEventId}
            onChange={(e) => setSelectedPrevEventId(e.target.value)}
            disabled={loadingEvents || events.length === 0}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} ({evt.status || "ENCERRADO"})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-955/30 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Lista de Produtos com Sobra */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block">
            Produtos com Saldo Positivo ({remainingProducts.length})
          </span>

          {loadingProducts ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-zinc-400">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="text-xs font-semibold">Consultando estoque remanescente...</span>
            </div>
          ) : remainingProducts.length === 0 ? (
            <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-150 dark:border-zinc-800 text-xs text-zinc-400">
              Nenhum produto com estoque positivo encontrado no evento selecionado.
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              {remainingProducts.map((prod) => {
                const row = rowStates[prod.id] || {
                  product: prod,
                  selected: true,
                  quantityToImport: prod.stock,
                  writeOffQuantity: 0,
                  writeOffReason: "PERDA",
                  writeOffNotes: "",
                };

                return (
                  <div
                    key={prod.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      row.selected
                        ? "bg-white dark:bg-zinc-900 border-indigo-200 dark:border-indigo-900/50 shadow-xs"
                        : "bg-zinc-50/60 dark:bg-zinc-800/20 border-zinc-200/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.selected}
                          onChange={() => handleToggleSelect(prod.id)}
                          className="h-4 w-4 rounded-md text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                        />
                        <div>
                          <span className="font-bold text-xs text-zinc-900 dark:text-white block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Sobra original: <strong>{prod.stock} un.</strong> · R$ {prod.price.toFixed(2)} (Custo: R$ {(prod.costPrice || 0).toFixed(2)})
                          </span>
                        </div>
                      </label>

                      {row.selected && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-zinc-500">Trazer:</span>
                          <input
                            type="number"
                            min="0"
                            max={prod.stock}
                            value={row.quantityToImport}
                            onChange={(e) => handleQtyChange(prod.id, parseInt(e.target.value, 10) || 0)}
                            className="w-16 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-black text-center rounded-lg focus:ring-1 focus:ring-indigo-500"
                          />
                          <span className="text-[10px] text-zinc-400">unids</span>
                        </div>
                      )}
                    </div>

                    {/* Campo de Baixa Auditada caso importe menos do que a sobra */}
                    {row.selected && row.writeOffQuantity > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block">
                            ⚠️ Dar baixa em {row.writeOffQuantity} un. por:
                          </span>
                          <select
                            value={row.writeOffReason}
                            onChange={(e) => handleReasonChange(prod.id, e.target.value as any)}
                            className="w-full mt-0.5 bg-amber-50/50 dark:bg-amber-955/20 border border-amber-200 dark:border-amber-900/40 text-xs font-semibold rounded-lg p-1.5"
                          >
                            <option value="PERDA">Perda / Sumiço</option>
                            <option value="AVARIA">Avaria / Estragado</option>
                            <option value="DOACAO">Doação do Saldo</option>
                            <option value="OUTRO">Outro Motivo</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block">Observação da baixa:</span>
                          <input
                            type="text"
                            placeholder="Ex: Não encontrado na contagem física"
                            value={row.writeOffNotes}
                            onChange={(e) =>
                              setRowStates((prev) => ({
                                ...prev,
                                [prod.id]: { ...prev[prod.id], writeOffNotes: e.target.value },
                              }))
                            }
                            className="w-full mt-0.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs rounded-lg p-1.5"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            loading={submitting}
            disabled={remainingProducts.length === 0 || submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Confirmar Importação de Estoque
          </Button>
        </div>
      </div>
    </Modal>
  );
};
