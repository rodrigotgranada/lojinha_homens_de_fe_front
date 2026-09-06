"use client";

import React from "react";
import { CpfSearchSelect } from "../ui/CpfSearchSelect";

interface CartCustomerSelectorProps {
  cpf: string;
  setCpf: (cpf: string) => void;
  disabled: boolean;
  onAddNewUser: (cpf: string) => void;
}

export const CartCustomerSelector: React.FC<CartCustomerSelectorProps> = ({
  cpf,
  setCpf,
  disabled,
  onAddNewUser,
}) => {
  return (
    <CpfSearchSelect
      label="CPF do Cliente *"
      id="cart-client-cpf"
      placeholder="Digite CPF ou Nome do cliente..."
      value={cpf}
      onChange={(newCpf) => {
        setCpf(newCpf);
      }}
      onAddNewUser={onAddNewUser}
      disabled={disabled}
    />
  );
};
