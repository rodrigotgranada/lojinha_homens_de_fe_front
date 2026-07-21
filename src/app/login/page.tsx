"use client";

import React, { useState, useEffect } from "react";
import { useLoginState } from "./hooks/useLoginState";
import { LoginProvider } from "./context/LoginContext";
import { LoginHeader } from "./components/LoginHeader";
import { LoginForm } from "./components/LoginForm";
import { LoginCredentialsAlert } from "./components/LoginCredentialsAlert";
import { ShieldAlert, Settings, X, RefreshCw, Wifi, WifiOff } from "lucide-react";

export default function LoginPage() {
  const loginState = useLoginState();
  const { error } = loginState;

  // Local contingency state
  const [showConfig, setShowConfig] = useState(false);
  const [useLocalApi, setUseLocalApi] = useState(false);
  const [localApiUrl, setLocalApiUrl] = useState("http://localhost:3001");
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUseLocalApi(localStorage.getItem("use_local_api") === "true");
      setLocalApiUrl(localStorage.getItem("local_api_url") || "http://localhost:3001");
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("use_local_api", String(useLocalApi));
      localStorage.setItem("local_api_url", localApiUrl.trim());
      setShowConfig(false);
      window.location.reload(); // Reload to apply API route change globally
    }
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      const res = await fetch(`${localApiUrl.trim()}/sync/health`, {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setTestStatus("success");
      } else {
        setTestStatus("error");
      }
    } catch {
      setTestStatus("error");
    }
  };

  return (
    <LoginProvider value={loginState}>
      <div className="flex-1 flex flex-col items-center justify-center py-12 relative min-h-screen">
        {/* Floating Settings Button in the top right corner */}
        <button
          onClick={() => {
            setTestStatus("idle");
            setShowConfig(true);
          }}
          className="absolute top-6 right-6 p-3 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-full shadow-md text-zinc-500 hover:text-indigo-600 hover:border-indigo-200 dark:hover:text-indigo-400 dark:hover:border-indigo-900 transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
          title="Configurações de Rede / Modo Contingência Offline"
        >
          <Settings className="h-4 w-4" />
          <span>Configurar Rede</span>
        </button>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-6 relative z-10">
          {/* Header */}
          <LoginHeader />

          {/* Current Connection Status Indicator */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            {useLocalApi ? (
              <>
                <WifiOff className="h-3.5 w-3.5 text-amber-500" />
                <span>Modo Local: <span className="text-amber-600 dark:text-amber-400 font-extrabold">{localApiUrl}</span></span>
              </>
            ) : (
              <>
                <Wifi className="h-3.5 w-3.5 text-emerald-500" />
                <span>Modo Nuvem (Online)</span>
              </>
            )}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-semibold border border-red-100 dark:border-red-900/30 flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <LoginForm />

          {/* Seed Alert */}
          <LoginCredentialsAlert />
        </div>

        {/* Modal: Contingency Network Configurations */}
        {showConfig && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
                  Configurar Servidor Local
                </h3>
                <button
                  onClick={() => setShowConfig(false)}
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Caso a internet do retiro tenha caído, ative o redirecionamento abaixo para conectar os tablets ao notebook servidor da rede local.
                </p>

                {/* Switch for Redirect Toggle */}
                <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-850 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Redirecionar para Servidor Local</span>
                    <span className="text-[10px] text-zinc-450 dark:text-zinc-500">Bater na API local do Notebook</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLocalApi}
                      onChange={(e) => setUseLocalApi(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                  </label>
                </div>

                {/* IP input */}
                {useLocalApi && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-150">
                    <label className="text-[10px] font-black uppercase text-zinc-450 dark:text-zinc-400 tracking-wider">URL do Servidor (IP e Porta do Notebook)</label>
                    <input
                      type="text"
                      value={localApiUrl}
                      onChange={(e) => setLocalApiUrl(e.target.value)}
                      placeholder="ex: http://192.168.0.13:3001"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 focus:outline-none text-sm rounded-xl text-zinc-900 dark:text-white"
                    />
                  </div>
                )}

                {/* Test Connection Result */}
                {useLocalApi && testStatus !== "idle" && (
                  <div className="text-xs font-bold transition-all animate-in fade-in duration-200">
                    {testStatus === "testing" && (
                      <span className="text-zinc-500 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Testando conexão com o IP...
                      </span>
                    )}
                    {testStatus === "success" && (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Wifi className="h-3.5 w-3.5" />
                        Conectado com sucesso ao Notebook!
                      </span>
                    )}
                    {testStatus === "error" && (
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                        <WifiOff className="h-3.5 w-3.5" />
                        Notebook não encontrado. Verifique se o backend está ligado e se o IP está correto.
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                {useLocalApi ? (
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testStatus === "testing"}
                    className="px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-650 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    Testar Conexão
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2.5 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Salvar e Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LoginProvider>
  );
}
