import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";

// Lazy-loaded module pages (stubs for now)
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
    <p className="text-muted-foreground mt-1">
      SOC Overview — KPI widgets, threat heatmaps, and recent activity.
    </p>
  </div>
);

const Transactions = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900">Transaction Explorer</h2>
    <p className="text-muted-foreground mt-1">
      Decoded inputs, logs, transfers, and risk analysis.
    </p>
  </div>
);

const Alerts = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900">Alert Center</h2>
    <p className="text-muted-foreground mt-1">
      Real-time threat alerts with severity triage.
    </p>
  </div>
);

const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    <p className="text-muted-foreground mt-1">{description}</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "transactions", element: <Transactions /> },
      { path: "transactions/:hash", element: <Transactions /> },
      { path: "alerts", element: <Alerts /> },
      { path: "alerts/:id", element: <Alerts /> },
      { path: "cases", element: <PlaceholderPage title="Cases" description="Investigation case management." /> },
      { path: "wallets", element: <PlaceholderPage title="Wallets" description="Wallet investigation and monitoring." /> },
      { path: "contracts", element: <PlaceholderPage title="Contracts" description="Smart contract analysis and auditing." /> },
      { path: "threat-intel", element: <PlaceholderPage title="Threat Intel" description="Threat intelligence feeds and IOCs." /> },
      { path: "knowledge-graph", element: <PlaceholderPage title="Knowledge Graph" description="Entity relationship graph explorer." /> },
      { path: "search", element: <PlaceholderPage title="Search" description="Global blockchain search." /> },
      { path: "rules", element: <PlaceholderPage title="Rules" description="Detection rule management." /> },
      { path: "soar", element: <PlaceholderPage title="SOAR" description="Security orchestration and automated response." /> },
      { path: "admin", element: <PlaceholderPage title="Admin" description="Platform administration and settings." /> },
    ],
  },
]);