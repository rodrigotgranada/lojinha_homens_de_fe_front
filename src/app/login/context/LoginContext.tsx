import React, { createContext, useContext, ReactNode } from "react";
import { LoginContextProps } from "../types";

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: LoginContextProps;
}) => {
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
