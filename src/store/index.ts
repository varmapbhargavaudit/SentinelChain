import { create } from "zustand";
import type { AppState, Alert, Severity } from "@/types";

interface AppStore extends AppState {
  // Sidebar
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Theme
  setTheme: (theme: "light" | "dark") => void;

  // Filters
  setSelectedBlockchain: (blockchain: AppState["selectedBlockchain"]) => void;
  setSelectedTimeRange: (timeRange: AppState["selectedTimeRange"]) => void;

  // Notifications
  setNotificationCount: (count: number) => void;

  // Alerts (client-side cache)
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  updateAlertStatus: (id: string, status: Alert["status"]) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  sidebarCollapsed: false,
  theme: "light",
  selectedBlockchain: "all",
  selectedTimeRange: "24h",
  notificationCount: 0,
  alerts: [],

  // Actions
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  setTheme: (theme) => set({ theme }),

  setSelectedBlockchain: (blockchain) =>
    set({ selectedBlockchain: blockchain }),

  setSelectedTimeRange: (timeRange) => set({ selectedTimeRange: timeRange }),

  setNotificationCount: (count) => set({ notificationCount: count }),

  setAlerts: (alerts) => set({ alerts }),

  updateAlertStatus: (id, status) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a
      ),
    })),
}));

// ─── Derived selectors ────────────────────────────────────────

export function selectCriticalAlerts(alerts: Alert[]): Alert[] {
  return alerts.filter((a) => a.severity === "critical" && a.status === "open");
}

export function selectAlertsBySeverity(
  alerts: Alert[],
  severity: Severity
): Alert[] {
  return alerts.filter((a) => a.severity === severity);
}

export function selectAlertsByStatus(
  alerts: Alert[],
  status: Alert["status"]
): Alert[] {
  return alerts.filter((a) => a.status === status);
}
