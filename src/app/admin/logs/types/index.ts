import { LogEntry, Event } from "@/hooks/useApi";

export type LogSortField = "createdAt" | "userName" | "action" | null;
export type LogSortDir = "asc" | "desc";

export interface LogsContextType {
  logs: LogEntry[];
  filteredLogs: LogEntry[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  actionFilter: string;
  setActionFilter: (filter: string) => void;
  sortField: LogSortField;
  sortDir: LogSortDir;
  handleSort: (field: LogSortField) => void;
  fetchLogs: () => Promise<void>;
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
}
