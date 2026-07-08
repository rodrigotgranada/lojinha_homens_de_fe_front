import React from "react";
import Link from "next/link";
import { LogIn, Settings } from "lucide-react";
import { User, Event } from "@/hooks/useApi";

interface HomeHeroProps {
  currentUser: User | null;
  activeEvent: Event | null;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ currentUser, activeEvent }) => {
  return (
    <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col items-start gap-6">
      <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center justify-center pr-10 pointer-events-none">
        <span className="text-[200px] leading-none">⛪</span>
      </div>

      <div className="max-w-2xl relative z-10 space-y-4">
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {activeEvent ? activeEvent.name : "Edição Atual"}
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Lojinha Virtual para Retiros e Encontros
        </h1>
        <p className="text-lg text-indigo-100 font-medium">
          Adquira lembranças, camisetas, livros e acessórios oficiais do retiro de forma simples e rápida.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 relative z-10">
        {currentUser ? (
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-indigo-700 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Settings className="h-5 w-5" />
            Ir para o Painel Admin
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-indigo-700 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <LogIn className="h-5 w-5" />
            Acessar Painel Admin / Operador
          </Link>
        )}
      </div>
    </div>
  );
};
