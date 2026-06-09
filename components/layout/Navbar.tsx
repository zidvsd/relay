"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/app/icon.svg"
import Image from "next/image"
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
]

export function Navbar() {
  const [active, setActive] = useState("#")

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-4 shadow-sm backdrop-blur-md">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <Image src={Logo} className="w-3" alt="logo" />
        <Link
          href={"/"}
          className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-2xl font-bold text-transparent"
        >
          Relay
        </Link>
      </div>

      {/* Links */}
      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => {
          const isActive = active === link.href

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`text-sm transition-colors ${
                isActive
                  ? "border-b-2 border-primary pb-0.5 font-semibold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="lg" className="hidden sm:block">
          <Link href="/signin">Login</Link>
        </Button>

        <Button
          size="lg"
          className="rounded-xl bg-linear-to-r from-primary to-chart-2 text-primary-foreground shadow-md hover:brightness-110"
        >
          <Link href="/signup"> Get Started</Link>
        </Button>
      </div>
    </nav>
  )
}
