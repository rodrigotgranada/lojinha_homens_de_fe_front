import React, { useState } from "react";
import { BookOpen, BookMarked, Scroll, Sparkles } from "lucide-react";
import { LiturgyCelebration } from "../types";

interface LiturgySectionProps {
  celebration: LiturgyCelebration | null;
  loading: boolean;
}

export const LiturgySection: React.FC<LiturgySectionProps> = ({ celebration, loading }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xs flex flex-col items-center justify-center gap-4 w-full">
        <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm text-zinc-400 font-semibold">Buscando Liturgia Diária...</span>
      </div>
    );
  }

  if (!celebration || !celebration.leituras || celebration.leituras.length === 0) {
    return null;
  }

  const readings = celebration.leituras;
  const currentReading = readings[activeTab] || readings[0];
  const option = currentReading.opcoes?.[0];

  const getReadingIcon = (tipo: string) => {
    switch (tipo) {
      case "salmo":
        return <Scroll className="h-4 w-4" />;
      case "evangelho":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col gap-6 w-full">
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="text-[120px] font-black font-serif italic select-none">Liturgia</span>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4 relative z-10">
        <div>
          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-455 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-1.5 w-fit">
            <BookMarked className="h-3.5 w-3.5" />
            Liturgia da Santa Missa
          </span>
          <h2 className="text-xl font-black text-zinc-950 dark:text-white mt-2 leading-tight">
            {celebration.liturgia}
          </h2>
        </div>
        {celebration.cor && (
          <span className="text-xs font-bold px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start sm:self-center">
            Cor Litúrgica: <span className="font-extrabold uppercase text-indigo-600 dark:text-indigo-400">{celebration.cor}</span>
          </span>
        )}
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {readings.map((reading, idx) => (
          <button
            key={reading.ordem}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              activeTab === idx
                ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-750 dark:hover:text-zinc-250"
            }`}
          >
            {getReadingIcon(reading.tipo)}
            {reading.rotulo}
          </button>
        ))}
      </div>

      {/* Reading Content Showcase */}
      {option ? (
        <div className="space-y-4 relative z-10 py-2 max-w-3xl">
          {/* Reference */}
          {option.referencia && (
            <div className="text-xs font-black font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Referência: {option.referencia}
            </div>
          )}

          {/* Title */}
          {option.titulo && (
            <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">
              {option.titulo}
            </h3>
          )}

          {/* Responsorial Refrain */}
          {currentReading.tipo === "salmo" && option.refrao && (
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 inline-block w-full">
              <p className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Refrão Responsorial</p>
              <p className="text-base font-extrabold text-zinc-850 dark:text-zinc-200 mt-1 italic font-serif">
                &ldquo;{option.refrao.replace(/(\d+)([a-zA-ZÀ-ÿ“"'\u00C0-\u00FF])/g, "$1 $2")}&rdquo;
              </p>
            </div>
          )}

          {/* Reading text body */}
          <div className="text-base md:text-lg font-medium text-zinc-750 dark:text-zinc-300 leading-relaxed font-serif whitespace-pre-line antialiased">
            {option.texto.replace(/(\d+)([a-zA-ZÀ-ÿ“"'\u00C0-\u00FF])/g, "$1 $2")}
          </div>
        </div>
      ) : (
        <div className="text-zinc-400 text-xs italic">Texto da leitura não disponível.</div>
      )}
    </div>
  );
};
