"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/supabaseClient"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut({ scope: "local" })
    router.refresh()
    router.replace("/signin")
  }

  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="flex items-center gap-2 p-0 text-xs"
    >
      <LogOut className="h-2 w-2" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  )
}
