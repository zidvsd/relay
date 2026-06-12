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
        <DashboardNavbar
          role={role}
          user={user}
          profile={profile}
          className="fixed top-0 right-0 left-0 z-50 w-full"
        />

        <div className="flex min-h-screen w-full pt-16">
          <AppSidebar role={role} user={user} profile={profile} />

          <SidebarInset className="flex flex-1 flex-col">
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
