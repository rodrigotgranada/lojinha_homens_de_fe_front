import React from "react";
import { useEvents } from "../context/EventContext";
import { Event } from "@/hooks/useApi";
import {
  Calendar,
  MapPin,
  Radio,
  Clock,
  CheckCircle,
  Edit2,
  Ban
} from "lucide-react";

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

const StatusBadge = ({ event }: { event: Event }) => {
  const status = event.status ?? (event.isActive ? "ATIVO" : "PROGRAMADO");

  const configs: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    ATIVO: {
      label: "Ativo",
      icon: <Radio className="h-2.5 w-2.5 animate-pulse" />,
      cls: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
    },
    PROGRAMADO: {
      label: "Programado",
      icon: <Clock className="h-2.5 w-2.5" />,
      cls: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30"
    },
    ENCERRADO: {
      label: "Encerrado",
      icon: <CheckCircle className="h-2.5 w-2.5" />,
      cls: "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
    },
    CANCELADO: {
      label: "Cancelado",
      icon: <Ban className="h-2.5 w-2.5" />,
      cls: "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-200 dark:border-red-900/30"
    }
  };

  const config = configs[status] ?? configs["PROGRAMADO"];

  return (
    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 shrink-0 ${config.cls}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

export const EventList = () => {
  const {
    events,
    loadingContent,
    handleOpenEditModal
  } = useEvents();

  if (loadingContent) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <span className="text-zinc-400 font-semibold text-sm">Carregando retiros cadastrados...</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-16 text-center text-zinc-400 dark:text-zinc-500">
        <Calendar className="h-14 w-14 stroke-1 mb-3 mx-auto opacity-40" />
        <p className="font-bold text-sm">Nenhum retiro cadastrado</p>
        <p className="text-xs mt-1">Clique em &quot;Novo Retiro&quot; acima para registrar a primeira edição.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const status = event.status ?? (event.isActive ? "ATIVO" : "PROGRAMADO");

        // Stripe color per status
        const stripeClass =
          status === "ATIVO"
            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
            : status === "PROGRAMADO"
            ? "bg-gradient-to-r from-amber-400 to-orange-400"
            : status === "CANCELADO"
            ? "bg-gradient-to-r from-red-400 to-rose-500"
            : "bg-zinc-200 dark:bg-zinc-700"; // ENCERRADO

        const borderClass =
          event.isActive
            ? "border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-500/15"
            : status === "CANCELADO"
            ? "border-red-200 dark:border-red-900/30"
            : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700";

        return (
          <div
            key={event.id}
            className={`bg-white dark:bg-zinc-900 border rounded-2xl flex flex-col justify-between transition-all shadow-xs relative overflow-hidden pb-5 ${borderClass}`}
          >
            {/* Top accent stripe */}
            <div className={`h-1 w-full ${stripeClass}`} />

            <div className="px-5 pt-4 space-y-3">
              {/* Status + Edit button */}
              <div className="flex items-start justify-between gap-2">
                <StatusBadge event={event} />
                <button
                  onClick={() => handleOpenEditModal(event)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all cursor-pointer shrink-0 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                  title="Editar retiro"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Name */}
              <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2">
                {event.name}
              </h3>

              {/* Dates */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span>
                  {event.startDate ? formatDate(event.startDate) : "Sem data definida"}
                  {event.endDate && event.endDate !== event.startDate
                    ? ` → ${formatDate(event.endDate)}`
                    : ""}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                {event.location ? (
                  <span className="truncate">{event.location}</span>
                ) : (
                  <span className="italic text-zinc-400 dark:text-zinc-600">Local não informado</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
