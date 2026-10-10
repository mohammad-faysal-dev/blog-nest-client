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
  const userInfo = data?.user || { role: Roles.user }; // Fallback for dev

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex w-full">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen" />
      </div>

      <SidebarProvider>
        <div className="relative z-10 flex w-full h-full">
          <AppSidebar user={userInfo} />
          <main className="flex-1 p-6 lg:p-8 flex flex-col min-h-screen overflow-y-auto">
            <div className="mb-6">
              <SidebarTrigger className="text-white hover:text-cyan-400 transition-colors" />
            </div>
            <div className="flex-1 w-full max-w-7xl mx-auto">
              {userInfo.role === Roles.admin ? admin : user}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
