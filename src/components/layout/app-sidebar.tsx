import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
} from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const menuItems = [
    {
      title: "User Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Admin Dashboard",
      href: "/admin-dashboard",
      icon: ChartNoAxesCombined,
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}