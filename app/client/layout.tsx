import DashboardLayout from "@/components/layout/DashboardLayout"
import { getProfile } from "@/services/profile"
import { createClient } from "@/lib/supabase/server"
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const profile = user ? await getProfile(user.id) : null

  const role = profile?.role ?? "client"

  return (
    <DashboardLayout role={role} user={user} profile={profile}>
      {children}
    </DashboardLayout>
  )
}
