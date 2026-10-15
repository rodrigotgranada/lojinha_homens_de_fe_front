"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  inscriptionService,
  ActiveEventInfo,
} from "@/services/inscriptionService";
import { eventService } from "@/services/eventService";
import { formatCpf, formatPhone, calculateAge } from "@/utils/stringUtils";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldCheck,
  User,
  HeartPulse,
  Phone,
  AlertCircle,
  Loader2,
  Send,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AcamparClient({ eventSlug }: { eventSlug?: string } = {}) {
  const [activeEvent, setActiveEvent] = useState<ActiveEventInfo | null>(null);
  const [availableEvents, setAvailableEvents] = useState<ActiveEventInfo[]>([]);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [eventNotFound, setEventNotFound] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [parish, setParish] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [healthRestrictions, setHealthRestrictions] = useState("");
  const [lgpdAuthorized, setLgpdAuthorized] = useState(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState<any | null>(null);

  // Calculated Age
  const calculatedAge = calculateAge(birthDate);

  useEffect(() => {
    async function loadEventData() {
      try {
        setLoadingEvent(true);
        setEventNotFound(false);
        if (eventSlug) {
          const event = await inscriptionService.getEventBySlug(eventSlug);
          if (event) {
            setActiveEvent(event);
          } else {
            setEventNotFound(true);
          }
        } else {
          // If no slug provided in URL, fetch active events
          const activeList = await eventService.getActiveEvents();
          if (activeList.length === 1) {
            setActiveEvent({
              id: activeList[0].id,
              name: activeList[0].name,
              slug: activeList[0].slug,
              city: activeList[0].city,
              location: activeList[0].location,
              startDate: activeList[0].startDate,
              endDate: activeList[0].endDate,
              status: activeList[0].status || "ATIVO",
              isActive: activeList[0].isActive,
            });
          } else if (activeList.length > 1) {
            setAvailableEvents(
              activeList.map((a) => ({
                id: a.id,
                name: a.name,
                slug: a.slug,
                city: a.city,
                location: a.location,
                startDate: a.startDate,
                endDate: a.endDate,
                status: a.status || "ATIVO",
                isActive: a.isActive,
              }))
            );
          } else {
            const fallback = await inscriptionService.getActiveEvent();
            if (fallback) {
              setActiveEvent(fallback);
            } else {
              setEventNotFound(true);
            }
          }
        }
      } catch (err) {
        console.error("Erro ao carregar evento:", err);
        setEventNotFound(true);
      } finally {
        setLoadingEvent(false);
      }
    }
    loadEventData();
  }, [eventSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      setErrorMessage("Por favor, digite um CPF válido e completo com 11 dígitos.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Por favor, informe um número de WhatsApp/celular válido com DDD.");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Por favor, informe seu nome e sobrenome completos.");
      return;
    }

    if (!lgpdAuthorized) {
      setErrorMessage("É necessário concordar com a autorização para finalizar a inscrição.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await inscriptionService.submitInscription({
        eventId: activeEvent?.id,
        cpf: cleanCpf,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        birthDate: birthDate || undefined,
        city: city.trim() || undefined,
        parish: parish.trim() || undefined,
        type: "ACAMPANTE",
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        referralSource: referralSource || undefined,
        healthRestrictions: healthRestrictions.trim() || "Nenhuma restrição informada.",
        lgpdAuthorized: true,
      });

      setSubmittedSuccess(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Erro na inscrição:", err);
      setErrorMessage(
        err?.message ||
          "Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFirstName("");
    setLastName("");
    setCpf("");
    setPhone("");
    setEmail("");
    setBirthDate("");
    setCity("");
    setParish("");
    setWeight("");
    setHeight("");
    setReferralSource("");
    setHealthRestrictions("");
    setLgpdAuthorized(true);
    setSubmittedSuccess(null);
    setErrorMessage(null);
  };

  // SUCCESS SCREEN
  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              Inscrição Recebida
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
              Inscrição Concluída com Sucesso!
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
              Parabéns pela decisão de viver essa experiência transformadora no{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {submittedSuccess.event?.name || activeEvent?.name || "Acampamento Homens de Fé"}
              </strong>
              !
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-700/60 text-left space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-zinc-200/70 dark:border-zinc-700/50 pb-2">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Acampante:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {submittedSuccess.user?.name}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-zinc-200/70 dark:border-zinc-700/50 pb-2">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">CPF:</span>
              <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                {formatCpf(submittedSuccess.user?.cpf || "")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-zinc-200/70 dark:border-zinc-700/50 pb-2">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Status da Inscrição:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
                Aguardando Confirmação
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Próximo Passo:</span>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 text-right">
                Coordenação entrará em contato
              </span>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl p-4 text-xs text-indigo-900 dark:text-indigo-300 text-left leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">O que acontece agora?</p>
              <p>
                Sua ficha já está salva no sistema. A coordenação do retiro revisará as informações
                e entrará em contato pelo WhatsApp informado para tirar dúvidas e confirmar sua vaga.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleResetForm}
              className="w-full py-3.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer text-sm"
            >
              Fazer Outra Inscrição
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loadingEvent) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm font-bold text-zinc-500">Carregando informações do retiro...</p>
      </div>
    );
  }

  // When multiple retreats are active and no slug was passed in URL
  if (availableEvents.length > 1 && !activeEvent) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            Inscrições Abertas
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Escolha seu Acampamento Homens de Fé
          </h1>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto">
            Temos mais de um retiro com inscrições abertas no momento. Selecione o seu evento abaixo para se inscrever:
          </p>
        </div>

        <div className="grid gap-4">
          {availableEvents.map((ev) => (
            <Link
              key={ev.id}
              href={`/acampar/${ev.slug || ev.id}`}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                    {ev.city || "Edição Oficial"}
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {ev.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  {ev.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {new Date(ev.startDate).toLocaleDateString("pt-BR")}
                      {ev.endDate && ` a ${new Date(ev.endDate).toLocaleDateString("pt-BR")}`}
                    </span>
                  )}
                  {ev.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {ev.location}
                    </span>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shrink-0 self-start sm:self-auto group-hover:bg-indigo-700 transition-colors shadow-xs">
                <span>Inscrever-se</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (eventNotFound || !activeEvent) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
          Retiro não encontrado
        </h2>
        <p className="text-sm text-zinc-500">
          O endereço informado não corresponde a nenhum retiro ativo ou as inscrições já foram encerradas.
        </p>
        <Link
          href="/acampar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          Ver Retiros com Vagas Abertas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Retiro Header Card */}
      <div className="bg-linear-to-br from-indigo-700 via-indigo-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <img src="/icone.png" alt="" className="w-56 h-56 object-contain" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-indigo-100 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Ficha de Inscrição Oficial
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {activeEvent?.name ? activeEvent.name : "Acampamento Homens de Fé"}
          </h1>

          <p className="text-indigo-200 text-sm leading-relaxed max-w-xl">
            Preencha seus dados abaixo para se inscrever no acampamento. O processo é simples e rápido.
          </p>

          {(activeEvent?.location || activeEvent?.startDate) && (
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-indigo-100">
              {activeEvent.startDate && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                  {new Date(activeEvent.startDate).toLocaleDateString("pt-BR")}
                  {activeEvent.endDate && ` a ${new Date(activeEvent.endDate).toLocaleDateString("pt-BR")}`}
                </span>
              )}
              {activeEvent.location && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-indigo-300" />
                  {activeEvent.location}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-800 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <div className="flex-1">
            <span className="font-bold block">Atenção</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: Dados Pessoais */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                1. Dados Pessoais
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Identificação do acampante
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Nome <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: João"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Sobrenome <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex: da Silva"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                CPF <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                value={cpf}
                onChange={(e) => setCpf(formatCpf(e.target.value))}
                placeholder="000.000.000-00"
                maxLength={14}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block mt-1">
                Necessário para o cadastro único no retiro
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Celular / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(53) 99999-9999"
                  maxLength={15}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block mt-1">
                Para contato da equipe e avisos do retiro
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              E-mail (opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* SECTION 2: Origem & Nascimento */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                2. Nascimento e Comunidade
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Idade e comunidade religiosa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {calculatedAge !== null && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  Idade calculada: {calculatedAge} anos
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Cidade onde mora
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Pelotas / RS"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Qual sua Paróquia / Igreja?
              </label>
              <input
                type="text"
                value={parish}
                onChange={(e) => setParish(e.target.value)}
                placeholder="Ex: Paróquia Sagrado Coração de Jesus"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Como soube do Homens de Fé?
              </label>
              <select
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="">Selecione uma opção...</option>
                <option value="Amigos / Irmãos">Amigos / Irmãos</option>
                <option value="Família">Família</option>
                <option value="Paróquia / Padre">Paróquia / Padre</option>
                <option value="Redes Sociais / WhatsApp">Redes Sociais / WhatsApp</option>
                <option value="Já fiz o acampamento">Já participei de edições anteriores</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: Informações de Saúde e Cuidados */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                3. Cuidados & Saúde
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Para que possamos cuidar bem de você durante os dias no sítio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Peso aproximado (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 85"
                min={30}
                max={250}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Altura aproximada (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 175"
                min={100}
                max={230}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Sobre algum problema físico, alergia, doença crônica ou restrição alimentar?
            </label>
            <textarea
              rows={3}
              value={healthRestrictions}
              onChange={(e) => setHealthRestrictions(e.target.value)}
              placeholder="Ex: Pressão alta (tomo remédio de manhã), alergia a frutos do mar, intolerância a glúten/lactose, dor no joelho para caminhadas longas..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
            />
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block mt-1">
              Essas informações são confidenciais e usadas estritamente pela equipe de saúde e alimentação.
            </span>
          </div>
        </div>

        {/* SECTION 4: LGPD e Termos */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                4. Proteção de Dados (LGPD)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Termo de transparência e uso de imagens
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border border-zinc-200/60 dark:border-zinc-700/50">
            O <strong>Acampamento Homens de Fé</strong> não armazena os dados de qualquer participante com o
            intuito de promover Spam ou compartilhar com terceiros. Temos redes sociais onde registramos os
            momentos de oração e fraternidade onde os participantes podem aparecer.
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={lgpdAuthorized}
              onChange={(e) => setLgpdAuthorized(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded-sm border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Autorizo a divulgação de fotos e momentos do retiro nas redes sociais oficiais da comunidade Homens de Fé.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer hover:shadow-indigo-500/25 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando Inscrição...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Minha Inscrição
              </>
            )}
          </button>
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-3">
            Sua inscrição será analisada com carinho pela equipe de coordenação.
          </p>
        </div>
      </form>
    </div>
  );
}
