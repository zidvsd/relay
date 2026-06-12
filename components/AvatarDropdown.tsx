// components/dashboard/user-avatar-dropdown.tsx
"use client"

import { User, LogOutIcon, WalletCards } from "lucide-react"
import { Spinner } from "./ui/spinner"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
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

interface AvatarDropdownProps {
  role: "freelancer" | "client" | null
  user: any
  userData: {
    name: string
    avatar: string
  }
}

export function AvatarDropdown({ role, user, userData }: AvatarDropdownProps) {
  const { handleLogout, loading } = useLogout()

  const initials = userData.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none">
          <Avatar className="cursor-pointer">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <Link href={`${role}/dashboard`}>
            <div className="flex items-center gap-3 py-1">
              <Avatar className="size-9">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-medium">
                  {userData.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
                <span className="-primary mt-1 truncate text-xs font-semibold text-primary">
                  {role}
                </span>
              </div>
            </div>
          </Link>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/${role}/profile`} className="flex items-center gap-2">
              <User className="size-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/${role}/billing`} className="flex items-center gap-2">
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
  )
}
