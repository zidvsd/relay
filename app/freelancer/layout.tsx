import DashboardLayout from "@/components/layout/DashboardLayout"
import { verifySession } from "@/lib/dal"
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, user, profile } = await verifySession()
  return (
    <DashboardLayout role={role} user={user} profile={profile}>
      {children}
    </DashboardLayout>
  )
}
