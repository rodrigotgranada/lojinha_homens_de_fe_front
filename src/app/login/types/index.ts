import React from "react";

export interface LoginContextProps {
  cpf: string;
  setCpf: (cpf: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCpfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
