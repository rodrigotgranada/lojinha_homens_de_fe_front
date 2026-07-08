import React, { createContext, useContext, ReactNode } from "react";
import { PdvContextProps } from "../types";

const PdvContext = createContext<PdvContextProps | undefined>(undefined);

export const PdvProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: PdvContextProps;
}) => {
  return (
    <PdvContext.Provider value={value}>
      {children}
    </PdvContext.Provider>
  );
};

export const usePdv = () => {
  const context = useContext(PdvContext);
  if (!context) {
    throw new Error("usePdv must be used within a PdvProvider");
  }
  return context;
};
