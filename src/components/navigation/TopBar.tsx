import { useState, useCallback } from "react";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Sun,
  User,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

// ─── Breadcrumb ──────────────────────────────────────────────────

function Breadcrumb({
  items,
}: {
  items: { label: string; icon?: LucideIcon }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          )}
          {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
          <span
            className={cn(
              "text-sm",
              i === items.length - 1
                ? "font-semibold text-gray-900"
                : "text-gray-500"
            )}
          >
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}

// ─── Search Input ────────────────────────────────────────────────

function SearchInput() {
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    },
    []
  );

  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search wallets, txs, alerts..."
        className={cn(
          "w-full h-9 pl-9 pr-16 rounded-lg",
          "bg-gray-50 border border-gray-200",
          "text-sm text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "transition-all duration-200"
        )}
      />
      <kbd
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "inline-flex items-center gap-0.5",
          "h-5 px-1.5 rounded",
          "bg-white border border-gray-200",
          "text-[11px] font-medium text-gray-400",
          "pointer-events-none select-none"
        )}
      >
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────

export default function TopBar() {
  const notificationCount = useAppStore((s) => s.notificationCount);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
      {/* Left: Menu icon + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-lg",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "transition-colors duration-200"
          )}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumb items={[{ label: "SOC Overview" }]} />
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <SearchInput />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button
          type="button"
          className={cn(
            "relative flex items-center justify-center h-9 w-9 rounded-lg",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "transition-colors duration-200"
          )}
          aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ""}`}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className={cn(
                "absolute -top-0.5 -right-0.5",
                "flex items-center justify-center",
                "min-w-[18px] h-[18px] px-0 rounded-full",
                "text-[10px] font-bold leading-none",
                "pointer-events-none"
              )}
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
        </button>

        {/* Quick Actions */}
        <button
          type="button"
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-lg",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "transition-colors duration-200"
          )}
          aria-label="Quick actions"
        >
          <Sparkles className="h-5 w-5" />
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-lg",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "transition-colors duration-200"
          )}
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5" />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center justify-center h-9 w-9 rounded-lg ml-1",
              "hover:bg-gray-100 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="User menu"
          >
            <Avatar size="sm">
              <AvatarImage src="" alt="User avatar" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                SC
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sun className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
