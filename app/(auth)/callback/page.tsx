"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const code = new URLSearchParams(window.location.search).get("code")

      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
      }
      router.replace("/dashboard")
    }

    run()
  }, [router])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary text-white">
      <Spinner className="size-24" />
      Logging you in...
    </div>
  )
}
