"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

type Role = "freelancer" | "client" | null

type UserData = {
  name: string
  avatar: string
} | null

export function useAuth() {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<Role>(null)
  const [userData, setUserData] = useState<UserData>(null)
  const [loading, setLoading] = useState(true)

  const extractRole = (session: any): Role => {
    return session?.user?.app_metadata?.role ?? null
  }

  const fetchUserData = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("name, avatar")
      .eq("id", userId)
      .single()

    return data
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data.session

      setSession(session)
      setUser(session?.user ?? null)
      setRole(extractRole(session))

      if (session?.user?.id) {
        const profile = await fetchUserData(session.user.id)
        setUserData(profile)
      }

      setLoading(false)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setRole(extractRole(session))

        if (session?.user?.id) {
          const profile = await fetchUserData(session.user.id)
          setUserData(profile)
        } else {
          setUserData(null)
        }

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
    userData,
    loading,

    isLoggedIn: !!session,
    isClient: role === "client",
    isFreelancer: role === "freelancer",
  }
}
