import React, { createContext, useContext, ReactNode } from "react";
import { SalesContextProps } from "../types";

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: SalesContextProps;
}) => {
  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};
