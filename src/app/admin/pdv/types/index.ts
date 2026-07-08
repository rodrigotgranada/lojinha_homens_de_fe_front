import { Product } from "@/hooks/useApi";

export interface PdvContextProps {
  products: Product[];
  search: string;
  setSearch: (search: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  loadingContent: boolean;
  activeTab: "catalog" | "cart";
  setActiveTab: (tab: "catalog" | "cart") => void;
  filteredProducts: Product[];
}
