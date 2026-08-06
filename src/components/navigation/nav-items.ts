import type { NavSection } from "@/types";

export const navSections: NavSection[] = [
  {
    id: "overview",
    header: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        path: "/",
      },
      {
        id: "transactions",
        label: "Transactions",
        icon: "ArrowLeftRight",
        path: "/transactions",
        badge: 142,
      },
      {
        id: "alerts",
        label: "Alerts",
        icon: "Bell",
        path: "/alerts",
        badge: 7,
      },
    ],
  },
  {
    id: "investigation",
    header: "Investigation",
    items: [
      {
        id: "cases",
        label: "Cases",
        icon: "FolderSearch",
        path: "/cases",
        badge: 3,
      },
      {
        id: "wallets",
        label: "Wallets",
        icon: "Wallet",
        path: "/wallets",
      },
      {
        id: "contracts",
        label: "Contracts",
        icon: "FileCode",
        path: "/contracts",
      },
    ],
  },
  {
    id: "intelligence",
    header: "Intelligence",
    items: [
      {
        id: "threat-intel",
        label: "Threat Intel",
        icon: "ShieldAlert",
        path: "/threat-intel",
      },
      {
        id: "knowledge-graph",
        label: "Knowledge Graph",
        icon: "GitGraph",
        path: "/knowledge-graph",
      },
      {
        id: "search",
        label: "Search",
        icon: "Search",
        path: "/search",
      },
    ],
  },
  {
    id: "platform",
    header: "Platform",
    items: [
      {
        id: "rules",
        label: "Rules",
        icon: "ScrollText",
        path: "/rules",
      },
      {
        id: "soar",
        label: "SOAR",
        icon: "Workflow",
        path: "/soar",
      },
      {
        id: "admin",
        label: "Admin",
        icon: "Settings",
        path: "/admin",
      },
    ],
  },
];