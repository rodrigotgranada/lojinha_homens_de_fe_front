import React, { createContext, useContext, ReactNode } from "react";
import { CustomerContextProps } from "../types";

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined);

export const CustomerProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: CustomerContextProps;
}) => {
  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
