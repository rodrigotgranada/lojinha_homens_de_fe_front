import { useState, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export const useLoginState = () => {
  const { loginUser } = useApp();
  const router = useRouter();

  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Format CPF as 999.999.999-99
  const handleCpfChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
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
    setCpf(formatted.slice(0, 14));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanCpf = cpf.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");

    // Developer backdoor or standard validation
    if (cleanCpf !== "admin" && cleanCpf.length !== 11) {
      setError("Por favor, digite um CPF válido (11 dígitos).");
      return;
    }

    if (cleanCpf !== "admin" && !cleanPhone) {
      setError("Por favor, informe a senha (número do celular).");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(cleanCpf, cleanPhone);
      if (user) {
        if (user.role === "ADMIN") {
          router.push("/admin");
        } else {
          setError("Acesso negado. Apenas administradores podem fazer login.");
        }
      } else {
        setError("CPF de administrador não localizado.");
      }
    } catch (err: any) {
      console.error("Login submission failed", err);
      setError(err.message || "Erro ao autenticar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [cpf, phone, loginUser, router]);

  return {
    cpf,
    setCpf,
    phone,
    setPhone,
    error,
    setError,
    loading,
    handleSubmit,
    handleCpfChange
  };
};
