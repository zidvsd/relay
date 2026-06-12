import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/ui/app-sidebar"
import DashboardNavbar from "./DashboardNavbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "freelancer" | "client"
  user: any
  profile: any
}

export default function DashboardLayout({
  children,
  role,
  user,
  profile,
}: DashboardLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar role={role} user={user} profile={profile} />

          <SidebarInset className="flex flex-1 flex-col">
            <DashboardNavbar role={role} user={user} profile={profile} />

            <main className="flex-1 pt-16">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
