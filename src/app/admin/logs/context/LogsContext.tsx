"use client";

import React, { createContext, useContext } from "react";
import { LogsContextType } from "../types";
import { useLogsState } from "../hooks/useLogsState";

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useLogsState();
  return (
    <LogsContext.Provider value={state}>
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = (): LogsContextType => {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error("useLogs must be used within a LogsProvider");
  }
  return context;
};
