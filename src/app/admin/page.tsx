"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { eventService } from "@/services/eventService";
import { Event } from "@/types";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Store,
  Users,
  ClipboardList,
  Wrench,
  TrendingUp,
  FileText,
  Boxes,
  Tag,
  Settings,
  Activity,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Shield,
  Layers,
  ShoppingBag
} from "lucide-react";

export default function AdminPortalPage() {
  const router = useRouter();
  const { currentUser, activeEvent, setActiveEventState, refreshActiveEvent } = useApp();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getEvents();
      // Sort: active first, then by date descending
      const sorted = [...data].sort((a, b) => {
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      setEvents(sorted);
    } catch (err: any) {
      console.error("Erro ao carregar eventos no portal:", err);
      setError(err?.message || "Não foi possível carregar a lista de retiros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = (event: Event, destination: string = "/admin/diretoria") => {
    setActiveEventState(event);
    router.push(destination);
  };

  const active = events.find((e) => e.isActive) || activeEvent;
  const otherEvents = events.filter((e) => e.id !== active?.id);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3">
        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="text-zinc-500 font-bold text-sm">Carregando painel de retiros...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-8 py-4 sm:py-6 max-w-7xl mx-auto w-full">
      
      {/* Top Welcome & Selection Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Portal Administrativo Homens de Fé
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Escolha o Retiro para Visualizar
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 max-w-2xl">
            Selecione uma edição para acessar seu dashboard executivo, controle de inscrições, PDV e custos, ou navegue pelos cadastros gerais fora do retiro.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={fetchEvents}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-xs"
            title="Atualizar lista de eventos"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/admin/eventos"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Novo Retiro / Edição
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-rose-800 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION 1: RETIRO ATIVO (DESTAQUE PRINCIPAL) */}
      {active ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Retiro Ativo em Andamento
            </h2>
          </div>

          <div className="relative rounded-3xl border-2 border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 p-6 sm:p-8 shadow-xl overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-200/20 to-transparent dark:from-amber-900/10 pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              {/* Event Info */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                    Edição Ativa
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {active.status || "EM_ANDAMENTO"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {active.name}
                </h3>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  {active.startDate && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      {new Date(active.startDate).toLocaleDateString("pt-BR")}{" "}
                      {active.endDate && `a ${new Date(active.endDate).toLocaleDateString("pt-BR")}`}
                    </span>
                  )}
                  {active.location && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      {active.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleSelectEvent(active, "/admin/diretoria")}
                  className="px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 font-black text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer group-hover:scale-[1.01]"
                >
                  <span>Acessar Painel do Retiro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Modules Shortcuts of this active retreat */}
            <div className="mt-6 pt-6 border-t border-amber-200/60 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
              <button
                onClick={() => handleSelectEvent(active, "/admin/diretoria")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Diretoria</span>
                <span className="text-[10px] text-zinc-500">Resumo financeiro</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/inscricoes")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <ClipboardList className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Inscrições</span>
                <span className="text-[10px] text-zinc-500">Acampantes & Equipe</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/pdv")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">PDV Caixa</span>
                <span className="text-[10px] text-zinc-500">Vender na Lojinha</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/vendas")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Vendas</span>
                <span className="text-[10px] text-zinc-500">Extrato de pedidos</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/custos-loja")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Custos da Loja</span>
                <span className="text-[10px] text-zinc-500">Lotes & Investidores</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/despesas")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <Wrench className="w-4 h-4 text-rose-600 dark:text-rose-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Obras & Retiro</span>
                <span className="text-[10px] text-zinc-500">Infra & reembolsos</span>
              </button>

              <button
                onClick={() => handleSelectEvent(active, "/admin/prestacao-contas")}
                className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 dark:hover:border-amber-500/50 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-1" />
                <span className="text-xs font-bold block text-zinc-900 dark:text-zinc-100">Balanço A4</span>
                <span className="text-[10px] text-zinc-500">Relatório executivo</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <Calendar className="w-10 h-10 mx-auto text-zinc-400 mb-2" />
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200">Nenhum retiro ativo no momento</h3>
          <p className="text-xs text-zinc-500 mt-1 mb-4">Cadastre ou ative uma edição para começar.</p>
          <Link
            href="/admin/eventos"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            Cadastrar Edição
          </Link>
        </div>
      )}

      {/* SECTION 2: OUTRAS EDIÇÕES / HISTÓRICOS */}
      {otherEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Outros Retiros & Histórico de Edições ({otherEvents.length})
            </h2>
            <Link
              href="/admin/eventos"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Gerenciar Todas as Edições
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {evt.status === "ENCERRADO" ? "Histórico / Encerrado" : evt.status || "Edição"}
                    </span>
                    {evt.startDate && (
                      <span className="text-xs text-zinc-400">
                        {new Date(evt.startDate).toLocaleDateString("pt-BR", { year: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {evt.name}
                  </h3>

                  {evt.location && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                      {evt.location}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleSelectEvent(evt, "/admin/diretoria")}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Ver Resumo</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleSelectEvent(evt, "/admin/prestacao-contas")}
                    className="py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 text-xs font-semibold cursor-pointer"
                    title="Prestação de Contas"
                  >
                    Balanço
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: RECURSOS GLOBAIS (FORA DO RETIRO) */}
      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              Recursos Globais & Cadastros Centrais (Fora do Retiro)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Cadastros compartilhados entre todas as edições dos eventos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Base Geral de Membros / Clientes */}
          <Link
            href="/admin/clientes"
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
              Base Geral de Membros
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Todos os participantes, histórico 360° em retiros e extrato acumulado na Lojinha.
            </p>
          </Link>

          {/* Estoque Matriz & Produtos */}
          <Link
            href="/admin/produtos"
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Boxes className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
              Catálogo & Estoque Matriz
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Cadastro central de produtos, custos unitários, fornecedores e preços padrão.
            </p>
          </Link>

          {/* Configurações & Pix */}
          <Link
            href="/admin/configuracoes"
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
              Configurações Gerais
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Chaves Pix de recebimento, preferências do sistema e parâmetros de cobrança.
            </p>
          </Link>

          {/* Auditoria & Logs */}
          <Link
            href="/admin/logs"
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
              Auditoria & Logs
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Rastreamento de todas as alterações, baixas de estoque, exclusões e operadores.
            </p>
          </Link>
        </div>
      </div>

    </div>
  );
}
