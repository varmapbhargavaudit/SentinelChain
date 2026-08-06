import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  ArrowLeftRight,
  Bell,
  FolderSearch,
  Wallet,
  FileCode,
  ShieldAlert,
  GitGraph,
  Search,
  ScrollText,
  Workflow,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navSections } from "./nav-items";
import type { NavItem } from "@/types";

// ─── Icon Registry ─────────────────────────────────────────────

const iconRegistry: Record<string, LucideIcon> = {
  LayoutDashboard,
  ArrowLeftRight,
  Bell,
  FolderSearch,
  Wallet,
  FileCode,
  ShieldAlert,
  GitGraph,
  Search,
  ScrollText,
  Workflow,
  Settings,
};

function resolveIcon(iconName: string): LucideIcon {
  return iconRegistry[iconName] ?? Shield;
}

// ─── Badge ─────────────────────────────────────────────────────

function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "ml-auto inline-flex items-center justify-center rounded-full px-2 py-0.5",
        "text-[11px] font-semibold leading-none",
        "bg-primary/15 text-primary",
        "group-[[data-active=true]]:bg-primary/25"
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ─── Nav Item helpers ──────────────────────────────────────────

function collapsedLinkClass({ isActive }: NavLinkRenderProps): string {
  return cn(
    "group relative flex items-center justify-center h-10 w-10 mx-auto rounded-lg",
    "text-sidebar-muted-foreground hover:text-sidebar-foreground",
    "hover:bg-sidebar-accent transition-all duration-200",
    isActive && [
      "text-sidebar-foreground bg-sidebar-accent",
      "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
      "before:w-[3px] before:h-5 before:bg-primary before:rounded-r-full",
    ]
  );
}

function expandedLinkClass({ isActive }: NavLinkRenderProps): string {
  return cn(
    "group relative flex items-center gap-3 h-10 px-3 mx-2 rounded-lg",
    "text-sidebar-muted-foreground hover:text-sidebar-foreground",
    "hover:bg-sidebar-accent transition-all duration-200",
    isActive && [
      "text-sidebar-foreground bg-sidebar-accent font-medium",
      "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
      "before:w-[3px] before:h-5 before:bg-primary before:rounded-r-full",
    ]
  );
}

// ─── Nav Item ──────────────────────────────────────────────────

function SidebarNavItem({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const Icon = resolveIcon(item.icon);

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={item.path}
            end={item.path === "/"}
            className={collapsedLinkClass}
            title={item.label}
          >
            <Icon className="h-5 w-5 shrink-0" />
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          <span>{item.label}</span>
          {item.badge != null && item.badge > 0 && (
            <span className="ml-1 text-primary">({item.badge})</span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={expandedLinkClass}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate text-sm">{item.label}</span>
      {item.badge != null && item.badge > 0 && <NavBadge count={item.badge} />}
    </NavLink>
  );
}

// ─── Section Header ────────────────────────────────────────────

function SectionHeader({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) {
    return <div className="h-px bg-sidebar-border mx-3 my-2" aria-hidden />;
  }

  return (
    <h3 className="px-4 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted-foreground/60">
      {label}
    </h3>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────

export default function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <TooltipProvider delay={300}>
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-sidebar border-r border-sidebar-border",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-[64px]" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center h-16 shrink-0 border-b border-sidebar-border",
            "transition-all duration-300 ease-in-out",
            collapsed ? "justify-center px-2" : "gap-3 px-4"
          )}
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0 transition-transform duration-300">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span
            className={cn(
              "font-semibold text-base text-sidebar-foreground tracking-tight whitespace-nowrap",
              "transition-all duration-300 ease-in-out overflow-hidden",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            SentinelChain
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.id}>
              <SectionHeader
                label={section.header}
                collapsed={collapsed}
              />
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="shrink-0 border-t border-sidebar-border p-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              "flex items-center w-full h-10 rounded-lg gap-3 px-3",
              "text-sidebar-muted-foreground hover:text-sidebar-foreground",
              "hover:bg-sidebar-accent transition-all duration-200",
              collapsed && "justify-center px-0"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-5 w-5 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="h-5 w-5 shrink-0" />
                <span className="text-sm truncate transition-opacity duration-300">
                  Collapse
                </span>
              </>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}