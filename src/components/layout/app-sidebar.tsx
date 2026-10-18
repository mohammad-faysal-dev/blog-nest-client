"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
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

type AppSidebarProps = {
  user: {
    role: string;
    name?: string;
    email?: string;
    image?: string;
  };
};

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

  return (
    <Sidebar className="border-r border-white/10 bg-black/50 backdrop-blur-2xl text-white shadow-[4px_0_30px_rgba(0,0,0,0.4)] flex flex-col">
      {/* ── Logo / Brand ── */}
      <div className="flex h-16 items-center px-5 border-b border-white/10 shrink-0">
        <Logo size="sm" />
      </div>

      {/* ── Main navigation ── */}
      <SidebarContent className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
        {/* Dashboard quick link */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
            Overview
          </p>
          <Link
            href={dashboardHref}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
              pathname === dashboardHref
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                : "text-neutral-400 hover:text-white hover:bg-white/8"
            )}
          >
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
              pathname === dashboardHref
                ? "bg-cyan-500/20 text-cyan-400"
                : "bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
            )}>
              <Home className="h-4 w-4" />
            </div>
            Dashboard
            {pathname === dashboardHref && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            )}
          </Link>
        </div>

        {/* Dynamic route groups */}
        {routes.map((route) => (
          <div key={route.title}>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
              {route.title}
            </p>
            <SidebarMenu className="space-y-1">
              {route.items.map((item) => {
                const Icon = ICON_MAP[item.title] ?? LayoutDashboard;
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
                          : "text-neutral-400 hover:text-white hover:bg-white/8"
                      )}
                    >
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="truncate">{item.title}</span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                      )}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>

      {/* ── Footer / User ── */}
      <div className="shrink-0 border-t border-white/10 p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/8 transition-all duration-200 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white transition-all">
            <Settings className="h-4 w-4" />
          </div>
          Settings
        </Link>

        {/* User profile strip */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 mt-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white leading-none mb-0.5">
              {user.name ?? "User"}
            </p>
            <p className="truncate text-[11px] text-neutral-500">
              {user.role === "admin" ? "Administrator" : "Member"}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 text-neutral-500 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sign out"
          >
            {isSigningOut
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <LogOut className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
