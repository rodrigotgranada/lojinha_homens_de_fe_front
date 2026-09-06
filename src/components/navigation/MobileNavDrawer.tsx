"use client";

import React from "react";
import Link from "next/link";
import { X, LogOut, LogIn, Shield, Zap, Settings, Sun, Moon, Monitor } from "lucide-react";
import { User, Event } from "@/types";
import { NavLinkItem } from "./navLinks";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  activeEvent: Event | null;
  pathname: string;
  adminLinks: NavLinkItem[];
  theme: "light" | "dark" | "system";
  onThemeChange: (theme: "light" | "dark" | "system") => void;
  useLocalApi: boolean;
  onOpenConfigModal: () => void;
  onLogout: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  activeEvent,
  pathname,
  adminLinks,
  theme,
  onThemeChange,
  useLocalApi,
  onOpenConfigModal,
  onLogout,
}) => {
  if (!isOpen) return null;

  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <>
      <div className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40" onClick={onClose} />
      <div className="sm:hidden fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white dark:bg-zinc-900 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 font-black text-base text-indigo-600 dark:text-indigo-400"
          >
            <img src="/icone.png" alt="Logo" className="h-8.5 w-auto max-w-[75px] object-contain" /> Lojinha Retiro
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {activeEvent && (
          <div className="mx-4 mt-3 flex items-center gap-2 bg-amber-50 dark:bg-amber-955/30 border border-amber-100 dark:border-amber-900/30 px-3 py-2.5 rounded-xl">
            <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-amber-500">Evento Ativo</div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-300 truncate">{activeEvent.name}</div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {isAdmin &&
            adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                  }`}
                >
                  <span className={isActive ? "text-indigo-500" : "text-zinc-400"}>{link.icon}</span>
                  {link.name}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                </Link>
              );
            })}

          {!currentUser && (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-md mt-2"
            >
              <LogIn className="h-4 w-4" />
              Acessar Painel
            </Link>
          )}
        </div>

        <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/20">
          <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">Rede de Contingência</span>
          <button
            onClick={() => {
              onClose();
              onOpenConfigModal();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              useLocalApi
                ? "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-955/20 dark:border-amber-900/30 dark:text-amber-455"
                : "bg-white border-zinc-200 text-zinc-650 dark:bg-zinc-850 dark:border-zinc-800 dark:text-zinc-300"
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            {useLocalApi ? "Local" : "Nuvem"}
          </button>
        </div>

        <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/20">
          <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">Tema do Sistema</span>
          <div className="flex gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl">
            <button
              onClick={() => onThemeChange("light")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onThemeChange("system")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                theme === "system"
                  ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>
        </div>

        {currentUser && (
          <div className="px-3 pb-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="text-[10px] uppercase font-extrabold text-indigo-500 tracking-wider">
                  {currentUser.role}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-955/20 rounded-xl cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sair da conta
            </button>
          </div>
        )}
      </div>
    </>
  );
};
