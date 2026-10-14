"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import {
  inscriptionService,
  InscriptionParticipant,
} from "@/services/inscriptionService";
import { formatCpf, formatPhone } from "@/utils/stringUtils";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MessageCircle,
  Users,
  Briefcase,
  Tent,
  HeartPulse,
  Sparkles,
  Calendar,
  X,
  Filter,
  Check,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function AdminInscricoesPage() {
  const { currentUser, activeEvent } = useApp();

  const [inscriptions, setInscriptions] = useState<InscriptionParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "ACAMPANTE" | "TRABALHO">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDENTE" | "CONFIRMADO" | "CANCELADO">("ALL");

  // Selected Detail Modal
  const [selectedItem, setSelectedItem] = useState<InscriptionParticipant | null>(null);

  // Action Loading
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inscriptionService.getInscriptions({
        eventId: activeEvent?.id,
      });
      setInscriptions(data);
    } catch (err: any) {
      console.error("Erro ao buscar inscrições:", err);
      setError(err?.message || "Erro ao carregar inscrições.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, [activeEvent?.id]);

  const handleConfirm = async (item: InscriptionParticipant) => {
    try {
      setActionLoadingId(item._id || item.id);
      const updated = await inscriptionService.confirmInscription(
        item._id || item.id,
        currentUser?.firstName || "Admin"
      );
      setInscriptions((prev) =>
        prev.map((i) => ((i._id || i.id) === (item._id || item.id) ? updated : i))
      );
      if (selectedItem && (selectedItem._id || selectedItem.id) === (item._id || item.id)) {
        setSelectedItem(updated);
      }
    } catch (err: any) {
      alert(`Erro ao confirmar: ${err?.message || "Tente novamente."}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCancel = async (item: InscriptionParticipant) => {
    if (
      !confirm(
        `Tem certeza que deseja cancelar a inscrição de ${(item.userId as any)?.firstName || "participante"}?`
      )
    ) {
      return;
    }

    try {
      setActionLoadingId(item._id || item.id);
      const updated = await inscriptionService.cancelInscription(
        item._id || item.id,
        currentUser?.firstName || "Admin"
      );
      setInscriptions((prev) =>
        prev.map((i) => ((i._id || i.id) === (item._id || item.id) ? updated : i))
      );
      if (selectedItem && (selectedItem._id || selectedItem.id) === (item._id || item.id)) {
        setSelectedItem(updated);
      }
    } catch (err: any) {
      alert(`Erro ao cancelar: ${err?.message || "Tente novamente."}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = inscriptions.length;
    const pendentes = inscriptions.filter((i) => i.status === "PENDENTE").length;
    const confirmados = inscriptions.filter((i) => i.status === "CONFIRMADO").length;
    const cancelados = inscriptions.filter((i) => i.status === "CANCELADO").length;
    const acampantes = inscriptions.filter((i) => i.type === "ACAMPANTE").length;
    const servos = inscriptions.filter((i) => i.type === "TRABALHO").length;
    return { total, pendentes, confirmados, cancelados, acampantes, servos };
  }, [inscriptions]);

  // Filtered List
  const filteredList = useMemo(() => {
    return inscriptions.filter((item) => {
      // Type filter
      if (typeFilter !== "ALL" && item.type !== typeFilter) return false;

      // Status filter
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;

      // Search term
      if (search.trim()) {
        const term = search.toLowerCase().trim();
        const user = item.userId as any;
        const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.toLowerCase();
        const cpf = user?.cpf || "";
        const phone = user?.phone || "";
        const city = (user?.city || "").toLowerCase();
        if (
          !fullName.includes(term) &&
          !cpf.includes(term.replace(/\D/g, "")) &&
          !phone.includes(term) &&
          !city.includes(term)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [inscriptions, typeFilter, statusFilter, search]);

  const openWhatsApp = (phone?: string, name?: string) => {
    if (!phone) return;
    const clean = phone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá ${name || ""}, a paz de Cristo! Aqui é da coordenação do Acampamento Homens de Fé referente à sua inscrição. Tudo bem?`
    );
    window.open(`https://wa.me/55${clean}?text=${msg}`, "_blank");
  };

  return (
    <div className="flex-1 flex flex-col gap-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/40 uppercase tracking-wider">
              {activeEvent?.name || "Edição Atual"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Gestão de Inscrições
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Revise as inscrições públicas de acampantes e servos, aprove e gerencie vagas do retiro.
          </p>
        </div>

        <button
          onClick={fetchInscriptions}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-xs cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar Lista
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "ALL"
              ? "bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Total Fichas</span>
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{stats.total}</div>
          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
            {stats.acampantes} acampantes • {stats.servos} servos
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("PENDENTE")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "PENDENTE"
              ? "bg-amber-50/70 border-amber-300 dark:bg-amber-950/30 dark:border-amber-800"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Pendentes</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-400">{stats.pendentes}</div>
          <div className="text-[11px] text-amber-600/80 dark:text-amber-500/80 mt-1">
            Aguardando aprovação
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("CONFIRMADO")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "CONFIRMADO"
              ? "bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Confirmados</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{stats.confirmados}</div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-500/80 mt-1">
            Prontos no PDV e lista
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("CANCELADO")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "CANCELADO"
              ? "bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Cancelados</span>
            <XCircle className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-black text-zinc-600 dark:text-zinc-300">{stats.cancelados}</div>
          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
            Vagas liberadas
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, CPF, cidade ou telefone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setTypeFilter("ALL")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              typeFilter === "ALL"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Todos ({stats.total})
          </button>
          <button
            onClick={() => setTypeFilter("ACAMPANTE")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              typeFilter === "ACAMPANTE"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Tent className="w-3.5 h-3.5" />
            Acampantes ({stats.acampantes})
          </button>
          <button
            onClick={() => setTypeFilter("TRABALHO")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              typeFilter === "TRABALHO"
                ? "bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Servos ({stats.servos})
          </button>
        </div>
      </div>

      {/* Error View */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-rose-800 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Inscriptions Table / Cards */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-zinc-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="text-sm font-semibold">Carregando inscrições...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="p-16 text-center text-zinc-400 space-y-3">
            <Users className="w-12 h-12 mx-auto text-zinc-300 dark:text-zinc-700" />
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-base">
              Nenhuma inscrição encontrada
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {search || typeFilter !== "ALL" || statusFilter !== "ALL"
                ? "Tente ajustar os filtros ou termo de busca."
                : "Compartilhe os links acampar-homensdefe.vercel.app ou trabalhar-homensdefe.vercel.app para receber inscrições!"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredList.map((item) => {
              const user = item.userId as any;
              const isPendente = item.status === "PENDENTE";
              const isConfirmado = item.status === "CONFIRMADO";
              const isActionLoading = actionLoadingId === (item._id || item.id);

              return (
                <div
                  key={item._id || item.id}
                  className="p-4 sm:p-5 hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Participant Info */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-bold ${
                        item.type === "ACAMPANTE"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                          : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {item.type === "ACAMPANTE" ? (
                        <Tent className="w-5 h-5" />
                      ) : (
                        <Briefcase className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-tight">
                          {user?.firstName} {user?.lastName}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                            isConfirmado
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : isPendente
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 animate-pulse"
                              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}
                        >
                          {item.status}
                        </span>

                        {/* Type Badge */}
                        <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                          {item.type === "ACAMPANTE" ? "Acampante" : "Equipe de Trabalho"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-mono">CPF: {formatCpf(user?.cpf || "")}</span>
                        {user?.phone && <span>WhatsApp: {formatPhone(user.phone)}</span>}
                        {user?.city && <span>• {user.city}</span>}
                        {user?.parish && <span>• {user.parish}</span>}
                      </div>

                      {/* Quick Highlight of Camper / Staff */}
                      {item.type === "ACAMPANTE" && item.healthRestrictions && item.healthRestrictions !== "Nenhuma" && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                          <HeartPulse className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-xs">{item.healthRestrictions}</span>
                        </div>
                      )}

                      {item.type === "TRABALHO" && item.preferredRoles && item.preferredRoles.length > 0 && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
                          <Briefcase className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.preferredRoles.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    {/* WhatsApp button */}
                    {user?.phone && (
                      <button
                        onClick={() => openWhatsApp(user.phone, user.firstName)}
                        title="Conversar no WhatsApp"
                        className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    )}

                    {/* View Details button */}
                    <button
                      onClick={() => setSelectedItem(item)}
                      title="Ver Ficha Completa"
                      className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Action buttons */}
                    {isPendente && (
                      <>
                        <button
                          onClick={() => handleConfirm(item)}
                          disabled={isActionLoading}
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          Confirmar
                        </button>
                        <button
                          onClick={() => handleCancel(item)}
                          disabled={isActionLoading}
                          className="px-3 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs transition-all cursor-pointer"
                        >
                          Recusar
                        </button>
                      </>
                    )}

                    {isConfirmado && (
                      <button
                        onClick={() => handleCancel(item)}
                        disabled={isActionLoading}
                        className="px-3 py-2 rounded-xl text-zinc-400 hover:text-rose-600 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Cancelar Vaga
                      </button>
                    )}

                    {item.status === "CANCELADO" && (
                      <button
                        onClick={() => handleConfirm(item)}
                        disabled={isActionLoading}
                        className="px-3 py-2 rounded-xl border border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs font-bold transition-all cursor-pointer"
                      >
                        Reativar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                  Ficha de {selectedItem.type === "ACAMPANTE" ? "Acampante" : "Servo"}
                </span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                  {(selectedItem.userId as any)?.firstName} {(selectedItem.userId as any)?.lastName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-sm">
              {/* Cadastral */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl space-y-2 border border-zinc-200/60 dark:border-zinc-700/50">
                <div className="flex justify-between">
                  <span className="text-zinc-500">CPF:</span>
                  <span className="font-mono font-bold">{formatCpf((selectedItem.userId as any)?.cpf || "")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">WhatsApp / Celular:</span>
                  <span className="font-bold">{formatPhone((selectedItem.userId as any)?.phone || "")}</span>
                </div>
                {(selectedItem.userId as any)?.email && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">E-mail:</span>
                    <span>{(selectedItem.userId as any)?.email}</span>
                  </div>
                )}
                {(selectedItem.userId as any)?.city && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Cidade:</span>
                    <span className="font-semibold">{(selectedItem.userId as any)?.city}</span>
                  </div>
                )}
                {(selectedItem.userId as any)?.parish && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Paróquia / Igreja:</span>
                    <span className="font-semibold">{(selectedItem.userId as any)?.parish}</span>
                  </div>
                )}
                {selectedItem.submittedAt && (
                  <div className="flex justify-between text-xs text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-700">
                    <span>Data de Envio:</span>
                    <span>{new Date(selectedItem.submittedAt).toLocaleString("pt-BR")}</span>
                  </div>
                )}
              </div>

              {/* Specific for Camper */}
              {selectedItem.type === "ACAMPANTE" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                    Dados do Acampamento
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedItem.weight && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                        <span className="text-xs text-zinc-500 block">Peso</span>
                        <span className="font-bold">{selectedItem.weight} kg</span>
                      </div>
                    )}
                    {selectedItem.height && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                        <span className="text-xs text-zinc-500 block">Altura</span>
                        <span className="font-bold">{selectedItem.height} cm</span>
                      </div>
                    )}
                  </div>

                  {selectedItem.referralSource && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block">Como soube do retiro</span>
                      <span className="font-semibold">{selectedItem.referralSource}</span>
                    </div>
                  )}

                  <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-2xl">
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block mb-1">
                      Saúde, Medicamentos e Restrições Alimentares:
                    </span>
                    <p className="text-rose-900 dark:text-rose-200 text-xs leading-relaxed">
                      {selectedItem.healthRestrictions || "Nenhuma restrição informada."}
                    </p>
                  </div>
                </div>
              )}

              {/* Specific for Staff */}
              {selectedItem.type === "TRABALHO" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                    Dados da Equipe de Trabalho
                  </h4>

                  {selectedItem.previousHfEdition && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block">Edição em que acampou</span>
                      <span className="font-semibold">{selectedItem.previousHfEdition}</span>
                    </div>
                  )}

                  {selectedItem.preferredRoles && selectedItem.preferredRoles.length > 0 && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block mb-1">Equipes de Preferência</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItem.preferredRoles.map((r) => (
                          <span
                            key={r}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block">Tem Barraca Própria?</span>
                      <span className="font-bold">{selectedItem.hasTent ? "Sim" : "Não"}</span>
                    </div>
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block">Ajuda na Montagem Pré?</span>
                      <span className="font-bold">
                        {selectedItem.preCampAvailability ? "Sim" : "Não"}
                      </span>
                    </div>
                  </div>

                  {selectedItem.availabilityDays && selectedItem.availabilityDays.length > 0 && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block mb-1">Dias de Disponibilidade</span>
                      <ul className="list-disc list-inside text-xs space-y-0.5 text-zinc-700 dark:text-zinc-300">
                        {selectedItem.availabilityDays.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.willGiveTestimony && (
                    <div className="p-4 bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 rounded-2xl">
                      <span className="text-xs font-bold text-purple-800 dark:text-purple-300 block mb-1">
                        Aceita Dar Testemunho:
                      </span>
                      <p className="text-purple-900 dark:text-purple-200 text-xs leading-relaxed">
                        {selectedItem.testimonyDetails || "Aceitou dar testemunho."}
                      </p>
                    </div>
                  )}

                  {selectedItem.estimatedGuestsCount !== undefined && selectedItem.estimatedGuestsCount > 0 && (
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                      <span className="text-xs text-zinc-500 block">Convidados para o Encerramento</span>
                      <span className="font-bold">{selectedItem.estimatedGuestsCount} pessoas</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              {(selectedItem.userId as any)?.phone && (
                <button
                  onClick={() =>
                    openWhatsApp(
                      (selectedItem.userId as any)?.phone,
                      (selectedItem.userId as any)?.firstName
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chamar no WhatsApp
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {selectedItem.status === "PENDENTE" && (
                  <>
                    <button
                      onClick={() => handleConfirm(selectedItem)}
                      disabled={actionLoadingId === (selectedItem._id || selectedItem.id)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      Aprovar Inscrição
                    </button>
                    <button
                      onClick={() => handleCancel(selectedItem)}
                      disabled={actionLoadingId === (selectedItem._id || selectedItem.id)}
                      className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold cursor-pointer"
                    >
                      Recusar
                    </button>
                  </>
                )}
                {selectedItem.status === "CONFIRMADO" && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Inscrição Aprovada
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
