import { Event, AnalyticsData, Sale } from "@/hooks/useApi";

export interface DashboardContextProps {
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  analytics: AnalyticsData | null;
  sales: Sale[];
  loadingEvents: boolean;
  loadingAnalytics: boolean;
  error: string;
  fetchAnalytics: () => Promise<void>;
  formatCurrency: (val: number) => string;
}
