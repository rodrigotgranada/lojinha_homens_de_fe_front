import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { useApi, Event } from "@/hooks/useApi";
import { EventFormData } from "../types";

const emptyForm: EventFormData = {
  name: "",
  startDate: "",
  endDate: "",
  location: "",
  status: "PROGRAMADO"
};

export const useEventState = () => {
  const { currentUser, setActiveEventState, isLoading } = useApp();
  const api = useApi();

  const [events, setEvents] = useState<Event[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);

  const [formData, setFormData] = useState<EventFormData>(emptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoadingContent(true);
    try {
      const eventList = await api.getEvents();
      // Sort: active first, then newest
      eventList.sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setEvents(eventList);
    } catch (err) {
      console.warn("Could not fetch events. Falling back to local data.", err);
      setEvents([
        {
          id: "evt-1",
          name: "Homens de Fé - Versão 3",
          isActive: false,
          status: "PROGRAMADO",
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoadingContent(false);
    }
  }, [api]);

  useEffect(() => {
    if (!isLoading && currentUser?.role === "ADMIN") {
      fetchEvents();
    }
  }, [isLoading, currentUser, fetchEvents]);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      startDate: event.startDate ? event.startDate.split("T")[0] : "",
      endDate: event.endDate ? event.endDate.split("T")[0] : "",
      location: event.location ?? "",
      status: event.status ?? (event.isActive ? "ATIVO" : "PROGRAMADO")
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Por favor, digite o nome do evento.");
      return;
    }

    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      setFormError("A data de fim deve ser maior ou igual à data de início.");
      return;
    }

    // Enforce exclusivity rule on active events:
    if (formData.status === "ATIVO") {
      const alreadyActive = events.find((evt) => evt.isActive && evt.id !== editingEvent?.id);
      if (alreadyActive) {
        setFormError(`Já existe um evento ativo: "${alreadyActive.name}". Encerre-o ou altere seu status antes de ativar outro.`);
        return;
      }
    }

    setSaving(true);

    const payload: Record<string, unknown> = {
      name: formData.name.trim(),
      location: formData.location.trim() || undefined,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      status: formData.status,
      isActive: formData.status === "ATIVO"
    };

    try {
      if (editingEvent) {
        const updated = await api.updateEvent(editingEvent.id, payload);
        
        // Update global context active event state
        if (updated.isActive) {
          setActiveEventState(updated);
        } else if (editingEvent.isActive) {
          // If it was active and is no longer active, clear context active event
          setActiveEventState(null);
        }

        setEvents((prev) => {
          const next = prev.map((evt) => (evt.id === editingEvent.id ? { ...evt, ...updated } : evt));
          next.sort((a, b) => {
            if (a.isActive) return -1;
            if (b.isActive) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          return next;
        });
      } else {
        const created = await api.createEvent({
          name: formData.name.trim(),
          isActive: formData.status === "ATIVO",
          status: formData.status,
          createdAt: new Date().toISOString(),
          location: formData.location.trim() || undefined,
          startDate: formData.startDate || undefined,
          endDate: formData.endDate || undefined
        });

        if (created.isActive) {
          setActiveEventState(created);
        }

        setEvents((prev) => {
          const next = [created, ...prev];
          next.sort((a, b) => {
            if (a.isActive) return -1;
            if (b.isActive) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          return next;
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Failed to save event", err);
      setFormError(err?.message || "Ocorreu um erro ao salvar o retiro.");
    } finally {
      setSaving(false);
    }
  };

  return {
    events,
    loadingContent,
    formData,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    editingEvent,
    formError,
    setFormError,
    saving,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSubmit,
    currentUser,
    isLoading
  };
};
