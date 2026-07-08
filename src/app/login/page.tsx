"use client";

import React from "react";
import { useLoginState } from "./hooks/useLoginState";
import { LoginProvider } from "./context/LoginContext";
import { LoginHeader } from "./components/LoginHeader";
import { LoginForm } from "./components/LoginForm";
import { LoginCredentialsAlert } from "./components/LoginCredentialsAlert";
import { ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const loginState = useLoginState();
  const { error } = loginState;

  return (
    <LoginProvider value={loginState}>
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-6">
          {/* Header */}
          <LoginHeader />

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 dark:bg-red-955/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-semibold border border-red-100 dark:border-red-900/30 flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <LoginForm />

          {/* Seed Alert */}
          <LoginCredentialsAlert />
        </div>
      </div>
    </LoginProvider>
  );
}
