import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  console.log(data);
  const userInfo = data.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <main className="flex-1 p-4">
        <SidebarTrigger />

        <div>{userInfo.role === Roles.admin ? admin : user}</div>
      </main>
    </SidebarProvider>
  );
}
