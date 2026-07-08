import React from "react";
import { useLogin } from "../context/LoginContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserCheck, Lock } from "lucide-react";

export const LoginForm = () => {
  const {
    cpf,
    phone,
    setPhone,
    loading,
    handleSubmit,
    handleCpfChange
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Seu CPF"
        id="login-cpf"
        placeholder="000.000.000-00"
        value={cpf}
        onChange={handleCpfChange}
        required
        icon={<UserCheck className="h-5 w-5" />}
      />

      <Input
        label="Senha"
        id="login-phone"
        type="password"
        placeholder="Ex: 53999999999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        icon={<Lock className="h-5 w-5" />}
      />

      <Button type="submit" loading={loading} className="w-full py-3.5 cursor-pointer mt-2">
        Acessar Painel
      </Button>
    </form>
  );
};
