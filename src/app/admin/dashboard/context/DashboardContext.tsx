import React, { createContext, useContext, ReactNode } from "react";
import { DashboardContextProps } from "../types";

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: DashboardContextProps;
}) => {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
