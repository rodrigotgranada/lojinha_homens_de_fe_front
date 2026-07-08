import React from "react";
import { useEvents } from "../context/EventContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Calendar, MapPin, Tag, Activity, AlertTriangle } from "lucide-react";

export const EventFormModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    formError,
    setFormError,
    formData,
    setFormData,
    saving,
    editingEvent,
    handleSubmit
  } = useEvents();

  const isEdit = !!editingEvent;

  // Filter allowed options based on rules
  const getStatusOptions = () => {
    if (!editingEvent) {
      return [
        { value: "PROGRAMADO", label: "Programado" },
        { value: "ATIVO", label: "Ativo" },
        { value: "CANCELADO", label: "Cancelado" }
      ];
    }

    const currentStatus = editingEvent.status ?? (editingEvent.isActive ? "ATIVO" : "PROGRAMADO");

    switch (currentStatus) {
      case "PROGRAMADO":
        return [
          { value: "PROGRAMADO", label: "Programado" },
          { value: "ATIVO", label: "Ativo" },
          { value: "CANCELADO", label: "Cancelado" }
        ];
      case "CANCELADO":
        return [
          { value: "CANCELADO", label: "Cancelado" },
          { value: "PROGRAMADO", label: "Programado (Reprogramar)" }
        ];
      case "ATIVO":
        return [
          { value: "ATIVO", label: "Ativo" },
          { value: "ENCERRADO", label: "Encerrado" }
        ];
      case "ENCERRADO":
        return [
          { value: "ENCERRADO", label: "Encerrado" }
        ];
      default:
        return [
          { value: "PROGRAMADO", label: "Programado" },
          { value: "ATIVO", label: "Ativo" },
          { value: "ENCERRADO", label: "Encerrado" },
          { value: "CANCELADO", label: "Cancelado" }
        ];
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => { setIsModalOpen(false); setFormError(""); }}
      title={isEdit ? "Editar Retiro / Edição" : "Novo Retiro / Edição"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {formError && (
          <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-semibold border border-red-100 dark:border-red-900/30 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Nome */}
        <Input
          label="Nome da Edição / Retiro"
          id="event-form-name"
          placeholder="Ex: Homens de Fé - V4"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          icon={<Tag className="h-5 w-5" />}
        />

        {/* Datas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Data de Início */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              Data de Início
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <input
                type="date"
                id="event-form-start-date"
                value={formData.startDate}
                onChange={(e) => {
                  const newStart = e.target.value;
                  const newEnd = formData.endDate && formData.endDate < newStart ? "" : formData.endDate;
                  setFormData({ ...formData, startDate: newStart, endDate: newEnd });
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Data de Fim */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-bold uppercase tracking-wide ${formData.startDate ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400 dark:text-zinc-600"}`}>
              Data de Fim
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <input
                type="date"
                id="event-form-end-date"
                value={formData.endDate}
                min={formData.startDate || undefined}
                disabled={!formData.startDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
            {!formData.startDate && (
              <span className="text-[10px] text-zinc-400 dark:text-zinc-650">Preencha a data de início primeiro</span>
            )}
          </div>
        </div>

        {/* Local */}
        <Input
          label="Local (opcional)"
          id="event-form-location"
          placeholder="Ex: Sítio São Francisco, Pelotas - RS"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          icon={<MapPin className="h-5 w-5" />}
        />

        {/* Status Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide flex items-center gap-1">
            <Activity className="h-3.5 w-3.5" />
            Status do Retiro
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {getStatusOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => { setIsModalOpen(false); setFormError(""); }}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button type="submit" loading={saving} className="cursor-pointer">
            {isEdit ? "Salvar Alterações" : "Criar Edição"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
