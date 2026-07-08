import React from "react";
import { LogIn } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-2">
        <LogIn className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-black text-zinc-955 dark:text-white">Identifique-se</h2>
      <p className="text-sm text-zinc-550 dark:text-zinc-400">
        Área administrativa exclusiva. Acesse com seu CPF e celular cadastrado.
      </p>
    </div>
  );
};
