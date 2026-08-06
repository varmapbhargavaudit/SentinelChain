// ─── Core Domain Types ───────────────────────────────────────

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type AlertStatus = "open" | "acknowledged" | "investigating" | "resolved" | "dismissed";

export type Blockchain =
  | "ethereum"
  | "polygon"
  | "arbitrum"
  | "optimism"
  | "base"
  | "bsc"
  | "avalanche"
  | "solana"
  | "tron"
  | "bitcoin";

// ─── Alert ────────────────────────────────────────────────────

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: AlertStatus;
  category: string;
  blockchain: Blockchain;
  address?: string;
  transactionHash?: string;
  valueUsd?: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  tags: string[];
}

// ─── Transaction ──────────────────────────────────────────────

export interface Transaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  valueUsd?: number;
  gasUsed: string;
  gasPrice: string;
  blockchain: Blockchain;
  status: "success" | "failed" | "pending";
  method?: string;
  decodedInput?: Record<string, unknown>;
  logs: TransactionLog[];
  transfers: TokenTransfer[];
  riskScore: number; // 0-100
  riskFlags: RiskFlag[];
}

export interface TransactionLog {
  address: string;
  topics: string[];
  data: string;
  decoded?: {
    name: string;
    params: Record<string, unknown>;
  };
}

export interface TokenTransfer {
  token: string;
  tokenSymbol: string;
  tokenName: string;
  from: string;
  to: string;
  value: string;
  valueUsd?: number;
  type: "native" | "erc20" | "erc721" | "erc1155";
}

export interface RiskFlag {
  type: string;
  severity: Severity;
  description: string;
}

// ─── Dashboard KPIs ───────────────────────────────────────────

export interface DashboardKPI {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: "number" | "currency" | "compact" | "percent";
  trend: "up" | "down" | "neutral";
  trendValue: number;
  icon: string;
}

export interface ThreatHeatmapPoint {
  blockchain: Blockchain;
  category: string;
  count: number;
  severity: Severity;
}

export interface RecentActivity {
  id: string;
  type: "alert" | "transaction" | "investigation";
  title: string;
  description: string;
  timestamp: string;
  severity?: Severity;
  blockchain: Blockchain;
}

// ─── Layout / Navigation ──────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: NavItem[];
  badge?: number;
}

export interface NavSection {
  id: string;
  header: string;
  items: NavItem[];
}

// ─── Store ────────────────────────────────────────────────────

export interface AppState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  selectedBlockchain: Blockchain | "all";
  selectedTimeRange: "1h" | "24h" | "7d" | "30d" | "all";
  notificationCount: number;
}
