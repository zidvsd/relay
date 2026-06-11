import {
  LayoutDashboard,
  Users,
  FolderKanban,
  KanbanSquare,
  CreditCard,
  ChartColumn,
  Settings,
  CircleHelp,
  Search,
  CirclePlus,
  Mail,
} from "lucide-react"

export const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  projects: FolderKanban,
  kanban: KanbanSquare,
  payments: CreditCard,
  analytics: ChartColumn,
  settings: Settings,
  help: CircleHelp,
  search: Search,
  circleplus: CirclePlus,
  mail: Mail,
}
export type MainIconKey =
  | "dashboard"
  | "users"
  | "projects"
  | "kanban"
  | "payments"
  | "analytics"
  | "circleplus"
  | "mail"

export type SecondaryIconKey = "settings" | "help" | "search"

export type IconKey = keyof typeof iconMap
