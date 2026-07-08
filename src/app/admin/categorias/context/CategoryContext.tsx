import React, { createContext, useContext } from "react";
import { UseCategoryStateReturn } from "../hooks/useCategoryState";

const CategoryContext = createContext<UseCategoryStateReturn | undefined>(undefined);

export const CategoryProvider: React.FC<{
  value: UseCategoryStateReturn;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
