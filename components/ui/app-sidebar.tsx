import Logo from "@/app/icon.svg"
import Image from "next/image"
import Link from "next/link"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { SecondaryIconKey, MainIconKey } from "@/lib/icon"

export const data: {
  navMain: {
    title: string
    href: string
    icon: MainIconKey
  }[]
  navSecondary: {
    title: string
    href: string
    icon: SecondaryIconKey
  }[]
} = {
  navMain: [
    { title: "Dashboard", href: "dashboard", icon: "dashboard" },
    { title: "Clients", href: "clients", icon: "users" },
    { title: "Projects", href: "projects", icon: "projects" },
    { title: "Kanban", href: "kanban", icon: "kanban" },
    { title: "Payments", href: "payments", icon: "payments" },
    { title: "Analytics", href: "analytics", icon: "analytics" },
  ],
  navSecondary: [
    { title: "Settings", href: "/settings", icon: "settings" },
    { title: "Get Help", href: "/help", icon: "help" },
    { title: "Search", href: "/search", icon: "search" },
  ],
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "freelancer" | "client"
  user: any
  profile: any
}

export async function AppSidebar({
  role,
  user,
  profile,
  ...props
}: AppSidebarProps) {
  const userData = {
    name: profile?.full_name || user?.email || "User",
    email: user?.email || "no-email@example.com",
    avatar: user?.user_metadata?.picture || "/avatars/default.jpg",
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="top-14 h-[calc(100svh-4rem)]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/dashboard`} className="flex items-center gap-2">
                <Image src={Logo} alt="logo" className="w-3" />
                <span className="font-semibold">Relay</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
