import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserCheck, Lock, Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const {
    cpf,
    phone,
    setPhone,
    loading,
    handleSubmit,
    handleCpfChange
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

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
        type={showPassword ? "text" : "password"}
        placeholder="Ex: 53999999999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        icon={<Lock className="h-5 w-5" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
      />

      <Button type="submit" loading={loading} className="w-full py-3.5 cursor-pointer mt-2">
        Acessar Painel
      </Button>
    </form>
  );
};
