"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { iconMap } from "@/lib/icon"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { NavItem } from "@/constants/nav-items"
import { useSidebar } from "@/components/ui/sidebar"
const CirclePlus = iconMap.circleplus

function useIsActive() {
  const pathname = usePathname()
  return (href: string) => {
    const clean = (p: string) => p.split("?")[0].replace(/\/$/, "")
    const cleanHref = clean(href)
    const cleanPath = clean(pathname)
    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/")
  }
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar()
  const { role } = useAuth()
  const safeRole = role ?? "freelancer"
  const isActive = useIsActive()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer bg-primary text-white hover:bg-primary hover:text-white">
              <CirclePlus />
              <span>Add Project</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null
            const href = `/${safeRole}/${item.href}`
            const active = isActive(href)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.title}
                >
                  <Link
                    href={href}
                    onClick={() => isMobile && setOpenMobile(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                      active
                        ? "font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
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
