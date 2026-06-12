"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Role = "freelancer" | "client" | null

export function useAuth() {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  const extractRole = (session: any): Role => {
    return session?.user?.app_metadata?.role ?? null
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data.session

      setSession(session)
      setUser(session?.user ?? null)
      setRole(extractRole(session))
      setLoading(false)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setRole(extractRole(session))
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return {
    session,
    user,
    role,
    loading,

    isLoggedIn: !!session,
    isClient: role === "client",
    isFreelancer: role === "freelancer",
  }
}
