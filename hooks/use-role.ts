"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/supabaseClient"

type Role = "freelancer" | "client" | null

export function useRole() {
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session?.user?.app_metadata)
      setRole(session?.user?.app_metadata?.role ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setRole(session?.user?.app_metadata?.role ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    role,
    loading,
    isClient: role === "client",
    isFreelancer: role === "freelancer",
  }
}
