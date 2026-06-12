"use client"

import { useState } from "react"
import { Search, Bell, Settings } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AvatarDropdown } from "../AvatarDropdown"

interface DashboardNavbarProps {
  role: "freelancer" | "client"
  user: any
  profile: any
  className?: string
}

export default function DashboardNavbar({
  role,
  user,
  profile,
  className,
}: DashboardNavbarProps) {
  const [query, setQuery] = useState("")

  const placeholder =
    role === "freelancer"
      ? "Search projects, clients or invoices..."
      : "Search projects, freelancers or invoices..."

  const userData = {
    name: profile?.full_name || user?.email || "User",
    avatar: user?.user_metadata?.picture || "/avatars/default.jpg",
  }

  return (
    <header
      className={cn(
        "bg-surface/80 border-outline-variant/30 flex items-center justify-between border-b px-6 py-3 shadow-sm backdrop-blur-md",
        className
      )}
    >
      {/* SEARCH */}
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

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href={`/${role}/notifications`}>
            <Bell />
          </Link>
        </Button>

        <Button asChild variant="ghost">
          <Link href={`/${role}/settings`}>
            <Settings />
          </Link>
        </Button>

        <AvatarDropdown role={role} user={user} userData={userData} />
      </div>
    </header>
  )
}
