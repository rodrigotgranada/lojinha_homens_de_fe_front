"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { ShieldAlert, Settings, Wifi, WifiOff, RefreshCw, Save, Check } from "lucide-react";
import Link from "next/link";

export default function ConfiguracoesAdminPage() {
  const { currentUser } = useApp();
  
  const [useLocalApi, setUseLocalApi] = useState(false);
  const [localApiUrl, setLocalApiUrl] = useState("http://192.168.1.100:3001");
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "failed">("idle");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUseLocal = window.localStorage.getItem("use_local_api") === "true";
      const savedLocalUrl = window.localStorage.getItem("local_api_url");
      setUseLocalApi(savedUseLocal);
      if (savedLocalUrl) {
        setLocalApiUrl(savedLocalUrl);
      }
    }
  }, []);

  // Authorization Check: Admin only
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-955/30 text-rose-500 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">Acesso Restrito</h2>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm">
              Esta área é reservada exclusivamente para administradores do sistema.
            </p>
          </div>
          <Link
            href="/login"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
          >
            Acessar com CPF Admin
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("use_local_api", String(useLocalApi));
      window.localStorage.setItem("local_api_url", localApiUrl.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Força a atualização do hook de API recarregando os dados necessários ou a página se necessário
      // mas apenas dar um feedback visual já é excelente.
    }
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    try {
      // Tenta bater na rota de health do servidor local
      const res = await fetch(`${localApiUrl.trim()}/sync/health`, {
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "ok") {
          setTestStatus("success");
        } else {
          setTestStatus("failed");
        }
      } else {
        setTestStatus("failed");
      }
    } catch (err) {
      setTestStatus("failed");
    }
  };

  const handleTriggerSync = async () => {
    setSyncStatus("syncing");
    try {
      const url = useLocalApi ? localApiUrl.trim() : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
      const res = await fetch(`${url}/sync/trigger`, {
        method: "POST",
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) {
        setSyncStatus("success");
        setTimeout(() => setSyncStatus("idle"), 3000);
      } else {
        setSyncStatus("failed");
      }
    } catch (err) {
      setSyncStatus("failed");
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-2xl mx-auto w-full py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-zinc-900 dark:text-white leading-tight">Configurações de Conectividade</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Gerencie a conexão da API para funcionamento local/offline.</p>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
        {/* Toggle Server Mode */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Redirecionar para Servidor Local</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ative quando estiver no retiro para enviar os dados de vendas e estoque ao notebook central via Wi-Fi.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useLocalApi}
              onChange={(e) => setUseLocalApi(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:bg-zinc-300 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Input IP Address */}
        <div className={`space-y-2 transition-all duration-300 ${useLocalApi ? "opacity-100 max-h-40" : "opacity-40 pointer-events-none select-none"}`}>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Endereço IP do Notebook Servidor
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={localApiUrl}
              onChange={(e) => setLocalApiUrl(e.target.value)}
              placeholder="http://192.168.1.100:3001"
              disabled={!useLocalApi}
              className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={!useLocalApi || testStatus === "testing"}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 font-semibold text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {testStatus === "testing" && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
              {testStatus !== "testing" && <Wifi className="h-3.5 w-3.5" />}
              Testar Conexão
            </button>
          </div>

          {/* Test connection feedback */}
          {testStatus === "success" && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1.5 rounded-lg">
              <Check className="h-3.5 w-3.5" />
              Conexão com o Servidor Local realizada com sucesso! API online.
            </div>
          )}
          {testStatus === "failed" && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-650 dark:text-red-400 mt-1 bg-red-50 dark:bg-red-955/20 border border-red-100 dark:border-red-900/30 px-3 py-1.5 rounded-lg">
              <WifiOff className="h-3.5 w-3.5" />
              Falha na conexão. Verifique o endereço IP e se o Notebook está ligado e na mesma rede Wi-Fi.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-5">
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={syncStatus === "syncing"}
            className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-955/20 text-amber-600 dark:text-amber-455 border border-amber-100 dark:border-amber-900/30 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Solicita que o servidor force a sincronização de todo o banco de dados local imediatamente"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
            Sincronizar Banco de Dados Agora
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            Salvar Configurações
          </button>
        </div>

        {/* Global Save feedback */}
        {saveSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl text-xs font-semibold border border-emerald-100 dark:border-emerald-900/30 shadow-xs flex items-center gap-1.5">
            <Check className="h-4 w-4" />
            Configurações salvas! A partir de agora, o sistema usará as rotas configuradas.
          </div>
        )}
        {syncStatus === "success" && (
          <div className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl text-xs font-semibold border border-emerald-100 dark:border-emerald-900/30 shadow-xs flex items-center gap-1.5">
            <Check className="h-4 w-4" />
            Comando de sincronização enviado ao servidor com sucesso!
          </div>
        )}
        {syncStatus === "failed" && (
          <div className="bg-red-50 dark:bg-red-955/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold border border-red-100 dark:border-red-900/30 shadow-xs flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4" />
            Falha ao contatar a rota de sincronização do servidor. Verifique a conexão.
          </div>
        )}
      </div>

      {/* Connectivity guide box */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Como Usar no Retiro:</h4>
        <ul className="text-xs text-zinc-550 dark:text-zinc-400 space-y-2 list-decimal pl-4 leading-relaxed">
          <li>Conecte o notebook-servidor e os caixas/tablets na <strong>mesma rede Wi-Fi</strong>.</li>
          <li>Descubra o IP local do notebook (ex: rodando <code>ipconfig</code> no prompt do Windows do notebook).</li>
          <li>Nos tablets, acesse o painel, entre nesta página de configurações, ative o switch, insira o IP do notebook seguido da porta do backend (ex: <code>http://192.168.1.100:3001</code>) e clique em <strong>Salvar Configurações</strong>.</li>
          <li>Pronto! O tablet passa a realizar vendas e a atualizar o estoque diretamente no notebook, permitindo vendas offline seguras e estoques compartilhados.</li>
        </ul>
      </div>
    </div>
  );
}
