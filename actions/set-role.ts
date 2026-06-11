import { supabase } from "@/lib/supabase/supabaseClient"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function setRole(role: "freelancer" | "client") {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  await supabase.from("profiles").update({ role }).eq("id", user.id)

  await supabaseAdmin.auth.admin.updateUserById(user.id, {
    app_metadata: { role },
  })
}
