import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  user,
  admin,
}: {  
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const userInfo = {
    role: "admin",
  };
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 p-4">
        <SidebarTrigger />

        <div>{userInfo.role === "admin" ? admin : user}</div>

      </main>
    </SidebarProvider>
  );
}
