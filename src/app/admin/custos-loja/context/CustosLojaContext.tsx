"use client";

import React, { createContext, useContext } from "react";
import { CustosLojaContextType } from "../types";
import { useCustosLojaState } from "../hooks/useCustosLojaState";

const CustosLojaContext = createContext<CustosLojaContextType | undefined>(undefined);

export const CustosLojaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useCustosLojaState();

  return (
    <CustosLojaContext.Provider value={state}>
      {children}
    </CustosLojaContext.Provider>
  );
};

export const useCustosLoja = (): CustosLojaContextType => {
  const context = useContext(CustosLojaContext);
  if (!context) {
    throw new Error("useCustosLoja must be used within a CustosLojaProvider");
  }
  return context;
};
