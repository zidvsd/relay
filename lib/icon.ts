import {
  LayoutDashboard,
  Users,
  Folder,
  Kanban,
  CreditCard,
  BarChart3,
  CirclePlus,
  Mail,
  Settings,
  CircleHelp,
  Search,
  type LucideIcon,
} from "lucide-react"

export const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  projects: Folder,
  kanban: Kanban,
  payments: CreditCard,
  analytics: BarChart3,
  circleplus: CirclePlus,
  mail: Mail,
  settings: Settings,
  help: CircleHelp,
  search: Search,
} as const

export type IconKey = keyof typeof iconMap
export type { LucideIcon }
