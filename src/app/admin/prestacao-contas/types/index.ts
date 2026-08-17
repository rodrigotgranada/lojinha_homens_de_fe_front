import { Event, AnalyticsData, InvestorReportItem } from "@/hooks/useApi";

export interface PrestacaoContasContextType {
  events: Event[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  selectedEvent: Event | undefined;
  loading: boolean;
  analytics: AnalyticsData | null;
  investorsList: InvestorReportItem[];
  totalInvestedGlobal: number;
  totalRepayGlobal: number;
  totalProfitGlobal: number;
  totalRevenueGlobal: number;
  handlePrint: () => void;
}
