"use client";

import React, { useState, useEffect } from "react";
import { useCustomers } from "../context/CustomerContext";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Phone, Mail, Award, CheckCircle } from "lucide-react";

export const AddEditCustomerModal = () => {
  const {
    isAddEditModalOpen,
    setIsAddEditModalOpen,
    customerToEdit,
    setCustomerToEdit,
    saveCustomer
  } = useCustomers();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state with selected user
  useEffect(() => {
    if (isAddEditModalOpen) {
      setError("");
      if (customerToEdit) {
        setFirstName(customerToEdit.firstName);
        setLastName(customerToEdit.lastName);
        setCpf(formatCpfString(customerToEdit.cpf));
        setPhone(customerToEdit.phone);
        setEmail(customerToEdit.email || "");
        setRole(customerToEdit.role);
      } else {
        setFirstName("");
        setLastName("");
        setCpf("");
        setPhone("");
        setEmail("");
        setRole("USER");
      }
    }
  }, [isAddEditModalOpen, customerToEdit]);

  const formatCpfString = (val: string) => {
    const rawVal = val.replace(/\D/g, "");
    let formatted = rawVal;
    if (rawVal.length > 3) {
      formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3)}`;
    }
    if (rawVal.length > 6) {
      formatted = `${formatted.slice(0, 7)}.${rawVal.slice(6)}`;
    }
    if (rawVal.length > 9) {
      formatted = `${formatted.slice(0, 11)}-${rawVal.slice(9, 11)}`;
    }
    return formatted.slice(0, 14);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCpfString(e.target.value));
  };

  const handleClose = () => {
    setIsAddEditModalOpen(false);
    setCustomerToEdit(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      setError("Por favor, digite um CPF válido de 11 dígitos.");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      await saveCustomer({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        cpf: cleanCpf,
        phone: phone.trim(),
        email: email.trim() || undefined,
        role: role as any
      });
      handleClose();
    } catch (err: any) {
      console.error("Failed to save user", err);
      // Custom conflict or validation message from backend
      setError(
        err.message || "Erro ao salvar dados do participante. Verifique se o CPF já está em uso."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isAddEditModalOpen}
      onClose={handleClose}
      title={customerToEdit ? "Editar Participante" : "Cadastrar Novo Cliente"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <p className="text-xs text-zinc-550 dark:text-zinc-400">
          {customerToEdit
            ? "Modifique os dados cadastrais deste usuário e salve para persistir as alterações."
            : "Insira os dados pessoais e selecione o cargo correspondente."}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-semibold border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nome"
            id="cust-first-name"
            placeholder="Ex: Pedro"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            icon={<User className="h-5 w-5" />}
          />

          <Input
            label="Sobrenome"
            id="cust-last-name"
            placeholder="Ex: Santos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            icon={<User className="h-5 w-5" />}
          />
        </div>

        <Input
          label="CPF"
          id="cust-cpf"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={handleCpfChange}
          required
        />

        <Input
          label="Telefone / WhatsApp"
          id="cust-phone"
          placeholder="Ex: 53999999999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          icon={<Phone className="h-5 w-5" />}
        />

        <Input
          label="E-mail (Opcional)"
          id="cust-email"
          type="email"
          placeholder="Ex: usuario@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="h-5 w-5" />}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="cust-role" className="text-zinc-600 dark:text-zinc-400 font-bold text-xs uppercase tracking-wider">
            Nível de Permissão / Cargo
          </label>
          <div className="relative">
            <select
              id="cust-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer font-semibold"
            >
              <option value="USER">Cliente (Apenas Compras)</option>
              <option value="ADMIN">Administrador (Acesso ao Painel e PDV)</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-400">
              <Award className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-4">
          <Button type="button" variant="secondary" onClick={handleClose} className="cursor-pointer">
            Cancelar
          </Button>
          <Button type="submit" loading={loading} className="cursor-pointer flex gap-2">
            <CheckCircle className="h-5 w-5" />
            Salvar Dados
          </Button>
        </div>
      </form>
    </Modal>
  );
};
