// app/client/test/page.tsx
import { getProjects } from "@/actions/projects"
import { getPayments } from "@/actions/payments"
import { verifySession } from "@/lib/dal"

export default async function ClientTestPage() {
  const { user, role, profile } = await verifySession()
  const [projects, payments] = await Promise.all([getProjects(), getPayments()])

  return (
    <pre className="p-4 text-xs">
      {JSON.stringify(
        { session: { role, email: profile.email }, projects, payments },
        null,
        2
      )}
    </pre>
  )
}
