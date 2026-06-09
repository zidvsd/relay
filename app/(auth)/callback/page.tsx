"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        router.push("/login")
        return
      }

      if (data.session) {
        router.push("/dashboard")
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      Logging you in...
    </div>
  )
}
