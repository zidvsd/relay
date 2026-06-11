"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"
import { Spinner } from "@/components/ui/spinner"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.replace("/dashboard")
      } else {
        router.replace("/signin")
      }
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
