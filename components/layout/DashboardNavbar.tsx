"use client"

import { useState } from "react"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOutIcon,
  WalletCards,
} from "lucide-react"
import { Spinner } from "../ui/spinner"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import Link from "next/link"
import { useLogout } from "@/hooks/use-logout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface DashboardNavbarProps {
  role: "freelancer" | "client"
  user: any
  profile: any
}

export default function DashboardNavbar({
  role,
  user,
  profile,
}: DashboardNavbarProps) {
  const [query, setQuery] = useState("")
  const { handleLogout, loading } = useLogout()

  const placeholder =
    role === "freelancer"
      ? "Search projects, clients or invoices..."
      : "Search projects, freelancers or invoices..."

  const userData = {
    name: profile?.full_name || user?.email || "User",
    avatar: user?.user_metadata?.picture || "/avatars/default.jpg",
  }

  return (
    <header className="bg-surface/80 border-outline-variant/30 fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b px-6 py-3 shadow-sm backdrop-blur-md">
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
        {/* NOTIFICATIONS */}
        <Button asChild variant="ghost">
          <Link href={`/${role}/notifications`}>
            <Bell />
          </Link>
        </Button>

        {/* SETTINGS */}
        <Button asChild variant="ghost">
          <Link href={`/${role}/settings`}>
            <Settings />
          </Link>
        </Button>

        {/* AVATAR DROPDOWN */}
        {/* AVATAR DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none">
              <Avatar className="cursor-pointer">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-60" align="end" sideOffset={8}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-1">
                <Avatar className="size-9">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">
                    {userData.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                  <span className="mt-1 truncate text-xs font-medium text-foreground">
                    {role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${role}/profile`}
                  className="flex items-center gap-2"
                >
                  <User className="size-4 text-muted-foreground" />
                  Account
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={`/${role}/billing`}
                  className="flex items-center gap-2"
                >
                  <WalletCards className="size-4 text-muted-foreground" />
                  Billing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={loading}
              className="text-destructive"
              onSelect={(e) => {
                e.preventDefault()
                if (!loading) handleLogout()
              }}
            >
              {loading ? (
                <Spinner className="size-4" />
              ) : (
                <LogOutIcon className="size-4" />
              )}

              {loading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
