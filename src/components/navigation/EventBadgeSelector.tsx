"use client";

import React from "react";
import { Zap } from "lucide-react";
import { Event } from "@/types";

interface EventBadgeSelectorProps {
  activeEvent: Event | null;
}

export const EventBadgeSelector: React.FC<EventBadgeSelectorProps> = ({ activeEvent }) => {
  if (!activeEvent) return null;

  return (
    <div className="hidden md:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-955/30 border border-amber-100 dark:border-amber-900/30 px-3 py-1.5 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 max-w-[180px] truncate">
      <Zap className="h-3 w-3 shrink-0" />
      <span className="truncate">{activeEvent.name}</span>
    </div>
  );
};
