"use client";

import React from "react";
import Link from "next/link";
import { Shield, ChevronDown, LogOut, LogIn, Zap } from "lucide-react";
import { User, Event } from "@/types";

interface UserMenuDropdownProps {
  currentUser: User | null;
  activeEvent: Event | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  currentUser,
  activeEvent,
  isOpen,
  setIsOpen,
  onLogout,
  dropdownRef,
}) => {
  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
      >
        <LogIn className="h-4 w-4" />
        Acessar
      </Link>
    );
  }

  return (
    <div className="hidden sm:block relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Shield className="h-3.5 w-3.5" />
        </div>
        <div className="text-left hidden md:block">
          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
            {currentUser.firstName}
          </div>
          <div className="text-[10px] uppercase font-extrabold text-indigo-500 leading-tight tracking-wider">
            {currentUser.role}
          </div>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 space-y-0.5">
            <div className="text-xs text-zinc-400 font-medium">Conectado como</div>
            <div className="font-bold text-sm text-zinc-900 dark:text-white">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-500">
              {currentUser.role}
            </div>
            {activeEvent && (
              <div className="mt-1.5 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/20 px-2 py-1 rounded-lg text-[10px] font-bold text-amber-600 dark:text-amber-400">
                <Zap className="h-2.5 w-2.5" />
                {activeEvent.name}
              </div>
            )}
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
