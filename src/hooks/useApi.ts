import { useMemo } from "react";
import { productService } from "@/services/productService";
import { userService } from "@/services/eventService";
import { eventService } from "@/services/eventService";
import { saleService } from "@/services/saleService";
import { categoryService } from "@/services/eventService";
import { expenseService } from "@/services/expenseService";

export * from "@/types";

export const useApi = () => {
  return useMemo(
    () => ({
      ...productService,
      ...userService,
      ...eventService,
      ...saleService,
      ...categoryService,
      ...expenseService,
    }),
    []
  );
};
