import { useState, useEffect, useCallback } from "react";
import { useApi, Category } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";

export const useCategoryState = () => {
  const api = useApi();
  const { currentUser } = useApp();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError("Falha ao carregar categorias. Verifique a conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    
    setModalLoading(true);
    setError("");
    try {
      if (editingCategory) {
        // Edit
        await api.updateCategory(editingCategory.id, categoryName);
        setSuccess("Categoria atualizada com sucesso!");
      } else {
        // Create
        await api.createCategory(categoryName);
        setSuccess("Categoria cadastrada com sucesso!");
      }
      setIsModalOpen(false);
      setCategoryName("");
      setEditingCategory(null);
      await fetchCategories();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.message || "Ocorreu um erro ao salvar a categoria.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja realmente desativar esta categoria?")) return;
    
    setIsLoading(true);
    setError("");
    try {
      await api.deleteCategory(id);
      setSuccess("Categoria excluída com sucesso!");
      await fetchCategories();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError("Falha ao excluir categoria.");
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setCategoryName("");
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName("");
    setError("");
  };

  return {
    currentUser,
    categories,
    isLoading,
    error,
    success,
    setError,
    setSuccess,
    
    // Modal states & handlers
    isModalOpen,
    editingCategory,
    categoryName,
    setCategoryName,
    modalLoading,
    handleSave,
    handleDelete,
    openCreateModal,
    openEditModal,
    closeModal,
    refresh: fetchCategories
  };
};

export type UseCategoryStateReturn = ReturnType<typeof useCategoryState>;
