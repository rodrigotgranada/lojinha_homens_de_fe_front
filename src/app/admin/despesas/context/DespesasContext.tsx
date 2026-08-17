"use client";

import React, { createContext, useContext } from "react";
import { DespesasContextType } from "../types";
import { useDespesasState } from "../hooks/useDespesasState";

const DespesasContext = createContext<DespesasContextType | undefined>(undefined);

export const DespesasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useDespesasState();

  return (
    <DespesasContext.Provider value={state}>
      {children}
    </DespesasContext.Provider>
  );
};

export const useDespesas = (): DespesasContextType => {
  const context = useContext(DespesasContext);
  if (!context) {
    throw new Error("useDespesas must be used within a DespesasProvider");
  }
  return context;
};
