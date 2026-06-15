"use client"

import Link from "next/link"
import { iconMap } from "@/lib/icon"
import { useAuth } from "@/hooks/use-auth"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { NavItem } from "@/constants/nav-items"

export function NavSecondary({
  items,
  ...props
}: { items: NavItem[] } & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { role } = useAuth()
  const { setOpenMobile, isMobile } = useSidebar()
  const safeRole = role ?? "freelancer"

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/${safeRole}/${item.href}`}
                    onClick={() => isMobile && setOpenMobile(false)}
                    className="flex items-center gap-2"
                  >
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
