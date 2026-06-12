"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export function useLogout() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut({ scope: "local" })
      router.refresh()
      router.replace("/signin")
    } finally {
      setLoading(false)
    }
  }

  return { handleLogout, loading }
}
