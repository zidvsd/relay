"use client"

import Link from "next/link"
import { iconMap } from "@/lib/icon"
import { useRole } from "@/hooks/use-role"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
  const CirclePlus = iconMap.circleplus
  const Mail = iconMap.mail
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Top actions */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton className="cursor-pointer bg-primary hover:bg-primary">
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

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    href={`/${role}/${item.href}`}
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
