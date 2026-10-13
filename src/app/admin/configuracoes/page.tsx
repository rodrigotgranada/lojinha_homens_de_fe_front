"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  ShieldAlert,
  Settings,
  Wifi,
  WifiOff,
  RefreshCw,
  Save,
  Check,
  QrCode,
  Building2,
  User,
  Plus,
  Trash2,
  Edit3,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { paymentConfigService } from "@/services/paymentConfigService";
import { PaymentConfig, CreatePaymentConfigPayload } from "@/types";

export default function ConfiguracoesAdminPage() {
  const { currentUser } = useApp();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"pix" | "connectivity">("pix");

  // Connectivity states
  const [useLocalApi, setUseLocalApi] = useState(false);
  const [localApiUrl, setLocalApiUrl] = useState("http://192.168.1.100:3001");
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "failed">("idle");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // PIX Config states
  const [pixConfigs, setPixConfigs] = useState<PaymentConfig[]>([]);
  const [loadingPix, setLoadingPix] = useState(true);
  const [savingPix, setSavingPix] = useState(false);
  const [pixFeedback, setPixFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form state for creating/editing PIX
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formPixKey, setFormPixKey] = useState("homensdefe.pel@gmail.com");
  const [formKeyType, setFormKeyType] = useState("EMAIL");
  const [formMerchantName, setFormMerchantName] = useState("Alcides");
  const [formBankName, setFormBankName] = useState("Nubank");
  const [formCity, setFormCity] = useState("Pelotas");
  const [formDescription, setFormDescription] = useState("Chave Oficial do Retiro");
  const [formIsDefault, setFormIsDefault] = useState(true);

  // Load connectivity preferences
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

  // Load PIX configurations from DB
  const loadPixConfigs = async () => {
    try {
      setLoadingPix(true);
      const data = await paymentConfigService.getAll();
      setPixConfigs(data);

      // Se houver uma padrão, pré-preenche o formulário se não estiver em edição manual
      const defaultItem = data.find((c) => c.isDefault) || data[0];
      if (defaultItem && !editingId) {
        setFormPixKey(defaultItem.pixKey);
        setFormKeyType(defaultItem.keyType || "EMAIL");
        setFormMerchantName(defaultItem.merchantName);
        setFormBankName(defaultItem.bankName || "");
        setFormCity(defaultItem.city || "");
        setFormDescription(defaultItem.description || "");
      }
    } catch (err) {
      console.error("Erro ao carregar configurações PIX:", err);
    } finally {
      setLoadingPix(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      loadPixConfigs();
    }
  }, [currentUser]);

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

  // Handle Connectivity Save
  const handleSaveConnectivity = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("use_local_api", String(useLocalApi));
      window.localStorage.setItem("local_api_url", localApiUrl.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    try {
      const res = await fetch(`${localApiUrl.trim()}/sync/health`, {
        signal: AbortSignal.timeout(4000),
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
      const url = useLocalApi
        ? localApiUrl.trim()
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${url}/sync/trigger`, {
        method: "POST",
        signal: AbortSignal.timeout(6000),
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

  // Handle PIX Form Submit (Create or Update)
  const handleSubmitPix = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPixKey.trim() || !formMerchantName.trim()) {
      setPixFeedback({
        type: "error",
        message: "Chave PIX e Nome do Favorecido são campos obrigatórios.",
      });
      return;
    }

    try {
      setSavingPix(true);
      setPixFeedback(null);

      const payload: CreatePaymentConfigPayload = {
        pixKey: formPixKey.trim(),
        keyType: formKeyType,
        merchantName: formMerchantName.trim(),
        bankName: formBankName.trim(),
        city: formCity.trim(),
        description: formDescription.trim(),
        isDefault: formIsDefault,
      };

      if (editingId) {
        await paymentConfigService.update(editingId, payload);
        setPixFeedback({
          type: "success",
          message: "Chave PIX atualizada com sucesso no banco de dados!",
        });
      } else {
        await paymentConfigService.create(payload);
        setPixFeedback({
          type: "success",
          message: "Nova chave PIX cadastrada e ativada com sucesso!",
        });
      }

      await loadPixConfigs();
      setEditingId(null);
      setTimeout(() => setPixFeedback(null), 4000);
    } catch (err: any) {
      console.error("Erro ao salvar PIX:", err);
      setPixFeedback({
        type: "error",
        message: err.message || "Erro ao salvar configuração no servidor.",
      });
    } finally {
      setSavingPix(false);
    }
  };

  const handleStartEdit = (config: PaymentConfig) => {
    setEditingId(config.id || (config as any)._id);
    setFormPixKey(config.pixKey);
    setFormKeyType(config.keyType || "EMAIL");
    setFormMerchantName(config.merchantName);
    setFormBankName(config.bankName || "");
    setFormCity(config.city || "");
    setFormDescription(config.description || "");
    setFormIsDefault(config.isDefault);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetDefaultPix = async (id: string) => {
    try {
      await paymentConfigService.setDefault(id);
      await loadPixConfigs();
      setPixFeedback({
        type: "success",
        message: "Chave principal de cobrança atualizada com sucesso!",
      });
      setTimeout(() => setPixFeedback(null), 3000);
    } catch (err: any) {
      alert("Erro ao definir chave padrão: " + err.message);
    }
  };

  const handleDeletePix = async (id: string) => {
    if (pixConfigs.length <= 1) {
      alert("Não é possível excluir a única chave PIX cadastrada no sistema.");
      return;
    }
    const confirm = window.confirm("Deseja realmente remover esta chave PIX?");
    if (confirm) {
      try {
        await paymentConfigService.delete(id);
        await loadPixConfigs();
      } catch (err: any) {
        alert("Erro ao remover chave: " + err.message);
      }
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormPixKey("");
    setFormKeyType("EMAIL");
    setFormMerchantName("");
    setFormBankName("");
    setFormCity("");
    setFormDescription("");
    setFormIsDefault(true);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-150 dark:border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-white leading-tight">
              Configurações do Sistema
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gerencie dados de pagamento PIX e conectividade de rede.
            </p>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("pix")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "pix"
                ? "bg-white dark:bg-zinc-850 text-indigo-600 dark:text-indigo-400 shadow-xs border border-zinc-200/80 dark:border-zinc-700/60"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <QrCode className="h-4 w-4" />
            <span>Chave PIX & Pagamentos</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("connectivity")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "connectivity"
                ? "bg-white dark:bg-zinc-850 text-indigo-600 dark:text-indigo-400 shadow-xs border border-zinc-200/80 dark:border-zinc-700/60"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Wifi className="h-4 w-4" />
            <span>Servidor Offline</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: PIX & PAGAMENTOS ================= */}
      {activeTab === "pix" && (
        <div className="space-y-6">
          {/* Feedback Banner */}
          {pixFeedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                pixFeedback.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-955/25 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-red-50 dark:bg-red-955/25 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              }`}
            >
              {pixFeedback.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
              )}
              <span>{pixFeedback.message}</span>
            </div>
          )}

          {/* Form and Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-emerald-600" />
                    {editingId ? "Editar Chave PIX" : "Cadastrar Chave PIX"}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Estes dados são enviados automaticamente na mensagem de cobrança do WhatsApp.
                  </p>
                </div>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer underline"
                  >
                    Cancelar Edição
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmitPix} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      Chave PIX *
                    </label>
                    <input
                      type="text"
                      required
                      value={formPixKey}
                      onChange={(e) => setFormPixKey(e.target.value)}
                      placeholder="homensdefe.pel@gmail.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      Tipo de Chave
                    </label>
                    <select
                      value={formKeyType}
                      onChange={(e) => setFormKeyType(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <option value="EMAIL">E-mail</option>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>
                      <option value="TELEFONE">Telefone</option>
                      <option value="ALEATORIA">Chave Aleatória</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-zinc-400" />
                      Nome do Favorecido *
                    </label>
                    <input
                      type="text"
                      required
                      value={formMerchantName}
                      onChange={(e) => setFormMerchantName(e.target.value)}
                      placeholder="Alcides"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                      Banco do Favorecido *
                    </label>
                    <input
                      type="text"
                      required
                      value={formBankName}
                      onChange={(e) => setFormBankName(e.target.value)}
                      placeholder="Nubank, Banco do Brasil, Inter..."
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      Cidade (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="Pelotas"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      Identificação / Descrição
                    </label>
                    <input
                      type="text"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Chave Oficial do Retiro"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formIsDefault}
                      onChange={(e) => setFormIsDefault(e.target.checked)}
                      className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Definir como chave principal ativa
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={savingPix}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    {savingPix ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{editingId ? "Atualizar Chave" : "Salvar Chave PIX"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live WhatsApp Simulation Card */}
            <div className="lg:col-span-5 bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-black text-emerald-900 dark:text-emerald-300">
                    Pré-visualização no WhatsApp
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Ao vivo
                </span>
              </div>

              {/* Chat Bubble simulation */}
              <div className="bg-white dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-700/60 rounded-2xl p-4 text-xs space-y-2.5 text-zinc-800 dark:text-zinc-200 shadow-sm leading-relaxed font-sans">
                <p>
                  Olá, <strong>Carlos Eduardo</strong>! Tudo bem? A paz do Senhor! 🙏
                </p>
                <p>
                  Aqui é da equipe da <strong>Lojinha Homens de Fé</strong>.
                </p>
                <p>
                  No fechamento do caixa da lojinha, identificamos no seu cadastro uma pendência no valor de <strong className="text-amber-600 dark:text-amber-400">R$ 60,00</strong>.
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Se estiver tudo certinho, pedimos por gentileza que realize o acerto através da nossa chave PIX:
                </p>

                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 space-y-1 font-mono text-[11px]">
                  <p>
                    🔑 <strong>Chave PIX:</strong> {formPixKey || "chave@pix.com"}
                  </p>
                  <p>
                    👤 <strong>Favorecido:</strong> {formMerchantName || "Nome do Titular"}
                  </p>
                  {formBankName && (
                    <p>
                      🏦 <strong>Banco:</strong> {formBankName}
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Assim que efetuar o pagamento, por favor nos envie o comprovante por aqui para que possamos dar a baixa no sistema.
                </p>
                <p>Muito obrigado pela compreensão e que Deus abençoe! 🙌</p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  O valor cobrado é sempre <strong>estritamente o saldo em aberto</strong>, ignorando compras já quitadas!
                </span>
              </div>
            </div>
          </div>

          {/* List of Registered PIX Keys */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white">
                Chaves PIX Cadastradas ({pixConfigs.length})
              </h3>
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Nova Chave</span>
              </button>
            </div>

            {loadingPix ? (
              <div className="py-8 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
                <span>Carregando chaves cadastradas...</span>
              </div>
            ) : pixConfigs.length === 0 ? (
              <p className="text-center py-6 text-xs text-zinc-400">
                Nenhuma chave cadastrada.
              </p>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {pixConfigs.map((config) => {
                  const id = config.id || (config as any)._id;
                  return (
                    <div
                      key={id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {config.pixKey}
                          </span>
                          {config.isDefault ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                              Principal / Ativa
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultPix(id)}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
                            >
                              Tornar Principal
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                          <span>
                            Favorecido: <strong>{config.merchantName}</strong>
                          </span>
                          {config.bankName && (
                            <span>
                              Banco: <strong>{config.bankName}</strong>
                            </span>
                          )}
                          {config.description && (
                            <span className="italic text-zinc-400">({config.description})</span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(config)}
                          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl transition-all cursor-pointer"
                          title="Editar Chave"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePix(id)}
                          disabled={config.isDefault}
                          className="p-2 hover:bg-rose-50 dark:hover:bg-rose-955/30 text-rose-500 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Remover Chave"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: CONECTIVIDADE / SERVIDOR OFFLINE ================= */}
      {activeTab === "connectivity" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
          {/* Toggle Server Mode */}
          <div className="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Redirecionar para Servidor Local
              </h3>
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
          <div
            className={`space-y-2 transition-all duration-300 ${
              useLocalApi ? "opacity-100 max-h-40" : "opacity-40 pointer-events-none select-none"
            }`}
          >
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
              onClick={handleSaveConnectivity}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              Salvar Configurações
            </button>
          </div>

          {/* Connectivity feedback */}
          {saveSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl text-xs font-semibold border border-emerald-100 dark:border-emerald-900/30 shadow-xs flex items-center gap-1.5">
              <Check className="h-4 w-4" />
              Configurações salvas! A partir de agora, o sistema usará as rotas configuradas.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
