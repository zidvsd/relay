import { createClient } from "../lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export async function getProfile(userId: string) {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  return profile
}

export async function setUserRole(role: "freelancer" | "client") {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  await supabase.from("profiles").update({ role }).eq("id", user.id)

  const cookieStore = await cookies()
  cookieStore.set("user_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect(`/${role}/dashboard`)
}
