"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function setRole(role: "freelancer" | "client") {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // update profile table
  await supabase.from("profiles").update({ role }).eq("id", user.id)

  // update auth metadata (admin only)
  await supabaseAdmin.auth.admin.updateUserById(user.id, {
    app_metadata: { role },
  })
}
