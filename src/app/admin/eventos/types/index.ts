import { Event, User } from "@/hooks/useApi";

export type EventStatus = "PROGRAMADO" | "ATIVO" | "ENCERRADO" | "CANCELADO";

export interface EventFormData {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: EventStatus;
}

export interface EventContextProps {
  events: Event[];
  loadingContent: boolean;
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editingEvent: Event | null;
  formError: string;
  setFormError: (error: string) => void;
  saving: boolean;
  handleOpenAddModal: () => void;
  handleOpenEditModal: (event: Event) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  currentUser: User | null;
  isLoading: boolean;
}
