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
  Phone,
  AlertCircle,
  Loader2,
  Send,
  Sparkles,
  Tent,
  Briefcase,
  Mic2,
  Clock,
  Users2,
  ArrowRight,
} from "lucide-react";

const ROLE_OPTIONS = [
  "Cozinha / Alimentação",
  "Liturgia / Espiritualidade",
  "Animação & Louvor / Música",
  "Manutenção / Infraestrutura",
  "Secretaria / Recepção",
  "Intercessão / Apoio",
  "Lojinha / PDV",
  "Limpeza / Zeladoria",
  "Onde a coordenação precisar",
];

const DAY_OPTIONS = [
  "Quinta-feira (Montagem & Preparativos)",
  "Sexta-feira (Início do Retiro)",
  "Sábado (Dia Inteiro)",
  "Domingo (Encerramento)",
];

export default function TrabalharClient({ eventSlug }: { eventSlug?: string } = {}) {
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

  // Staff Specific State
  const [previousHfEdition, setPreviousHfEdition] = useState("");
  const [preferredRoles, setPreferredRoles] = useState<string[]>([]);
  const [willGiveTestimony, setWillGiveTestimony] = useState<boolean | null>(null);
  const [testimonyDetails, setTestimonyDetails] = useState("");
  const [testimonyReason, setTestimonyReason] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);
  const [hasTent, setHasTent] = useState<boolean | null>(null);
  const [preCampAvailability, setPreCampAvailability] = useState<boolean | null>(null);
  const [pastRoles, setPastRoles] = useState("");
  const [estimatedGuestsCount, setEstimatedGuestsCount] = useState("");
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

  const toggleRole = (role: string) => {
    setPreferredRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleDay = (day: string) => {
    setAvailabilityDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

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

    if (preferredRoles.length === 0) {
      setErrorMessage("Por favor, selecione ao menos uma equipe de interesse.");
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
        eventSlug: activeEvent?.slug || eventSlug,
        cpf: cleanCpf,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        birthDate: birthDate || undefined,
        city: city.trim() || undefined,
        parish: parish.trim() || undefined,
        type: "TRABALHO",
        previousHfEdition: previousHfEdition.trim() || undefined,
        preferredRoles,
        willGiveTestimony: willGiveTestimony === true,
        testimonyDetails: testimonyDetails.trim() || undefined,
        testimonyReason: testimonyReason.trim() || undefined,
        availabilityDays,
        hasTent: hasTent === true,
        preCampAvailability: preCampAvailability === true,
        pastRoles: pastRoles.trim() || undefined,
        estimatedGuestsCount: estimatedGuestsCount ? parseInt(estimatedGuestsCount) : 0,
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
    setPreviousHfEdition("");
    setPreferredRoles([]);
    setWillGiveTestimony(null);
    setTestimonyDetails("");
    setTestimonyReason("");
    setAvailabilityDays([]);
    setHasTent(null);
    setPreCampAvailability(null);
    setPastRoles("");
    setEstimatedGuestsCount("");
    setLgpdAuthorized(true);
    setSubmittedSuccess(null);
    setErrorMessage(null);
  };

  // SUCCESS SCREEN
  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
              Trabalhador Registrado
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
              Deus Abençoe sua Disponibilidade!
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
              Sua ficha para a equipe de trabalho do{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                {submittedSuccess.event?.name || activeEvent?.name || "Homens de Fé"}
              </strong>{" "}
              foi cadastrada com sucesso!
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-700/60 text-left space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-zinc-200/70 dark:border-zinc-700/50 pb-2">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Irmão de Fé:</span>
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
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
                Aguardando Confirmação
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Próximo Passo:</span>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 text-right">
                Alinhamento com coordenadores
              </span>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-300 text-left leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Equipe e Reuniões de Alinhamento</p>
              <p>
                Os coordenadores entrarão em contato para informar datas de reuniões de alinhamento,
                organização das equipes e detalhes da montagem do retiro.
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
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        <p className="text-sm font-bold text-zinc-500">Carregando informações do retiro...</p>
      </div>
    );
  }

  // When multiple retreats are active and no slug was passed in URL
  if (availableEvents.length > 1 && !activeEvent) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Briefcase className="w-3.5 h-3.5" />
            Equipes de Trabalho Abertas
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Escolha seu Retiro Homens de Fé
          </h1>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto">
            Temos mais de um retiro com vagas abertas para a equipe de trabalho. Selecione o evento onde você irá servir:
          </p>
        </div>

        <div className="grid gap-4">
          {availableEvents.map((ev) => (
            <Link
              key={ev.id}
              href={`/trabalhar/${ev.slug || ev.id}`}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">
                    {ev.city || "Edição Oficial"}
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shrink-0 self-start sm:self-auto group-hover:bg-amber-700 transition-colors shadow-xs">
                <span>Servir neste Retiro</span>
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
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Nenhum Retiro Aberto para Trabalhadores
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          {eventSlug
            ? `Não encontramos um retiro com o link "${eventSlug}". Verifique o link enviado pela coordenação.`
            : "No momento não encontramos retiros com inscrições abertas para a equipe de trabalho. Aguarde a divulgação da coordenação."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header Card */}
      <div className="bg-linear-to-br from-amber-600 via-amber-700 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <img src="/icone.png" alt="" className="w-56 h-56 object-contain" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-amber-100 text-xs font-bold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            Equipe de Trabalho
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {activeEvent?.name ? activeEvent.name : "Homens de Fé - Equipe de Trabalho"}
          </h1>

          <p className="text-amber-100 text-sm leading-relaxed max-w-xl">
            Obrigado pelo seu coração generoso em servir aos irmãos. Preencha seus dados para montarmos as escalas e equipes.
          </p>

          {(activeEvent?.location || activeEvent?.startDate) && (
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-100">
              {activeEvent.startDate && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  {new Date(activeEvent.startDate).toLocaleDateString("pt-BR")}
                  {activeEvent.endDate && ` a ${new Date(activeEvent.endDate).toLocaleDateString("pt-BR")}`}
                </span>
              )}
              {activeEvent.location && (
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
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
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                1. Identificação do Trabalhador
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Seus dados cadastrais
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
                placeholder="Ex: Carlos"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
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
                placeholder="Ex: Oliveira"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
              {calculatedAge !== null && (
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mt-1">
                  {calculatedAge} anos
                </span>
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
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Qual sua Paróquia?
              </label>
              <input
                type="text"
                value={parish}
                onChange={(e) => setParish(e.target.value)}
                placeholder="Ex: Catedral São Francisco"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Experiência & Equipes */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                2. Histórico & Preferência de Equipe
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Onde você se sente chamado a servir?
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Em qual edição do Homens de Fé você fez o acampamento?
            </label>
            <input
              type="text"
              value={previousHfEdition}
              onChange={(e) => setPreviousHfEdition(e.target.value)}
              placeholder="Ex: 1ª Edição (2024), 2ª Edição (2025)..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Quais equipes você gostaria de trabalhar? (Pode marcar mais de uma) <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ROLE_OPTIONS.map((role) => {
                const isSelected = preferredRoles.includes(role);
                return (
                  <button
                    type="button"
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-200 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{role}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        isSelected
                          ? "bg-amber-600 border-amber-600 text-white"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Em quais equipes já trabalhou anteriormente (no HF ou em outros retiros)?
            </label>
            <input
              type="text"
              value={pastRoles}
              onChange={(e) => setPastRoles(e.target.value)}
              placeholder="Ex: Cozinha na 2ª edição, som no Cursilho..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        {/* SECTION 3: Testemunho */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              <Mic2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                3. Testemunho de Fé
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Partilha e edificação dos irmãos
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Aceitaria dar o seu testemunho durante o acampamento?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWillGiveTestimony(true)}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                  willGiveTestimony === true
                    ? "bg-purple-50 border-purple-300 text-purple-900 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-200"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Sim, aceito
              </button>
              <button
                type="button"
                onClick={() => setWillGiveTestimony(false)}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                  willGiveTestimony === false
                    ? "bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Prefiro não dar
              </button>
            </div>
          </div>

          {willGiveTestimony === true && (
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Conte brevemente o tema ou história do seu testemunho:
              </label>
              <textarea
                rows={3}
                value={testimonyDetails}
                onChange={(e) => setTestimonyDetails(e.target.value)}
                placeholder="Ex: Restauração do meu casamento, superação de vícios, milagre na família..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all resize-y"
              />
            </div>
          )}

          {willGiveTestimony === false && (
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Gostaria de informar o motivo? (opcional)
              </label>
              <input
                type="text"
                value={testimonyReason}
                onChange={(e) => setTestimonyReason(e.target.value)}
                placeholder="Ex: Muita timidez para falar em público..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>
          )}
        </div>

        {/* SECTION 4: Disponibilidade & Logística */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                4. Disponibilidade e Logística
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Dias presentes, barraca e convidados
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Dias de disponibilidade para estar presente:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DAY_OPTIONS.map((day) => {
                const isSelected = availabilityDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200"
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{day}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Tem barraca própria para acampar?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasTent(true)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    hasTent === true
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Sim, tenho
                </button>
                <button
                  type="button"
                  onClick={() => setHasTent(false)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    hasTent === false
                      ? "bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Não tenho
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Disponível para ajudar na montagem pré-acampamento?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPreCampAvailability(true)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    preCampAvailability === true
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Sim, posso
                </button>
                <button
                  type="button"
                  onClick={() => setPreCampAvailability(false)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    preCampAvailability === false
                      ? "bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Não posso
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Estimativa de convidados que pretende levar no encerramento (domingo à tarde):
            </label>
            <input
              type="number"
              min={0}
              max={50}
              value={estimatedGuestsCount}
              onChange={(e) => setEstimatedGuestsCount(e.target.value)}
              placeholder="Ex: 4 convidados (esposa, filhos, pais)"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block mt-1">
              Ajuda a equipe a dimensionar cadeiras e alimentação para a celebração final.
            </span>
          </div>
        </div>

        {/* SECTION 5: LGPD */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                5. Proteção de Dados (LGPD)
              </h2>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={lgpdAuthorized}
              onChange={(e) => setLgpdAuthorized(e.target.checked)}
              className="mt-1 w-4 h-4 text-amber-600 rounded-sm border-zinc-300 dark:border-zinc-700 focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Autorizo o uso de dados para organização das escalas e fotos/vídeos de trabalho nas redes do Homens de Fé.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer hover:shadow-amber-500/25 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando Inscrição...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Confirmar Disponibilidade na Equipe
              </>
            )}
          </button>
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-3">
            Obrigado por servir e fazer parte da família Homens de Fé!
          </p>
        </div>
      </form>
    </div>
  );
}
