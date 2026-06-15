import Logo from "@/app/icon.svg"
import Image from "next/image"
import Link from "next/link"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"
import { getNavItems } from "@/constants/nav-items"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
  const { main, secondary } = getNavItems(role)

  const userData = {
    name: profile?.full_name ?? user?.email ?? "User",
    email: user?.email ?? "no-email@example.com",
    avatar: user?.user_metadata?.picture ?? "/avatars/default.jpg",
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="top-14 h-[calc(100svh-4rem)]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Relay logo" className="w-3" />
            <span className="font-semibold">Relay</span>
          </Link>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={main} />
        <NavSecondary items={secondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} role={role} />
      </SidebarFooter>
    </Sidebar>
  )
}
