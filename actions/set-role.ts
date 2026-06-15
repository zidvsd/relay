"use server"

import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
export async function setRole(role: "freelancer" | "client") {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // update profile table
  await supabase.from("profiles").update({ role }).eq("id", user.id)

  const cookieStore = await cookies()
  cookieStore.set("user_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  // update auth metadata (admin only)
  redirect(
    role === "freelancer" ? "/freelancer/dashboard" : "/client/dashboard"
  )
}
