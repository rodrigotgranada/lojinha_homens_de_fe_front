"use client";

import React, { createContext, useContext } from "react";
import { PrestacaoContasContextType } from "../types";
import { usePrestacaoContasState } from "../hooks/usePrestacaoContasState";

const PrestacaoContasContext = createContext<PrestacaoContasContextType | undefined>(undefined);

export const PrestacaoContasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = usePrestacaoContasState();

  return (
    <PrestacaoContasContext.Provider value={state}>
      {children}
    </PrestacaoContasContext.Provider>
  );
};

export const usePrestacaoContas = (): PrestacaoContasContextType => {
  const context = useContext(PrestacaoContasContext);
  if (!context) {
    throw new Error("usePrestacaoContas must be used within a PrestacaoContasProvider");
  }
  return context;
};
