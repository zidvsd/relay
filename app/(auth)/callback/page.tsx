// app/callback/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"
import { Spinner } from "@/components/ui/spinner"
export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handle = async () => {
      // For implicit flow — session is set automatically from the hash fragment
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        router.replace("/dashboard")
        return
      }

      // Listen for the auth state change triggered by the hash
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          subscription.unsubscribe()
          router.replace("/dashboard")
        } else if (event === "SIGNED_OUT" || !session) {
          subscription.unsubscribe()
          router.replace("/signin")
        }
      })

      // Cleanup if component unmounts
      return () => subscription.unsubscribe()
    }

    handle()
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="size-24" />
      Logging you in...
    </div>
  )
}
