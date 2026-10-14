"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Calendar,
  ShoppingBag,
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Church,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tent,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Receipt,
  Sparkles,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { userService, UserHistoryResponse } from "@/services/userService";
import { formatCpf, formatPhone } from "@/utils/stringUtils";

interface User360ModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const User360Modal: React.FC<User360ModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"history" | "sales" | "profile">("history");
  const [data, setData] = useState<UserHistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      loadUserHistory(userId);
    } else {
      setData(null);
      setError(null);
    }
  }, [isOpen, userId]);

  const loadUserHistory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getUserHistory(id);
      setData(res);
    } catch (err: any) {
      console.error("Erro ao buscar histórico 360 do usuário:", err);
      setError(err?.message || "Não foi possível carregar o histórico do participante.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const user = data?.user;
  const participations = data?.participations || [];
  const financial = data?.financialSummary || { totalSpent: 0, totalPending: 0, totalPurchases: 0 };
  const salesByEvent = data?.salesByEvent || [];

  const openWhatsApp = () => {
    if (!user?.phone) return;
    const clean = user.phone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá ${user.firstName}, a paz de Cristo! Aqui é da coordenação do Acampamento Homens de Fé.`
    );
    window.open(`https://wa.me/55${clean}?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in-0 zoom-in-95 duration-150">
        
        {/* Header Profile Section */}
        <div className="p-6 sm:p-7 border-b border-zinc-150 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar Initial */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600 text-white font-black text-xl sm:text-2xl flex items-center justify-center shrink-0 shadow-md ring-4 ring-indigo-50 dark:ring-indigo-950/40">
                {user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : <User className="w-7 h-7" />}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/40">
                    Ficha 360° do Irmão
                  </span>
                  {user?.role === "ADMIN" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      ADMIN
                    </span>
                  )}
                  {participations.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      <Calendar className="w-3 h-3" />
                      {participations.length} {participations.length === 1 ? "Retiro" : "Retiros"}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {user ? `${user.firstName} ${user.lastName}` : "Carregando perfil..."}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
                  {user?.cpf && <span className="font-mono">CPF: {formatCpf(user.cpf)}</span>}
                  {user?.phone && <span>Tel: {formatPhone(user.phone)}</span>}
                  {user?.city && <span>• {user.city}</span>}
                  {user?.parish && <span>• {user.parish}</span>}
                </div>
              </div>
            </div>

            {/* Right Buttons: WhatsApp & Close */}
            <div className="flex items-center gap-2">
              {user?.phone && (
                <button
                  onClick={openWhatsApp}
                  title="Abrir WhatsApp"
                  className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "history"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Retiros Participados ({participations.length})
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "sales"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Consumo na Lojinha ({financial.totalPurchases})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              Ficha Médica & Pessoal
            </button>
          </div>
        </div>

        {/* Modal Body with Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
              <p className="text-sm font-semibold text-zinc-500">Consultando histórico e fichas anteriores...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-rose-800 dark:text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <div className="flex-1">
                <span className="font-bold">Aviso:</span> {error}
              </div>
              <button
                onClick={() => userId && loadUserHistory(userId)}
                className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: HISTÓRICO DE RETIROS */}
              {activeTab === "history" && (
                <div className="space-y-4">
                  {participations.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <Calendar className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        Nenhuma participação encontrada
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Este irmão ainda não tem histórico de retiros registrado no sistema.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {participations.map((part) => {
                        const isCamper = part.type === "ACAMPANTE";
                        return (
                          <div
                            key={part.id}
                            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 shadow-xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    isCamper
                                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                                      : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                                  }`}
                                >
                                  {isCamper ? <Tent className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                </div>
                                <div>
                                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-50">
                                    {part.eventName}
                                  </h3>
                                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <span>
                                      {part.submittedAt
                                        ? `Inscrito em ${new Date(part.submittedAt).toLocaleDateString("pt-BR")}`
                                        : "Inscrição antiga"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Type Badge */}
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                                    isCamper
                                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                                      : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                  }`}
                                >
                                  {isCamper ? "Acampante" : "Equipe de Trabalho"}
                                </span>

                                {/* Status Badge */}
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                    part.status === "CONFIRMADO"
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                      : part.status === "PENDENTE"
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                  }`}
                                >
                                  {part.status}
                                </span>
                              </div>
                            </div>

                            {/* Particular Details of this participation */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-100 dark:border-zinc-700/60">
                              {isCamper ? (
                                <>
                                  {part.healthRestrictions && (
                                    <div className="sm:col-span-2 p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300">
                                      <span className="font-bold block mb-0.5">Restrições / Saúde informada:</span>
                                      <span>{part.healthRestrictions}</span>
                                    </div>
                                  )}
                                  {part.weight && part.height && (
                                    <div className="text-zinc-600 dark:text-zinc-400">
                                      Físico: <strong>{part.weight} kg</strong> • <strong>{part.height} cm</strong>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  {part.preferredRoles && part.preferredRoles.length > 0 && (
                                    <div className="sm:col-span-2 text-zinc-600 dark:text-zinc-400">
                                      Equipes: <strong>{part.preferredRoles.join(", ")}</strong>
                                    </div>
                                  )}
                                  {part.willGiveTestimony && (
                                    <div className="sm:col-span-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300 font-semibold">
                                      Aceitou dar testemunho: {part.testimonyDetails || "Sim"}
                                    </div>
                                  )}
                                  {part.pastRoles && (
                                    <div className="text-zinc-600 dark:text-zinc-400">
                                      Histórico anterior: <strong>{part.pastRoles}</strong>
                                    </div>
                                  )}
                                  {part.hasTent !== undefined && (
                                    <div className="text-zinc-600 dark:text-zinc-400">
                                      Barraca própria: <strong>{part.hasTent ? "Sim" : "Não"}</strong>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CONSUMO NA LOJINHA */}
              {activeTab === "sales" && (
                <div className="space-y-6">
                  {/* Financial KPI Summary */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                        Total Pago (Vida)
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200">
                        R$ {financial.totalSpent.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1">
                        Saldo Pendente
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-200">
                        R$ {financial.totalPending.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Total de Pedidos
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                        {financial.totalPurchases}
                      </div>
                    </div>
                  </div>

                  {/* Breakdown by Event */}
                  {salesByEvent.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <ShoppingBag className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        Nenhuma compra registrada
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Este usuário ainda não realizou compras na Lojinha nos retiros.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                        Consumo Separado por Retiro
                      </h4>

                      {salesByEvent.map((group) => (
                        <div
                          key={group.eventId}
                          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-850"
                        >
                          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700/60">
                            <div>
                              <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                                {group.eventName}
                              </span>
                              <span className="text-xs text-zinc-500 ml-2">
                                ({group.salesCount} {group.salesCount === 1 ? "compra" : "compras"})
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                R$ {group.totalSpent.toFixed(2)} pago
                              </span>
                              {group.totalPending > 0 && (
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                  (R$ {group.totalPending.toFixed(2)} pendente)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {group.sales.map((sale: any) => (
                              <div
                                key={sale._id}
                                className="p-3.5 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                                      Pedido #{sale._id.slice(-6).toUpperCase()}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        sale.status === "PAGO"
                                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                      }`}
                                    >
                                      {sale.status}
                                    </span>
                                    <span className="text-zinc-400">
                                      {new Date(sale.createdAt).toLocaleDateString("pt-BR")}{" "}
                                      {new Date(sale.createdAt).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>

                                  {/* Items summary */}
                                  <div className="text-zinc-500 dark:text-zinc-400">
                                    {sale.items?.map((it: any) => `${it.quantity}x ${it.productId?.name || "Produto"}`).join(", ") || "Itens da lojinha"}
                                  </div>
                                </div>

                                <div className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 shrink-0">
                                  R$ {(sale.totalPrice || 0).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: FICHA MÉDICA E CADASTRAL */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400 mb-2">
                      Informações Cadastrais Completas
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">Nome Completo:</span>
                        <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">CPF:</span>
                        <span className="font-mono font-bold">{formatCpf(user?.cpf || "")}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">WhatsApp / Celular:</span>
                        <span className="font-bold">{formatPhone(user?.phone || "")}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">E-mail:</span>
                        <span>{user?.email || "Não informado"}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">Cidade:</span>
                        <span className="font-semibold">{user?.city || "Não informado"}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                        <span className="text-zinc-500">Paróquia / Igreja:</span>
                        <span className="font-semibold">{user?.parish || "Não informada"}</span>
                      </div>
                      {user?.birthDate && (
                        <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                          <span className="text-zinc-500">Data de Nascimento:</span>
                          <span className="font-semibold">
                            {new Date(user.birthDate).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      )}
                      {user?.createdAt && (
                        <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-700/40 pb-2">
                          <span className="text-zinc-500">Primeiro Cadastro:</span>
                          <span className="text-zinc-500">
                            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Most recent health restrictions reported */}
                  <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-extrabold text-sm">
                      <HeartPulse className="w-4 h-4" />
                      Restrições de Saúde, Alergias e Cuidados Médicos
                    </div>
                    <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed">
                      {participations.find((p) => p.healthRestrictions)?.healthRestrictions ||
                        "Nenhuma restrição de saúde ou alergia declarada nas fichas."}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-xs"
          >
            Fechar Ficha 360°
          </button>
        </div>

      </div>
    </div>
  );
};
