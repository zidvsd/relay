import type { IconKey } from "@/lib/icon"

export type NavItem = {
  title: string
  href: string
  icon?: IconKey
}

type Role = "freelancer" | "client"

const freelancerMain: NavItem[] = [
  { title: "Dashboard", href: "dashboard", icon: "dashboard" },
  { title: "Clients", href: "clients", icon: "users" },
  { title: "Projects", href: "projects", icon: "projects" },
  { title: "Kanban", href: "kanban", icon: "kanban" },
  { title: "Payments", href: "payments", icon: "payments" },
  { title: "Analytics", href: "analytics", icon: "analytics" },
]

const clientMain: NavItem[] = [
  { title: "Overview", href: "dashboard", icon: "dashboard" },
  { title: "Projects", href: "projects", icon: "projects" },
  { title: "Messages", href: "messages", icon: "mail" },
  { title: "Invoices", href: "invoices", icon: "payments" },
]

const freelancerSecondary: NavItem[] = [
  { title: "Settings", href: "settings", icon: "settings" },
  { title: "Get Help", href: "help", icon: "help" },
]

const clientSecondary: NavItem[] = [
  { title: "Get Help", href: "help", icon: "help" },
]

export function getNavItems(role: Role) {
  return {
    main: role === "client" ? clientMain : freelancerMain,
    secondary: role === "client" ? clientSecondary : freelancerSecondary,
  }
}
