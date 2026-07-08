"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { LogEntry, Event, useApi } from "@/hooks/useApi";
import { logService } from "@/services/logService";
import { LogsContextType, LogSortField, LogSortDir } from "../types";

export const useLogsState = (): LogsContextType => {
  const { currentUser, isLoading } = useApp();
  const api = useApi();

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  // Sorting
  const [sortField, setSortField] = useState<LogSortField>("createdAt");
  const [sortDir, setSortDir] = useState<LogSortDir>("desc");

  const handleSort = (field: LogSortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await logService.getLogs();
      setLogs(data);
    } catch (err) {
      console.error("Failed to load logs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch events list and logs
  useEffect(() => {
    async function loadEvents() {
      try {
        const list = await api.getEvents();
        setEvents(list);
        const active = list.find((e) => e.isActive);
        if (active) {
          setSelectedEventId(active.id);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      }
    }
    if (!isLoading && currentUser?.role === "ADMIN") {
      loadEvents();
      fetchLogs();
    }
  }, [isLoading, currentUser, api, fetchLogs]);

  useEffect(() => {
    let result = logs;

    // Search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (log) =>
          log.description.toLowerCase().includes(term) ||
          log.userName.toLowerCase().includes(term) ||
          log.action.toLowerCase().includes(term)
      );
    }

    // Action category filter
    if (actionFilter !== "all") {
      result = result.filter((log) => {
        if (actionFilter === "vendas") return log.action === "sale_create";
        if (actionFilter === "estoque") return log.action === "stock_update";
        if (actionFilter === "produtos") return ["product_create", "product_update", "product_deactivate", "product_activate"].includes(log.action);
        return true;
      });
    }

    // Event filter
    if (selectedEventId !== "all") {
      result = result.filter(
        (log) => log.metadata?.eventId === selectedEventId
      );
    }

    // Sort logs
    if (sortField) {
      result = [...result].sort((a, b) => {
        let av: string | number = "";
        let bv: string | number = "";

        if (sortField === "createdAt") {
          av = new Date(a.createdAt).getTime();
          bv = new Date(b.createdAt).getTime();
        } else if (sortField === "userName") {
          av = a.userName.toLowerCase();
          bv = b.userName.toLowerCase();
        } else if (sortField === "action") {
          av = a.action.toLowerCase();
          bv = b.action.toLowerCase();
        }

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredLogs(result);
  }, [searchTerm, actionFilter, selectedEventId, logs, sortField, sortDir]);

  // Listen to real-time log additions via custom event dispatched by AppContext websocket
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLogAdded = (e: any) => {
      const newLog = (e as CustomEvent).detail as LogEntry;
      setLogs((prev) => [newLog, ...prev]);
    };

    window.addEventListener("log_added", handleLogAdded);
    return () => {
      window.removeEventListener("log_added", handleLogAdded);
    };
  }, []);

  return {
    logs,
    filteredLogs,
    loading,
    searchTerm,
    setSearchTerm,
    actionFilter,
    setActionFilter,
    sortField,
    sortDir,
    handleSort,
    fetchLogs,
    events,
    selectedEventId,
    setSelectedEventId
  };
};
