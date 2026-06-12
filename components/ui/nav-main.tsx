"use client"
import Link from "next/link"
import { iconMap } from "@/lib/icon"
import { useRole } from "@/hooks/use-role"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
export type IconKey = keyof typeof iconMap

export function NavMain({
  items,
}: {
  items: {
    title: string
    href: string
    icon?: IconKey
  }[]
}) {
  const { role } = useRole()
  const pathname = usePathname()
  console.log(pathname)
  const safeRole = role ?? "freelancer"
  const CirclePlus = iconMap.circleplus
  const Mail = iconMap.mail
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Top actions */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton className="cursor-pointer bg-primary text-white hover:bg-primary hover:text-white">
              <CirclePlus />
              <span>Add Project</span>
            </SidebarMenuButton>

            {/* <SidebarMenuButton>
              <Mail />
              <span className="sr-only">Inbox</span>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Nav items */}
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null
            const href = `/${safeRole}/${item.href}`
            const isActive = (href: string) => {
              const cleanPath = pathname.split("?")[0].replace(/\/$/, "")
              const cleanHref = href.replace(/\/$/, "")

              return (
                cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/")
              )
            }
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
