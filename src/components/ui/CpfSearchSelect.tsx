"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { Search, UserPlus, UserCheck, Check, X, UserPlus2, Loader2, Sparkles } from "lucide-react";
import { normalizeString } from "@/utils/stringUtils";

interface CpfSearchSelectProps {
  value: string;
  onChange: (cpf: string, selectedUser?: User) => void;
  onAddNewUser: (cpf: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  autoFocus?: boolean;
  eventId?: string;
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
  eventId,
}) => {
  const api = useApi();
  const { activeEvent } = useApp();
  const currentEventId = eventId || activeEvent?.id;

  const [users, setUsers] = useState<User[]>([]);
  const [globalSearchResults, setGlobalSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchingGlobal, setSearchingGlobal] = useState(false);
  const [linkingId, setLinkingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sincronizar input value com prop value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Carregar os participantes do evento ativo (ou todos caso não haja evento)
  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        setLoading(true);
        const list = await api.getUsers(currentEventId);
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
  }, [api, currentEventId]);

  // Escutar novos usuários cadastrados sem precisar recarregar a tela
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUserAdded = (e: any) => {
      if (e.detail) {
        setUsers((prev) => [...prev, e.detail]);
      }
    };

    window.addEventListener("user_added", handleUserAdded);
    return () => window.removeEventListener("user_added", handleUserAdded);
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

  // Busca global na base geral com debounce
  const triggerGlobalSearch = (query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const clean = query.trim();
    if (clean.length < 3 || !currentEventId) {
      setGlobalSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setSearchingGlobal(true);
        const results = await api.searchUsers(clean, currentEventId);
        // Filtrar apenas os que NÃO estão já na lista de participantes confirmados
        const localUserIds = new Set(users.map((u) => u.id));
        const notInEvent = (Array.isArray(results) ? results : []).filter(
          (u) => !localUserIds.has(u.id) && !u.isParticipantInEvent
        );
        setGlobalSearchResults(notInEvent);
      } catch (err) {
        console.error("Erro na busca global de usuários:", err);
        setGlobalSearchResults([]);
      } finally {
        setSearchingGlobal(false);
      }
    }, 350);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const isOnlyDigits = /^\d+$/.test(text.replace(/[.-]/g, ""));
    const formatted = isOnlyDigits ? formatCpf(text) : text;

    setInputValue(formatted);
    onChange(formatted);
    setIsOpen(true);

    triggerGlobalSearch(formatted);

    // Se completou 11 dígitos, verifica se existe localmente ou busca
    const cleanDigits = formatted.replace(/\D/g, "");
    if (cleanDigits.length === 11) {
      const match = users.find((u) => u.cpf.replace(/\D/g, "") === cleanDigits);
      if (match) {
        onChange(formatted, match);
        setIsOpen(false);
      }
    }
  };

  const handleSelectUser = (user: User) => {
    const formatted = formatCpf(user.cpf);
    setInputValue(formatted);
    onChange(formatted, user);
    setIsOpen(false);
  };

  const handleLinkAndSelectUser = async (user: User) => {
    if (!currentEventId) {
      handleSelectUser(user);
      return;
    }

    try {
      setLinkingId(user.id);
      const linkedUser = await api.linkUserToEvent(user.id, currentEventId, "ACAMPANTE");
      // Adicionar à lista de participantes locais
      setUsers((prev) => [...prev, linkedUser]);
      // Remover dos resultados globais
      setGlobalSearchResults((prev) => prev.filter((u) => u.id !== user.id));
      // Selecionar o usuário
      handleSelectUser(linkedUser);
    } catch (err) {
      console.error("Erro ao vincular participante ao evento:", err);
      // Fallback: seleciona mesmo com erro
      handleSelectUser(user);
    } finally {
      setLinkingId(null);
    }
  };

  // Filtragem local entre os participantes do evento
  const cleanInput = normalizeString(inputValue.trim());
  const cleanDigits = inputValue.replace(/\D/g, "");

  const filteredEventUsers = users.filter((u) => {
    if (!cleanInput) return true;
    const userCpfClean = (u.cpf || "").replace(/\D/g, "");
    const fullName = normalizeString(`${u.firstName || ""} ${u.lastName || ""}`);

    const matchCpf = cleanDigits ? userCpfClean.includes(cleanDigits) : false;
    const matchName = fullName.includes(cleanInput);
    return matchCpf || matchName;
  });

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
          {activeEvent && (
            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/60">
              {activeEvent.name}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <UserCheck className="h-5 w-5" />
        </div>

        <input
          id={id}
          name={`search-cpf-${Math.random()}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="nope"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          data-form-type="other"
          className="w-full pl-11 pr-10 py-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              onChange("");
              setGlobalSearchResults([]);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Menu com Resultados & Ação de Cadastrar */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-72 overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 space-y-1.5">
          {/* SEÇÃO 1: Participantes Confirmados no Evento Ativo */}
          {filteredEventUsers.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Confirmados neste Retiro ({filteredEventUsers.length})
              </div>
              <div className="space-y-1">
                {filteredEventUsers.slice(0, 5).map((u) => {
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
                      <div className="flex items-center gap-2">
                        {u.participantType && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold">
                            {u.participantType}
                          </span>
                        )}
                        {isSelected && <Check className="h-4 w-4 text-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEÇÃO 2: Encontrados na Base Geral (Retiros Anteriores) */}
          {globalSearchResults.length > 0 && (
            <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
              <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Base Geral / Retiros Anteriores (Não Vinculado a este Retiro)
              </div>
              <div className="space-y-1">
                {globalSearchResults.slice(0, 4).map((u) => (
                  <div
                    key={u.id}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {u.firstName} {u.lastName}
                      </span>
                      <span className="text-zinc-400 font-mono text-[11px]">
                        CPF: {formatCpf(u.cpf)} {u.phone ? `• ${u.phone}` : ""}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={linkingId === u.id}
                      onClick={() => handleLinkAndSelectUser(u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {linkingId === u.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Vinculando...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus2 className="w-3.5 h-3.5" />
                          <span>Vincular e Selecionar</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEÇÃO 3: Mensagem caso nada seja encontrado e botão de novo cadastro */}
          {filteredEventUsers.length === 0 && globalSearchResults.length === 0 && (
            <div className="p-3 text-center space-y-2">
              <p className="text-xs text-zinc-400">
                {searchingGlobal ? (
                  <span className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Buscando na base geral...
                  </span>
                ) : (
                  <>Nenhum participante encontrado com &quot;{inputValue}&quot;</>
                )}
              </p>
              {cleanDigits.length >= 3 && !searchingGlobal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onAddNewUser(inputValue);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Cadastrar Novo Participante
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
