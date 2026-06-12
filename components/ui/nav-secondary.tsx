"use client"

import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SecondaryIconKey } from "@/lib/icon"
import { Settings, CircleHelp, Search } from "lucide-react"
import { useRole } from "@/hooks/use-role"
const iconMap = {
  settings: Settings,
  help: CircleHelp,
  search: Search,
}

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    href: string
    icon: SecondaryIconKey
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { role } = useRole()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = iconMap[item.icon]

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
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
