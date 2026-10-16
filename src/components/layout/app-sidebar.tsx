"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  Clock,
  BarChart2,
  Home,
  LogOut,
  Settings,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Logo } from "./Logo";

// Map route titles to lucide icons
const ICON_MAP: Record<string, React.ElementType> = {
  "Create Blog": PenSquare,
  "History": Clock,
  "Analytics": BarChart2,
  "Dashboard": LayoutDashboard,
  "Settings": Settings,
};

// Icon accent colors per route
const ICON_COLOR_MAP: Record<string, { active: string; glow: string; bg: string; activeBg: string }> = {
  "Create Blog": {
    active: "text-violet-300",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.5)]",
    bg: "group-hover:bg-violet-500/10 group-hover:text-violet-300",
    activeBg: "bg-violet-500/20 text-violet-300",
  },
  "History": {
    active: "text-amber-300",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.5)]",
    bg: "group-hover:bg-amber-500/10 group-hover:text-amber-300",
    activeBg: "bg-amber-500/20 text-amber-300",
  },
  "Analytics": {
    active: "text-emerald-300",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.5)]",
    bg: "group-hover:bg-emerald-500/10 group-hover:text-emerald-300",
    activeBg: "bg-emerald-500/20 text-emerald-300",
  },
  "Dashboard": {
    active: "text-cyan-300",
    glow: "shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    bg: "group-hover:bg-cyan-500/10 group-hover:text-cyan-300",
    activeBg: "bg-cyan-500/20 text-cyan-300",
  },
};

const DEFAULT_COLOR = {
  active: "text-cyan-300",
  glow: "shadow-[0_0_12px_rgba(6,182,212,0.5)]",
  bg: "group-hover:bg-cyan-500/10 group-hover:text-cyan-300",
  activeBg: "bg-cyan-500/20 text-cyan-300",
};

type AppSidebarProps = {
  user: {
    role: string;
    name?: string;
    email?: string;
    image?: string;
  };
};

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  colors,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  colors: typeof DEFAULT_COLOR;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
        isActive
          ? "text-white"
          : "text-neutral-400 hover:text-white"
      )}
    >
      {/* Active left accent bar */}
      {isActive && (
        <span
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full",
            colors.active === "text-cyan-300" ? "bg-cyan-400" :
              colors.active === "text-violet-300" ? "bg-violet-400" :
                colors.active === "text-amber-300" ? "bg-amber-400" :
                  colors.active === "text-emerald-300" ? "bg-emerald-400" : "bg-cyan-400"
          )}
        />
      )}

      {/* Active background */}
      {isActive && (
        <span className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]" />
      )}

      {/* Icon bubble */}
      <div
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
          isActive
            ? cn(colors.activeBg, colors.glow)
            : cn("bg-white/5 text-neutral-500", colors.bg)
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Label */}
      <span className="relative z-10 flex-1 truncate">{label}</span>

      {/* Trailing chevron on hover / active */}
      <ChevronRight
        className={cn(
          "relative z-10 h-3.5 w-3.5 shrink-0 transition-all duration-200",
          isActive
            ? cn("opacity-100", colors.active)
            : "opacity-0 group-hover:opacity-50 text-neutral-400"
        )}
      />
    </Link>
  );
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
    setIsSigningOut(false);
  };

  const routes = user.role === "admin" ? adminRoutes : userRoutes;
  const dashboardHref = user.role === "admin" ? "/admin-dashboard" : "/dashboard";
  const isDashboardActive = pathname === dashboardHref;
  const isSettingsActive = pathname === "/settings" || pathname.startsWith("/settings/");

  const avatarInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <Sidebar className="border-r border-white/[0.07] bg-transparent text-white flex flex-col overflow-hidden">
      {/* ── Sidebar glass background ── */}
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-2xl" />
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />

      {/* ── Logo / Brand ── */}
      <div className="relative z-10 flex h-16 items-center justify-between px-5 border-b border-white/[0.07] shrink-0">
        <Logo size="sm" />
        {/* Online indicator */}
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
          Online
        </span>
      </div>

      {/* ── Main Navigation ── */}
      <SidebarContent className="relative z-10 flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-hide">
        {/* Overview group */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
            Overview
          </p>
          <NavItem
            href={dashboardHref}
            icon={Home}
            label="Dashboard"
            isActive={isDashboardActive}
            colors={ICON_COLOR_MAP["Dashboard"] ?? DEFAULT_COLOR}
          />
        </div>

        {/* Dynamic route groups */}
        {routes.map((route) => (
          <div key={route.title}>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-600">
              {route.title}
            </p>
            <SidebarMenu className="space-y-0.5">
              {route.items.map((item) => {
                const Icon = ICON_MAP[item.title] ?? LayoutDashboard;
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const colors = ICON_COLOR_MAP[item.title] ?? DEFAULT_COLOR;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="p-0 h-auto w-full bg-transparent hover:bg-transparent">
                      <NavItem
                        href={item.url}
                        icon={Icon}
                        label={item.title}
                        isActive={isActive}
                        colors={colors}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>

      {/* ── Footer ── */}
      <div className="relative z-10 shrink-0 border-t border-white/[0.07] p-3 space-y-1">
        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
            isSettingsActive ? "text-white" : "text-neutral-400 hover:text-white"
          )}
        >
          {isSettingsActive && (
            <span className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]" />
          )}
          <div
            className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
              isSettingsActive
                ? "bg-slate-500/20 text-slate-300 shadow-[0_0_12px_rgba(148,163,184,0.4)]"
                : "bg-white/5 text-neutral-500 group-hover:bg-slate-500/10 group-hover:text-slate-300"
            )}
          >
            <Settings className={cn("h-4 w-4 transition-transform duration-500", isSettingsActive && "animate-spin-slow")} />
          </div>
          <span className="relative z-10 flex-1">Settings</span>
          <ChevronRight
            className={cn(
              "relative z-10 h-3.5 w-3.5 shrink-0 transition-all duration-200",
              isSettingsActive
                ? "opacity-100 text-slate-300"
                : "opacity-0 group-hover:opacity-50 text-neutral-400"
            )}
          />
        </Link>

        {/* User profile card */}
        <div className="mt-2 flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-all duration-200">
          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-[1.5px]">
              <div className="h-full w-full rounded-full bg-[#0e0e18] flex items-center justify-center">
                <span className="text-xs font-bold text-white">{avatarInitial}</span>
              </div>
            </div>
            {/* Status dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0e0e18] shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
          </div>

          {/* Name & Role */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white leading-none mb-0.5">
              {user.name ?? "User"}
            </p>
            <p className="text-[10px] font-medium text-neutral-500 flex items-center gap-1">
              <span
                className={cn(
                  "inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide",
                  user.role === "admin"
                    ? "bg-violet-500/20 text-violet-400"
                    : "bg-cyan-500/20 text-cyan-400"
                )}
              >
                {user.role === "admin" ? "ADMIN" : "MEMBER"}
              </span>
            </p>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Sign out"
          >
            {isSigningOut
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <LogOut className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
