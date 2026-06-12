// components/layout/dashboard-navbar.tsx
"use client"

import { useState } from "react"
import { Search, Bell, Settings } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

interface DashboardNavbarProps {
  role: "freelancer" | "client"
}

export default function DashboardNavbar({ role }: DashboardNavbarProps) {
  const [query, setQuery] = useState("")

  const placeholder =
    role === "freelancer"
      ? "Search projects, clients or invoices..."
      : "Search projects, freelancers or invoices..."

  return (
    <header className="bg-surface/80 border-outline-variant/30 fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b px-6 py-3 shadow-sm backdrop-blur-md">
      <div className="flex flex-1 items-center gap-8">
        <div className="relative hidden max-w-md flex-1 items-center md:flex">
          <Search className="size-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="ml-4 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <Bell />
        </Button>

        <Button variant="ghost">
          <Settings />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
