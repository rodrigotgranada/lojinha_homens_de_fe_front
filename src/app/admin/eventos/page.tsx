"use client";

import React from "react";
import { useEventState } from "./hooks/useEventState";
import { EventProvider } from "./context/EventContext";
import { EventList } from "./components/EventList";
import { EventFormModal } from "./components/EventFormModal";
import { Button } from "@/components/ui/Button";
import { Plus, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function GestaoEventosPage() {
  const eventState = useEventState();
  const { currentUser, isLoading, handleOpenAddModal } = eventState;

  // Loading indicator for authorization check
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="text-zinc-550 font-semibold">Carregando edições do retiro...</span>
      </div>
    );
  }

  // Security authorization check
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-555 dark:text-zinc-400 text-sm">
              Esta área é reservada para administradores do retiro.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EventProvider value={eventState}>
      <div className="flex-1 flex flex-col gap-6 py-4">
        
        {/* Event list header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-amber-50 dark:bg-amber-955/30 text-amber-600 dark:text-amber-450 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/30 uppercase tracking-wider">
              Gestão de Retiros
            </span>
            <h1 className="text-3xl font-black text-zinc-955 dark:text-white mt-1">
              Edições dos Retiros
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Cadastre edições e ative o retiro atual. As novas vendas do PDV serão salvas automaticamente vinculadas ao evento ativo.
            </p>
          </div>

          <Button onClick={handleOpenAddModal} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-5 w-5" />
            Novo Retiro / Edição
          </Button>
        </div>

        {/* Dynamic Events Listing */}
        <EventList />

        {/* Event Form Modal (create & edit) */}
        <EventFormModal />

      </div>
    </EventProvider>
  );
}
