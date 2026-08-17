"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, useApi } from "@/hooks/useApi";
import { Search, UserPlus, UserCheck, Check, X } from "lucide-react";

interface CpfSearchSelectProps {
  value: string;
  onChange: (cpf: string, selectedUser?: User) => void;
  onAddNewUser: (cpf: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  autoFocus?: boolean;
}

export const CpfSearchSelect: React.FC<CpfSearchSelectProps> = ({
  value,
  onChange,
  onAddNewUser,
  placeholder = "Digite o CPF ou Nome...",
  disabled = false,
  label = "CPF do Participante *",
  id = "cpf-search-select",
  autoFocus = false,
}) => {
  const api = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sincronizar input value com prop value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Carregar todos os usuários do backend
  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        setLoading(true);
        const list = await api.getUsers();
        if (isMounted) {
          setUsers(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        console.error("Erro ao carregar lista de usuários:", err);
        if (isMounted) setUsers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatCpf = (val: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const isOnlyDigits = /^\d+$/.test(text.replace(/[.-]/g, ""));
    const formatted = isOnlyDigits ? formatCpf(text) : text;
    
    setInputValue(formatted);
    onChange(formatted);
    setIsOpen(true);

    // Se completou 11 dígitos, verifica se existe ou abre modal automático
    const cleanDigits = formatted.replace(/\D/g, "");
    if (cleanDigits.length === 11) {
      const match = users.find((u) => u.cpf.replace(/\D/g, "") === cleanDigits);
      if (match) {
        onChange(formatted, match);
        setIsOpen(false);
      } else {
        // Se não achou com 11 dígitos, dispara modal automático
        setIsOpen(false);
        onAddNewUser(formatted);
      }
    }
  };

  const handleSelectUser = (user: User) => {
    const formatted = formatCpf(user.cpf);
    setInputValue(formatted);
    onChange(formatted, user);
    setIsOpen(false);
  };

  const handleAddNew = () => {
    setIsOpen(false);
    onAddNewUser(inputValue);
  };

  // Filtragem
  const cleanInput = inputValue.trim().toLowerCase();
  const cleanDigits = cleanInput.replace(/\D/g, "");

  const filteredUsers = users.filter((u) => {
    if (!cleanInput) return true;
    const userCpfClean = (u.cpf || "").replace(/\D/g, "");
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    
    const matchCpf = cleanDigits ? userCpfClean.includes(cleanDigits) : false;
    const matchName = fullName.includes(cleanInput);
    return matchCpf || matchName;
  });

  const exactMatch = users.find(
    (u) => (u.cpf || "").replace(/\D/g, "") === cleanDigits && cleanDigits.length === 11
  );

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <UserCheck className="h-5 w-5" />
        </div>

        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          className="w-full pl-11 pr-10 py-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              onChange("");
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Menu com Resultados & Ação de Cadastrar */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-64 overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.slice(0, 6).map((u) => {
              const isSelected = (u.cpf || "").replace(/\D/g, "") === cleanDigits;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectUser(u)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">
                      {u.firstName} {u.lastName}
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">
                      CPF: {formatCpf(u.cpf)} {u.phone ? `• ${u.phone}` : ""}
                    </span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-indigo-600" />}
                </button>
              );
            })
          ) : (
            <div className="p-3 text-center text-xs text-zinc-400">
              Nenhum participante encontrado com &quot;{inputValue}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
