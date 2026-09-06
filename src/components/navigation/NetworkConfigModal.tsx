"use client";

import React, { useState } from "react";
import { Settings, X, RefreshCw, Wifi, WifiOff } from "lucide-react";

interface NetworkConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  useLocalApi: boolean;
  setUseLocalApi: (val: boolean) => void;
  localApiUrl: string;
  setLocalApiUrl: (val: string) => void;
}

export const NetworkConfigModal: React.FC<NetworkConfigModalProps> = ({
  isOpen,
  onClose,
  useLocalApi,
  setUseLocalApi,
  localApiUrl,
  setLocalApiUrl,
}) => {
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("use_local_api", String(useLocalApi));
      localStorage.setItem("local_api_url", localApiUrl.trim());
      onClose();
      window.location.reload();
    }
  };

  const handleTestConfigConnection = async () => {
    setTestStatus("testing");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${localApiUrl.trim()}/sync/health`, {
        method: "GET",
        signal: controller.signal,
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

  const handleTriggerSync = async () => {
    setSyncStatus("syncing");
    try {
      const res = await fetch(`${localApiUrl.trim()}/sync/trigger`, {
        method: "POST",
      });
      if (res.ok) {
        setSyncStatus("success");
        setTimeout(() => setSyncStatus("idle"), 3000);
      } else {
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 3000);
      }
    } catch {
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Configurar Servidor Local
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Caso a internet do retiro tenha caído, ative o redirecionamento abaixo para conectar os tablets ao notebook servidor da rede local.
          </p>

          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-850 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Redirecionar para Servidor Local
              </span>
              <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-medium">
                Bater na API local do Notebook
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useLocalApi}
                onChange={(e) => setUseLocalApi(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {useLocalApi && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-450 dark:text-zinc-400 tracking-wider">
                URL do Servidor (IP e Porta do Notebook)
              </label>
              <input
                type="text"
                value={localApiUrl}
                onChange={(e) => setLocalApiUrl(e.target.value)}
                placeholder="ex: http://192.168.0.13:3001"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 focus:outline-none text-sm rounded-xl text-zinc-900 dark:text-white"
              />
            </div>
          )}

          {useLocalApi && testStatus !== "idle" && (
            <div className="text-xs font-bold">
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
                  Notebook não encontrado. Verifique se o backend está ligado.
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          {useLocalApi ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestConfigConnection}
                disabled={testStatus === "testing"}
                className="px-3 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Testar Conexão
              </button>
              <button
                type="button"
                onClick={handleTriggerSync}
                disabled={syncStatus === "syncing"}
                className="px-3 py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 text-amber-600 border border-amber-100 font-semibold text-xs rounded-xl cursor-pointer"
              >
                {syncStatus === "syncing" ? "Sincronizando..." : "Sincronizar Banco"}
              </button>
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Salvar e Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
