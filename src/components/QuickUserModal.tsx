"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useApi, User } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { UserPlus, Phone, User as UserIcon, Mail, CheckCircle, ArrowLeft } from "lucide-react";

interface QuickUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  cpf: string;
  onSuccess: (user: User) => void;
}

export const QuickUserModal: React.FC<QuickUserModalProps> = ({
  isOpen,
  onClose,
  cpf,
  onSuccess,
}) => {
  const api = useApi();
  const { currentUser } = useApp();
  
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync prefilled CPF and reset steps
  useEffect(() => {
    if (isOpen) {
      setError("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setStep("form");
    }
  }, [isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setError("");
    setStep("confirm");
  };

  const handleConfirmRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const newUser = await api.createUser({
        cpf: cpf.replace(/\D/g, ""), // clean non-digits
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        role: "USER",
        email: email.trim() || undefined,
        createdBy: currentUser?.id,
      });

      onSuccess(newUser);
      onClose();
    } catch (err) {
      console.error("Failed to register customer", err);
      // Fallback local registry if server is down
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        cpf: cpf.replace(/\D/g, ""),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        role: "USER",
        email: email.trim() || undefined,
        createdBy: currentUser?.id,
      };
      onSuccess(fallbackUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const formatCpf = (c: string) => {
    const clean = c.replace(/\D/g, "");
    if (clean.length !== 11) return c;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === "form" ? "Cadastro Rápido de Cliente" : "Confirmar Dados do Cliente"}>
      {step === "form" ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <p className="text-sm text-zinc-550 dark:text-zinc-400">
            O CPF <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatCpf(cpf)}</span> não foi localizado. Cadastre o cliente rapidamente para concluir a venda.
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-semibold border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <Input
            label="Nome"
            id="quick-first-name"
            placeholder="Ex: Carlos"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            icon={<UserIcon className="h-5 w-5" />}
          />

          <Input
            label="Sobrenome"
            id="quick-last-name"
            placeholder="Ex: Silva"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            icon={<UserIcon className="h-5 w-5" />}
          />

          <Input
            label="CPF"
            id="quick-cpf"
            value={formatCpf(cpf)}
            disabled
            readOnly
          />

          <Input
            label="Telefone / WhatsApp"
            id="quick-phone"
            placeholder="Ex: 53999999999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            icon={<Phone className="h-5 w-5" />}
          />

          <Input
            label="E-mail (Opcional)"
            id="quick-email"
            type="email"
            placeholder="Ex: cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-5 w-5" />}
          />

          <div className="flex gap-3 justify-end mt-4">
            <Button type="button" variant="secondary" onClick={onClose} className="cursor-pointer">
              Cancelar
            </Button>
            <Button type="submit" className="cursor-pointer flex gap-2">
              Avançar
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-zinc-550 dark:text-zinc-400">
            Revise as informações do participante antes de confirmar a gravação de dados.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-5 space-y-4 text-sm font-semibold">
            <div className="flex justify-between">
              <span className="text-zinc-450">Nome Completo:</span>
              <span className="text-zinc-950 dark:text-white font-bold">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-450">CPF:</span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200">{formatCpf(cpf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-450">Telefone:</span>
              <span className="text-zinc-800 dark:text-zinc-200">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-450">E-mail:</span>
              <span className="text-zinc-800 dark:text-zinc-200">
                {email.trim() ? email : <span className="italic text-zinc-300 dark:text-zinc-700">Não informado</span>}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-semibold border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setStep("form")}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              Editar Dados
            </button>
            <button
              onClick={handleConfirmRegister}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Cadastrando...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4.5 w-4.5" />
                  <span>Confirmar Cadastro</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
