import { LogEntry } from "@/hooks/useApi";
import { getApiBase } from "./apiClient";

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${getApiBase()}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`LogService error: ${res.statusText}`);
  }
  return await res.json();
}

export const logService = {
  /**
   * Retrieves log history sorted by creation date (descending)
   */
  getLogs: async (): Promise<LogEntry[]> => {
    return fetchJson<LogEntry[]>("/logs?_sort=createdAt&_order=desc");
  },

  /**
   * Creates a new activity log entry
   */
  createLog: async (log: Omit<LogEntry, "id" | "createdAt">): Promise<LogEntry> => {
    try {
      return await fetchJson<LogEntry>("/logs", {
        method: "POST",
        body: JSON.stringify({
          ...log,
          createdAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn("Could not save log entry to remote database.", err);
      // Return a simulated created log locally if db is offline
      return {
        id: `mock-log-${Math.random().toString(36).substr(2, 9)}`,
        ...log,
        createdAt: new Date().toISOString()
      };
    }
  },
};
