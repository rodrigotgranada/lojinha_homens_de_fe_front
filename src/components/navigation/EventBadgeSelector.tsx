"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowLeftRight } from "lucide-react";
import { Event } from "@/types";

interface EventBadgeSelectorProps {
  activeEvent: Event | null;
}

export const EventBadgeSelector: React.FC<EventBadgeSelectorProps> = ({ activeEvent }) => {
  if (!activeEvent) return null;

  return (
    <Link
      href="/admin"
      className="hidden md:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-955/40 border border-amber-200/90 dark:border-amber-900/50 hover:bg-amber-100/80 dark:hover:bg-amber-900/60 px-3 py-1.5 rounded-full text-xs font-bold text-amber-800 dark:text-amber-200 max-w-[220px] transition-all cursor-pointer shadow-2xs group"
      title="Retiro Selecionado - Clique para alternar ou voltar ao portal"
    >
      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
      <span className="truncate">{activeEvent.name}</span>
      <ArrowLeftRight className="w-3 h-3 text-amber-600 dark:text-amber-400 opacity-60 group-hover:opacity-100 shrink-0 ml-0.5" />
    </Link>
  );
};
