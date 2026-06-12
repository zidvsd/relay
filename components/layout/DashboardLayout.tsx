// components/layout/dashboard-layout.tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/ui/app-sidebar"
import DashboardNavbar from "./DashboardNavbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "freelancer" | "client"
}

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar role={role} />

          <SidebarInset className="flex flex-1 flex-col">
            <DashboardNavbar role={role} />

            <main className="flex-1 pt-16">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
