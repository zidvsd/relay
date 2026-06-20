import "server-only"
import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
export const verifySession = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) redirect("/signin")

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Profile query error:", profileError)
    redirect("/role-select")
  }

  if (!profile?.role) redirect("/role-select")

  return {
    user,
    role: profile.role as "freelancer" | "client",
    profile,
  }
})

export const verifyRole = cache(async (required: "freelancer" | "client") => {
  const session = await verifySession()

  if (session.role !== required) {
    redirect(`/${session.role}/dashboard`)
  }

  return session
})
