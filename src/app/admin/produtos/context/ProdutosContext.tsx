"use client";

import React, { createContext, useContext } from "react";
import { ProdutosContextType } from "../types";
import { useProdutosState } from "../hooks/useProdutosState";

const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);

export const ProdutosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useProdutosState();

  return (
    <ProdutosContext.Provider value={state}>
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = (): ProdutosContextType => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error("useProdutos must be used within a ProdutosProvider");
  }
  return context;
};
