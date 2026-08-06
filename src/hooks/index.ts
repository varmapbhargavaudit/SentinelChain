import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ─── Mock API base ────────────────────────────────────────────

const MOCK_DELAY = 400;

async function mockFetch<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

// ─── Typed query keys ─────────────────────────────────────────

export const queryKeys = {
  dashboard: {
    all: ["dashboard"] as const,
    kpis: () => [...queryKeys.dashboard.all, "kpis"] as const,
    heatmap: () => [...queryKeys.dashboard.all, "heatmap"] as const,
    recentActivity: () => [...queryKeys.dashboard.all, "recentActivity"] as const,
  },
  alerts: {
    all: ["alerts"] as const,
    list: (filters?: Record<string, string>) =>
      [...queryKeys.alerts.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.alerts.all, "detail", id] as const,
  },
  transactions: {
    all: ["transactions"] as const,
    list: (filters?: Record<string, string>) =>
      [...queryKeys.transactions.all, "list", filters] as const,
    detail: (hash: string) =>
      [...queryKeys.transactions.all, "detail", hash] as const,
  },
};

// ─── Generic hook factory ─────────────────────────────────────

export function useMockQuery<T>(key: readonly unknown[], data: T, enabled = true) {
  return useQuery({
    queryKey: key,
    queryFn: () => mockFetch(data),
    enabled,
    staleTime: 30_000,
  });
}

export function useMockMutation<T, V = void>(
  onSuccess?: (data: T, variables: V) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_variables: V): Promise<T> => {
      await mockFetch(null);
      return {} as T;
    },
    onSuccess: (data: T, variables: V) => {
      queryClient.invalidateQueries();
      onSuccess?.(data, variables);
    },
  });
}

// ─── Re-export TanStack ───────────────────────────────────────

export { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
