"use client";

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Product, LogEntry } from "@/hooks/useApi";
import { productService } from "@/services/productService";
import { uploadService } from "@/services/uploadService";
import { logService } from "@/services/logService";
import { ActiveTab, ModalMode, ProdutosContextType, SortDir, SortField } from "../types";

export const useProdutosState = (): ProdutosContextType => {
  const { currentUser, isLoading } = useApp();
  const api = useApi();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Alimentação", "Vestuário", "Livros", "Acessórios", "Outros"]);
  const [loadingContent, setLoadingContent] = useState(true);

  // Form fields
  const [productId, setProductId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPriceState] = useState("");
  const [costPrice, setCostPriceState] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [initialStock, setInitialStock] = useState("");

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "0,00";
    const numberValue = parseInt(digits, 10);
    const floatValue = numberValue / 100;
    return floatValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const setPrice = (val: string) => {
    setPriceState(formatCurrency(val));
  };

  const setCostPrice = (val: string) => {
    setCostPriceState(formatCurrency(val));
  };
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("5");
  const [category, setCategory] = useState("Outros");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Individual product log states
  const [productLogs, setProductLogs] = useState<LogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Image Cropper States
  const [cropperFile, setCropperFile] = useState<File | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("view");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Custom confirmation modal states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productNameToDelete, setProductNameToDelete] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [cameFromView, setCameFromView] = useState(false);

  // New confirmation and active states for soft delete/reactivate
  const [confirmAction, setConfirmAction] = useState<"activate" | "deactivate">("deactivate");
  const [productActive, setProductActive] = useState<boolean>(true);

  // Tab View state
  const [activeTab, setActiveTab] = useState<ActiveTab>("ativos");

  // Search + Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const applySearchAndSort = (list: typeof products) => {
    let result = list;
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q)
      );
    }
    // Sort
    if (sortField) {
      result = [...result].sort((a, b) => {
        let av: string | number, bv: string | number;
        if (sortField === "name") {
          av = a.name.toLowerCase();
          bv = b.name.toLowerCase();
        } else if (sortField === "price") {
          av = a.price;
          bv = b.price;
        } else {
          av = a.stock;
          bv = b.stock;
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  };

  const activeProducts = applySearchAndSort(products.filter((p) => p.active !== false));
  const inactiveProducts = applySearchAndSort(products.filter((p) => p.active === false));

  const fetchProducts = useCallback(async () => {
    setLoadingContent(true);
    try {
      const [prodList, catList] = await Promise.all([
        productService.getAllProducts(),
        api.getCategories()
      ]);
      setProducts(prodList);
      setCategories([...new Set([...catList.map((c) => c.name), "Outros"])]);
    } catch (err) {
      console.warn("Could not fetch products. Falling back to local data.", err);
      try {
        const prodList = await productService.getAllProducts();
        setProducts(prodList);
      } catch {
        setProducts([
          { id: "prod-1", name: "Camiseta Oficial Retiro", price: 60.0, stock: 50, imageUrl: "", active: true },
          { id: "prod-2", name: "Bíblia de Estudos Nova", price: 120.0, stock: 15, imageUrl: "", active: true },
          { id: "prod-3", name: "Garrafa Térmica Homens de Fé", price: 45.0, stock: 4, imageUrl: "", active: true }
        ]);
      }
      setCategories(["Alimentação", "Vestuário", "Livros", "Acessórios", "Outros"]);
    } finally {
      setLoadingContent(false);
    }
  }, [api]);

  useEffect(() => {
    if (!isLoading && currentUser?.role === "ADMIN") {
      fetchProducts();
    }
  }, [isLoading, currentUser, fetchProducts]);

  // Real-time stock sync via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStockUpdate = (e: Event) => {
      const { productId, newStock } = (e as CustomEvent).detail;
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
      );
    };

    window.addEventListener("product_stock_updated", handleStockUpdate);
    return () => {
      window.removeEventListener("product_stock_updated", handleStockUpdate);
    };
  }, []);

  // Real-time status sync via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStatusUpdate = (e: Event) => {
      const { productId, active } = (e as CustomEvent).detail;
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, active } : p))
      );
    };

    window.addEventListener("product_status_updated", handleStatusUpdate);
    return () => {
      window.removeEventListener("product_status_updated", handleStatusUpdate);
    };
  }, []);

  // Real-time general product updates via custom WS event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleProductUpdate = (e: Event) => {
      const updatedProduct = (e as CustomEvent).detail as Product;
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    };

    window.addEventListener("product_updated", handleProductUpdate);
    return () => {
      window.removeEventListener("product_updated", handleProductUpdate);
    };
  }, []);

  const handleOpenAddModal = () => {
    setCameFromView(false);
    setProductId(null);
    setName("");
    setPrice("");
    setCostPriceState("");
    setSponsorName("");
    setInitialStock("");
    setStock("");
    setMinStock("5");
    setCategory("Outros");
    setImageUrl("");
    setImageFile(null);
    setImagePreview(null);
    setFormError("");
    setProductActive(true);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setCameFromView(false);
    setProductId(product.id);
    setName(product.name);
    setPrice(product.price.toFixed(2).replace(".", ","));
    setCostPriceState((product.costPrice ?? 0).toFixed(2).replace(".", ","));
    setSponsorName(product.sponsorName || "");
    setInitialStock((product.initialStock ?? product.stock).toString());
    setStock(product.stock.toString());
    setMinStock((product.minStock ?? 5).toString());
    setCategory(product.category ?? "Outros");
    setImageUrl(product.imageUrl);
    setImageFile(null);
    setImagePreview(product.imageUrl || null);
    setFormError("");
    setProductActive(product.active !== false);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (product: Product) => {
    setCameFromView(true);
    setProductId(product.id);
    setName(product.name);
    setPrice(product.price.toFixed(2).replace(".", ","));
    setCostPriceState((product.costPrice ?? 0).toFixed(2).replace(".", ","));
    setSponsorName(product.sponsorName || "");
    setInitialStock((product.initialStock ?? product.stock).toString());
    setStock(product.stock.toString());
    setMinStock((product.minStock ?? 5).toString());
    setCategory(product.category ?? "Outros");
    setImageUrl(product.imageUrl);
    setImageFile(null);
    setImagePreview(product.imageUrl || null);
    setFormError("");
    setProductActive(product.active !== false);
    setModalMode("view");
    setIsModalOpen(true);

    // Fetch product specific logs
    setProductLogs([]);
    setLoadingLogs(true);
    logService.getLogs()
      .then((data) => {
        const filtered = data.filter((log) => log.metadata?.productId === product.id);
        setProductLogs(filtered);
      })
      .catch((err) => console.error("Error loading product logs", err))
      .finally(() => setLoadingLogs(false));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCropperFile(file);
      setIsCropperOpen(true);
    }
    // Clear value to allow selecting same file
    e.target.value = "";
  };

  const handleCropComplete = (croppedFile: File) => {
    setImageFile(croppedFile);
    setImagePreview(URL.createObjectURL(croppedFile));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !price || !stock) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const priceCleaned = price.replace(/\./g, "").replace(",", ".");
    const priceNum = parseFloat(priceCleaned);
    const costCleaned = costPrice ? costPrice.replace(/\./g, "").replace(",", ".") : "0";
    const costNum = parseFloat(costCleaned) || 0;
    const stockNum = parseInt(stock, 10);
    const minStockNum = parseInt(minStock, 10);
    const initialStockNum = initialStock ? parseInt(initialStock, 10) : stockNum;

    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("O preço de venda deve ser um valor positivo válido.");
      return;
    }

    if (costNum < 0) {
      setFormError("O preço de custo não pode ser negativo.");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      setFormError("O estoque deve ser um número inteiro igual ou superior a zero.");
      return;
    }

    if (isNaN(minStockNum) || minStockNum < 0) {
      setFormError("O estoque crítico deve ser um número inteiro igual ou superior a zero.");
      return;
    }

    setSaving(true);

    try {
      let finalImageUrl = imageUrl;

      if (productId) {
        const oldProduct = products.find((p) => p.id === productId);

        // Upload file to local server/Firebase using the known productId
        if (imageFile) {
          finalImageUrl = await uploadService.uploadProductImage(imageFile, productId);
        }

        // Edit product
        const updated = await productService.updateProduct(productId, {
          name: name.trim(),
          price: priceNum,
          costPrice: costNum,
          sponsorName: sponsorName.trim(),
          initialStock: initialStockNum,
          stock: stockNum,
          imageUrl: finalImageUrl,
          category: category as any,
          minStock: minStockNum,
          updatedBy: currentUser?.id
        });

        // Clean up old image if changed
        if (oldProduct && oldProduct.imageUrl && oldProduct.imageUrl !== finalImageUrl) {
          await uploadService.deleteProductImage(oldProduct.imageUrl);
        }

        // Log edit
        if (oldProduct) {
          const operatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin";
          const operatorId = currentUser ? currentUser.id : "system";
          
          let logDescription = `${operatorName} atualizou o produto "${name.trim()}"`;
          const changes: string[] = [];
          if (oldProduct.name !== name.trim()) changes.push(`nome de "${oldProduct.name}" para "${name.trim()}"`);
          if (oldProduct.price !== priceNum) changes.push(`preço de R$ ${oldProduct.price.toFixed(2)} para R$ ${priceNum.toFixed(2)}`);
          if ((oldProduct.costPrice ?? 0) !== costNum) changes.push(`custo de R$ ${(oldProduct.costPrice ?? 0).toFixed(2)} para R$ ${costNum.toFixed(2)}`);
          if ((oldProduct.sponsorName || "") !== sponsorName.trim()) changes.push(`investidor para "${sponsorName.trim() || "Nenhum"}"`);
          if (oldProduct.stock !== stockNum) changes.push(`estoque de ${oldProduct.stock} para ${stockNum}`);

          // Normalise before comparing to avoid undefined vs default false positives
          const oldMinStock = oldProduct.minStock ?? 5;
          const oldCategory = oldProduct.category ?? "Outros";
          if (oldMinStock !== minStockNum) changes.push(`estoque crítico de ${oldMinStock} para ${minStockNum}`);
          if (oldCategory !== category) changes.push(`categoria de "${oldCategory}" para "${category}"`);
          
          if (changes.length > 0) {
            logDescription += `: alterou ${changes.join(", ")}`;
          }
          
          await logService.createLog({
            userId: operatorId,
            userName: operatorName,
            action: "product_update",
            description: logDescription,
            metadata: {
              productId,
              old: { name: oldProduct.name, price: oldProduct.price, costPrice: oldProduct.costPrice, stock: oldProduct.stock, minStock: oldProduct.minStock, category: oldProduct.category },
              new: { name: name.trim(), price: priceNum, costPrice: costNum, stock: stockNum, minStock: minStockNum, category }
            }
          });
        }

        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? updated : p))
        );
      } else {
        // Create product first
        const created = await productService.createProduct({
          name: name.trim(),
          price: priceNum,
          costPrice: costNum,
          sponsorName: sponsorName.trim(),
          initialStock: initialStockNum,
          stock: stockNum,
          imageUrl: "",
          active: true,
          category: category as any,
          minStock: minStockNum,
          createdBy: currentUser?.id,
          updatedBy: currentUser?.id
        });

        let savedProduct = created;

        // If file exists, upload to Firebase under the newly created product ID path prefix
        if (imageFile) {
          try {
            finalImageUrl = await uploadService.uploadProductImage(imageFile, created.id);
            savedProduct.imageUrl = finalImageUrl;
          } catch (uploadErr) {
            console.error("Firebase image upload failed for new product, but product document was saved:", uploadErr);
          }
        }

        // Log creation
        const operatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin";
        const operatorId = currentUser ? currentUser.id : "system";
        await logService.createLog({
          userId: operatorId,
          userName: operatorName,
          action: "product_create",
          description: `${operatorName} cadastrou o produto "${name.trim()}" (${category}) com preço de venda R$ ${priceNum.toFixed(2)}, custo R$ ${costNum.toFixed(2)}, patrocinador "${sponsorName.trim() || "Nenhum"}", estoque inicial de ${stockNum}`,
          metadata: {
            productId: created.id,
            name: name.trim(),
            price: priceNum,
            costPrice: costNum,
            sponsorName: sponsorName.trim(),
            stock: stockNum,
            minStock: minStockNum,
            category
          }
        });

        setProducts((prev) => [...prev, savedProduct]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save product", err);
      setFormError("Ocorreu um erro ao salvar o produto. Verifique sua conexão.");
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerDelete = (id: string, name: string) => {
    setProductToDelete(id);
    setProductNameToDelete(name);
    setConfirmAction("deactivate");
    setIsConfirmOpen(true);
  };

  const handleTriggerReactivate = (id: string, name: string) => {
    setProductToDelete(id);
    setProductNameToDelete(name);
    setConfirmAction("activate");
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    // No-op, maintained for retrocompatibility with types if needed
  };

  const handleReactivate = async (product: Product) => {
    // No-op, maintained for retrocompatibility with types if needed
  };

  const handleConfirmAction = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      const operatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Admin";
      const operatorId = currentUser ? currentUser.id : "system";

      if (confirmAction === "deactivate") {
        const updated = await productService.updateProduct(productToDelete, { active: false });
        
        await logService.createLog({
          userId: operatorId,
          userName: operatorName,
          action: "product_deactivate",
          description: `${operatorName} desativou o produto "${productNameToDelete}"`,
          metadata: { productId: productToDelete }
        });

        setProducts((prev) =>
          prev.map((p) => (p.id === productToDelete ? updated : p))
        );
        setProductActive(false);
      } else {
        const updated = await productService.updateProduct(productToDelete, { active: true });
        
        await logService.createLog({
          userId: operatorId,
          userName: operatorName,
          action: "product_activate",
          description: `${operatorName} reativou o produto "${productNameToDelete}"`,
          metadata: { productId: productToDelete }
        });

        setProducts((prev) =>
          prev.map((p) => (p.id === productToDelete ? updated : p))
        );
        setProductActive(true);
      }
      setIsConfirmOpen(false);
      setIsModalOpen(false); // Close modal if open
    } catch (err) {
      console.error("Action execution failed", err);
      setIsConfirmOpen(false);
    } finally {
      setDeleting(false);
      setProductToDelete(null);
    }
  };

  return {
    products,
    activeProducts,
    inactiveProducts,
    loadingContent,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDir,
    handleSort,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    setModalMode,
    productId,
    name,
    setName,
    price,
    setPrice,
    costPrice,
    setCostPrice,
    sponsorName,
    setSponsorName,
    initialStock,
    setInitialStock,
    stock,
    setStock,
    minStock,
    setMinStock,
    category,
    setCategory,
    imageUrl,
    setImageUrl,
    productLogs,
    loadingLogs,
    imageFile,
    setImageFile,
    imagePreview,
    setImagePreview,
    formError,
    setFormError,
    saving,
    deleting,
    cameFromView,
    isConfirmOpen,
    setIsConfirmOpen,
    productNameToDelete,
    cropperFile,
    isCropperOpen,
    setIsCropperOpen,
    confirmAction,
    productActive,
    handleOpenAddModal,
    handleOpenEditModal,
    handleOpenViewModal,
    handleTriggerDelete,
    handleTriggerReactivate,
    handleDelete,
    handleReactivate,
    handleConfirmAction,
    handleFileChange,
    handleCropComplete,
    handleRemoveImage,
    handleSubmit,
    categories,
    loadProducts: fetchProducts,
  };
};
