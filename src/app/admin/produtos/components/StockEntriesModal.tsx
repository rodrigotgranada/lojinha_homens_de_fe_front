"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CpfSearchSelect } from "@/components/ui/CpfSearchSelect";
import { QuickUserModal } from "@/components/QuickUserModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import {
  Boxes,
  PackagePlus,
  Plus,
  Trash2,
  HeartHandshake,
  Calendar,
  AlertCircle,
  X,
  FileText,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useApi, Product, StockEntry } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";

interface StockEntriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onStockUpdated?: () => void;
}

export const StockEntriesModal: React.FC<StockEntriesModalProps> = ({
  isOpen,
  onClose,
  product,
  onStockUpdated,
}) => {
  const api = useApi();
  const { currentUser, activeEvent } = useApp();

  const [entries, setEntries] = useState<StockEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Form State
  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorCpf, setSponsorCpf] = useState("");
  const [sponsorPhone, setSponsorPhone] = useState("");
  const [sponsorUserId, setSponsorUserId] = useState("");
  const [isDonation, setIsDonation] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Quick user creation
  const [isQuickUserOpen, setIsQuickUserOpen] = useState(false);
  const [quickCpf, setQuickCpf] = useState("");

  // Delete confirmation
  const [entryToDelete, setEntryToDelete] = useState<StockEntry | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch entries for this product
  const fetchEntries = useCallback(async () => {
    if (!product?.id) return;
    setLoading(true);
    try {
      const data = await api.getStockEntriesByProduct(product.id);
      setEntries(data || []);
    } catch (err) {
      console.error("Erro ao carregar entradas de estoque:", err);
    } finally {
      setLoading(false);
    }
  }, [api, product?.id]);

  useEffect(() => {
    if (isOpen && product) {
      fetchEntries();
      setShowAddForm(false);
      resetForm();
    }
  }, [isOpen, product, fetchEntries]);

  const resetForm = () => {
    setQuantity("");
    setUnitCost("");
    setSponsorName("");
    setSponsorCpf("");
    setSponsorPhone("");
    setSponsorUserId("");
    setIsDonation(false);
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setFormError("");
  };

  // Calculations
  const quantityNum = parseInt(quantity, 10) || 0;
  const unitCostNum = parseFloat(unitCost.replace(/\./g, "").replace(",", ".")) || 0;
  const calculatedTotalCost = quantityNum * unitCostNum;

  const totalEntriesQuantity = useMemo(
    () => entries.reduce((acc, e) => acc + (e.quantity || 0), 0),
    [entries]
  );

  const totalInvestedAmount = useMemo(
    () =>
      entries
        .filter((e) => !e.isDonation)
        .reduce((acc, e) => acc + (e.totalCost || 0), 0),
    [entries]
  );

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;

    if (quantityNum <= 0) {
      setFormError("Informe uma quantidade válida de pelo menos 1 unidade.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const operatorName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : "Admin";

      await api.createStockEntry({
        productId: product.id,
        eventId: activeEvent?.id || product.eventId,
        quantity: quantityNum,
        costPrice: isDonation ? 0 : unitCostNum,
        totalCost: isDonation ? 0 : calculatedTotalCost,
        sponsorName: sponsorName.trim(),
        sponsorCpf: sponsorCpf.trim(),
        sponsorPhone: sponsorPhone.trim(),
        sponsorUserId: sponsorUserId || undefined,
        isDonation,
        date,
        notes: notes.trim(),
        operatorName,
        createdBy: currentUser?.id,
      });

      resetForm();
      setShowAddForm(false);
      await fetchEntries();
      if (onStockUpdated) onStockUpdated();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao registrar entrada de estoque.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;
    setDeleting(true);
    try {
      const operatorName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : "Admin";

      await api.deleteStockEntry(entryToDelete.id || (entryToDelete as unknown as { _id: string })._id, operatorName);
      setEntryToDelete(null);
      await fetchEntries();
      if (onStockUpdated) onStockUpdated();
    } catch (err) {
      console.error("Erro ao excluir entrada de estoque:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        title="Entradas de Estoque e Lotes de Patrocinadores"
      >
        <div className="flex flex-col gap-6">
          {/* Header do Produto com Métricas de Estoque */}
          <div className="p-4 bg-gradient-to-r from-zinc-50 to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-950/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex items-center justify-center shrink-0">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Boxes className="h-6 w-6 text-zinc-400" />
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-950 dark:text-white">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Venda: R$ {product.price.toFixed(2)}
                  </span>
                  {product.category && (
                    <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Badges de Estoque e Custo */}
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-zinc-800/90 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-xs text-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Estoque Atual
                </span>
                <span
                  className={`text-lg font-black ${
                    product.stock <= (product.minStock ?? 5)
                      ? "text-red-600 dark:text-red-400"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {product.stock} un.
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-800/90 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-xs text-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Total Entradas
                </span>
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                  {totalEntriesQuantity} un.
                </span>
              </div>
            </div>
          </div>

          {/* Botão de Adicionar / Toggle Form */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Boxes className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Histórico de Lotes Registrados ({entries.length})
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cada entrada representa um lote comprado por um irmão ou doado para o retiro.
              </p>
            </div>

            {!showAddForm && (
              <Button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-1.5 text-xs font-bold py-2 px-3.5"
              >
                <Plus className="h-4 w-4" />
                Nova Entrada
              </Button>
            )}
          </div>

          {/* Formulário de Adicionar Nova Entrada */}
          {showAddForm && (
            <form
              onSubmit={handleCreateEntry}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-150 dark:border-indigo-900/40 rounded-2xl p-5 flex flex-col gap-4 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <PackagePlus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Registrar Entrada de Mercadoria / Novo Lote
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}

              {/* Quantidade e Custo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Quantidade de Itens no Lote *"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex: 20"
                  type="number"
                  min="1"
                  required
                />

                <div className="flex flex-col">
                  <Input
                    label="Custo Unitário (R$)"
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                    placeholder="Ex: 35,00"
                    type="text"
                    disabled={isDonation}
                  />
                  {quantityNum > 0 && unitCostNum > 0 && !isDonation && (
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-1 ml-1">
                      Custo Total do Lote: R$ {calculatedTotalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>

              {/* Patrocinador / Quem financiou */}
              <div className="flex flex-col gap-2 p-3.5 bg-white dark:bg-zinc-900/90 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <HeartHandshake className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Quem comprou / financiou este lote?
                </span>

                <CpfSearchSelect
                  label="Buscar Irmão / Financiador (CPF ou Nome)"
                  id="stock-entry-sponsor-cpf"
                  placeholder="Digite o CPF ou Nome..."
                  value={sponsorCpf}
                  onChange={(newCpf, selectedUser) => {
                    setSponsorCpf(newCpf);
                    if (selectedUser) {
                      setSponsorName(`${selectedUser.firstName} ${selectedUser.lastName}`);
                      setSponsorPhone(selectedUser.phone || "");
                      setSponsorUserId(selectedUser.id);
                    } else if (!newCpf) {
                      setSponsorName("");
                      setSponsorPhone("");
                      setSponsorUserId("");
                    }
                  }}
                  onAddNewUser={(typedCpf) => {
                    setQuickCpf(typedCpf);
                    setIsQuickUserOpen(true);
                  }}
                />

                {sponsorName && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                        Irmão Vinculado
                      </span>
                      <span className="text-xs font-black text-zinc-950 dark:text-emerald-100">
                        {sponsorName} {sponsorPhone ? `(${sponsorPhone})` : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Doação Switch */}
              <div className="flex items-center justify-between bg-white dark:bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Este lote foi uma Doação Gratuita?
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Se marcado, o custo será R$ 0,00 e nenhum valor será devido de reembolso.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDonation}
                    onChange={(e) => setIsDonation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-zinc-300 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>

              {/* Data e Observações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Data da Entrada / Compra"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />

                <Input
                  label="Observações / Nota Fiscal (Opcional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: NF 1045, compra na fábrica do centro"
                />
              </div>

              {/* Ações do Form */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-xs py-2 px-3.5 cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="text-xs font-bold py-2 px-4 cursor-pointer flex items-center gap-1.5"
                >
                  {submitting ? "Registrando..." : "Confirmar Entrada"}
                </Button>
              </div>
            </form>
          )}

          {/* Lista de Entradas Cadastradas */}
          {loading ? (
            <div className="py-12 text-center text-zinc-400 text-xs font-semibold">
              Carregando lotes de estoque...
            </div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400">
              <Boxes className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Nenhum lote registrado para este produto ainda.
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Clique em &quot;Nova Entrada&quot; acima para registrar a chegada de mercadorias e associar a um patrocinador.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {entries.map((entry) => {
                const entryId = entry.id || (entry as unknown as { _id: string })._id;
                const dateFormatted = entry.date
                  ? new Date(entry.date).toLocaleDateString("pt-BR")
                  : "-";

                return (
                  <div
                    key={entryId}
                    className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        +{entry.quantity}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black text-zinc-900 dark:text-white">
                            {entry.sponsorName || "Fundo Próprio / Retiro"}
                          </span>

                          {entry.isDonation ? (
                            <span className="text-[9px] font-extrabold uppercase bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-800/40">
                              Doação (Sem Reembolso)
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                              Reembolsável
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="h-3 w-3" />
                            {dateFormatted}
                          </span>

                          {!entry.isDonation && (
                            <span>
                              Custo Unit: <b>R$ {entry.costPrice?.toFixed(2) || "0.00"}</b> · Total:{" "}
                              <b className="text-zinc-800 dark:text-zinc-200">
                                R$ {entry.totalCost?.toFixed(2) || "0.00"}
                              </b>
                            </span>
                          )}

                          {entry.operatorName && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {entry.operatorName}
                            </span>
                          )}
                        </div>

                        {entry.notes && (
                          <p className="text-[10px] text-zinc-400 italic">
                            Obs: {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Botão de Excluir */}
                    <div className="flex items-center self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setEntryToDelete(entry)}
                        className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                        title="Remover lote"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="text-xs py-2 px-4 cursor-pointer"
            >
              Fechar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Cadastro Rápido de Irmão / Financiador */}
      <QuickUserModal
        isOpen={isQuickUserOpen}
        onClose={() => setIsQuickUserOpen(false)}
        cpf={quickCpf}
        onSuccess={(newUser) => {
          setSponsorCpf(newUser.cpf);
          setSponsorName(`${newUser.firstName} ${newUser.lastName}`);
          setSponsorPhone(newUser.phone || "");
          setSponsorUserId(newUser.id);
          setIsQuickUserOpen(false);
        }}
      />

      {/* Confirmação de Exclusão de Lote */}
      <ConfirmModal
        isOpen={!!entryToDelete}
        onClose={() => setEntryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Remover Lote de Estoque?"
        message={`Deseja realmente remover esta entrada de ${entryToDelete?.quantity} unidades do produto "${product.name}"? O estoque em prateleira e os custos correspondentes serão abatidos.`}
        confirmText="Sim, Remover Lote"
        cancelText="Voltar"
        variant="danger"
        isLoading={deleting}
      />
    </>
  );
};
