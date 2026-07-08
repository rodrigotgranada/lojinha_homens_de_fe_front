"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { LogIn, BookOpen, Settings } from "lucide-react";

interface PsalmData {
  refrao?: string;
  texto: string;
  referencia: string;
}

export default function HomePage() {
  const { currentUser, activeEvent, isLoading } = useApp();

  // Psalm of the Day states (from Daily Liturgy API)
  const [psalm, setPsalm] = useState<PsalmData | null>(null);
  const [loadingPsalm, setLoadingPsalm] = useState(true);

  useEffect(() => {
    async function fetchPsalm() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      setLoadingPsalm(true);
      try {
        const res = await fetch(`https://liturgia.up.railway.app/v3/?dia=${day}&mes=${month}&ano=${year}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        
        // Find the main celebration of the day
        const celebration = data.celebracoes?.find((c: any) => c.principal) || data.celebracoes?.[0];
        if (!celebration) throw new Error("No celebration found");

        // Find the Psalm responsorial in the readings
        const salmoLeitura = celebration.leituras?.find(
          (l: any) => l.tipo === "salmo" || l.rotulo?.toLowerCase().includes("salmo")
        );
        if (!salmoLeitura) throw new Error("No Psalm reading found");

        const salmoOpcao = salmoLeitura.opcoes?.[0];
        if (!salmoOpcao) throw new Error("No Psalm option found");

        setPsalm({
          refrao: salmoOpcao.refrao || "",
          texto: salmoOpcao.texto || "",
          referencia: salmoOpcao.referencia || "Salmo Responsorial"
        });
      } catch (err) {
        console.warn("Failed to fetch liturgical psalm, using Psalm 23 fallback", err);
        setPsalm({
          refrao: "O Senhor é o meu pastor, nada me faltará.",
          texto: "— O Senhor é o meu pastor, nada me faltará. Deita-me em verdes pastagens e guia-me mansamente a águas tranquilas.\n— Restaura a minha alma e guia-me pelas veredas da justiça por amor do seu nome.",
          referencia: "Salmos 23:1-3"
        });
      } finally {
        setLoadingPsalm(false);
      }
    }
    fetchPsalm();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <svg className="animate-spin h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-550 font-semibold text-sm">Carregando painel...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-8 py-6">
      {/* Banner Hero */}
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

      {/* Salmo do Dia Hero Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-md relative overflow-hidden flex flex-col items-center justify-center gap-4 w-full">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none flex items-center justify-center">
          <span className="text-[120px] font-black font-serif italic select-none">Bíblia</span>
        </div>
        
        <div className="space-y-2 relative z-10">
          <span className="bg-indigo-50 dark:bg-indigo-955/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-1.5 justify-center w-fit mx-auto">
            <BookOpen className="h-3.5 w-3.5" />
            Liturgia Diária
          </span>
          <h2 className="text-2xl font-black text-zinc-950 dark:text-white mt-2">
            Salmo Responsorial
          </h2>
        </div>

        {loadingPsalm ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <svg className="animate-spin h-6 w-6 text-indigo-650" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs text-zinc-400 font-semibold">Buscando Salmo do dia na Liturgia Diária...</span>
          </div>
        ) : psalm ? (
          <div className="space-y-5 max-w-3xl relative z-10 py-2">
            {/* Refrain */}
            {psalm.refrao && (
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 inline-block max-w-xl mx-auto">
                <p className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Refrão</p>
                <p className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 mt-1 italic font-serif">
                  &ldquo;{psalm.refrao}&rdquo;
                </p>
              </div>
            )}
            
            {/* Verses */}
            <p className="text-base md:text-lg font-medium text-zinc-700 dark:text-zinc-355 leading-relaxed font-serif whitespace-pre-line text-center max-w-2xl mx-auto">
              {psalm.texto}
            </p>
            
            {/* Reference */}
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-550 font-mono tracking-wide">
              — {psalm.referencia}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
