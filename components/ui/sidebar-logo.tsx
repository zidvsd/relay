"use client"

import Logo from "@/app/icon.svg"
import Image from "next/image"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarLogo() {
  const { open } = useSidebar()

  if (!open) return null

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={Logo} alt="Relay logo" className="w-3" />
      <span className="font-semibold">Relay</span>
    </Link>
  )
}
