"use client";

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle, Trash2, Info } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return (
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/30 text-red-550 flex items-center justify-center mb-4">
            <Trash2 className="h-6 w-6" />
          </div>
        );
      case "warning":
        return (
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-550 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
        );
      default:
        return (
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-550 flex items-center justify-center mb-4">
            <Info className="h-6 w-6" />
          </div>
        );
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case "danger":
        return "danger";
      case "warning":
        return "primary"; // primary color for warnings
      default:
        return "primary";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center pb-2 pt-2">
        {getIcon()}
        <p className="text-sm text-zinc-550 dark:text-zinc-400 mb-6 px-2 leading-relaxed">
          {message}
        </p>

        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer font-bold px-5 text-sm"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={getConfirmButtonVariant()}
            onClick={onConfirm}
            loading={isLoading}
            className="cursor-pointer font-bold px-5 text-sm"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
