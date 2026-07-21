import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export const LoginCredentialsAlert = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 1500);
    } else {
      // Fallback for non-secure HTTP contexts (e.g. tablet accessing local IP over HTTP)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey(null);
        }, 1500);
      } catch (err) {
        console.error("Failed to copy using fallback:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const renderCopyButton = (text: string, key: string, label: string) => {
    const isCopied = copiedKey === key;
    return (
      <button
        type="button"
        onClick={() => handleCopy(text, key)}
        className={`px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer select-none ${
          isCopied
            ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400"
            : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border-zinc-200 dark:border-zinc-700 text-zinc-550 dark:text-zinc-300"
        }`}
      >
        {isCopied ? (
          <Check className="h-2.5 w-2.5 text-emerald-555" />
        ) : (
          <Copy className="h-2.5 w-2.5" />
        )}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-4.5 space-y-3.5 text-xs">
      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
        <span className="text-sm">🔑</span>
        <span className="font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[9px]">
          Acesso de Demonstração (Admin)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Gabriel Admin */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/50 p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
          <div className="space-y-0.5 min-w-0">
            <div className="text-[9px] text-indigo-650 dark:text-indigo-400 font-extrabold uppercase tracking-wider">
              Gabriel Admin
            </div>
            <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white truncate">
              CPF: 111.111.111-11
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">
              Celular/Senha: (53) 98888-8881
            </div>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            {renderCopyButton("11111111111", "g-cpf", "CPF")}
            {renderCopyButton("53988888881", "g-pwd", "Senha")}
          </div>
        </div>

        {/* Lucas Admin */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/50 p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
          <div className="space-y-0.5 min-w-0">
            <div className="text-[9px] text-indigo-655 dark:text-indigo-400 font-extrabold uppercase tracking-wider">
              Lucas Admin
            </div>
            <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white truncate">
              CPF: 222.222.222-22
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">
              Celular/Senha: (53) 98888-8882
            </div>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            {renderCopyButton("22222222222", "l-cpf", "CPF")}
            {renderCopyButton("53988888882", "l-pwd", "Senha")}
          </div>
        </div>
      </div>
    </div>
  );
};
