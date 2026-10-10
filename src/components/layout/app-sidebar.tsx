import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

type AppSidebarProps = {
  user: {
    role: string;
  };
};

export function AppSidebar({ user }: AppSidebarProps) {
  const routes = user.role === "admin" ? adminRoutes : userRoutes;

  return (
    <Sidebar className="border-r border-white/10 bg-black/40 backdrop-blur-2xl text-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            BlogNest
          </span>
        </Link>
      </div>

      <SidebarContent className="p-4 gap-4">
        {routes.map((route) => (
          <SidebarGroup key={route.title} className="p-0">
            <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              {route.title}
            </h3>

            <SidebarMenu className="gap-1">
              {route.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Link
                      href={item.url}
                      className="flex w-full items-center px-2 py-2 rounded-xl hover:bg-white/10 transition-colors text-neutral-200 hover:text-white"
                    >
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
