import React from "react";
import { useCategory } from "../context/CategoryContext";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tag } from "lucide-react";

export const CategoryModal: React.FC = () => {
  const {
    isModalOpen,
    editingCategory,
    categoryName,
    setCategoryName,
    modalLoading,
    handleSave,
    closeModal
  } = useCategory();

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={editingCategory ? "Editar Categoria" : "Nova Categoria"}
    >
      <form onSubmit={handleSave} className="space-y-5">
        <p className="text-xs text-zinc-550 dark:text-zinc-400">
          {editingCategory
            ? "Modifique o nome da categoria no campo abaixo e confirme a alteração."
            : "Insira o nome da nova categoria abaixo para organizar seus produtos."}
        </p>

        <Input
          label="Nome da Categoria"
          id="category-name-input"
          placeholder="Ex: Alimentos, Vestuário, Livros..."
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          icon={<Tag className="h-5 w-5" />}
          autoFocus
        />

        <div className="flex gap-3 justify-end pt-3">
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            disabled={modalLoading}
            className="cursor-pointer flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={modalLoading || !categoryName.trim()}
            className="cursor-pointer flex-1"
          >
            {modalLoading ? "Salvando..." : "Salvar Categoria"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
