"use client"

import { useState } from "react"
import { Search, Bell, Settings } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar"

export default function ClientNavbar() {
  const [query, setQuery] = useState("")

  return (
    <header className="bg-surface/80 border-outline-variant/30 fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b px-6 py-3 shadow-sm backdrop-blur-md">
      {/* Left section */}
      <div className="flex flex-1 items-center gap-8">
        {/* Search */}
        <div className="relative hidden max-w-md flex-1 items-center md:flex">
          <Search className="size-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-surface-container-low text-body-md ml-4 w-full rounded-md border-none py-2 pr-2 pl-4 transition-all focus:ring-2 focus:ring-primary/20"
            placeholder="Search projects, freelancers or invoices..."
            type="text"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          className="hover:bg-surface-container-low relative rounded-full p-2 transition-colors"
        >
          <Bell />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          className="hover:bg-surface-container-low rounded-full p-2 transition-colors"
        >
          <Settings />
        </Button>

        {/* Avatar */}
        <div className="border-outline-variant h-8 w-8 overflow-hidden rounded-full border">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
