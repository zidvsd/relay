import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import FreelanceNavbar from "@/components/layout/FreelanceNavbar"
import { TooltipProvider } from "@/components/ui/tooltip"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-1 flex-col">
            {/* Navbar stays inside inset so it respects sidebar width */}
            <FreelanceNavbar />

            {/* Page content */}
            <main className="flex-1 pt-16">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
