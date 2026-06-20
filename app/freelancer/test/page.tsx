// app/freelancer/test/page.tsx
import { createClientRecord } from "@/actions/clients"
import { getClients } from "@/actions/clients"

export default async function TestPage() {
  const clients = await getClients()

  async function handleCreate(formData: FormData) {
    "use server"
    await createClientRecord({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    })
  }

  return (
    <div className="p-4">
      <form action={handleCreate}>
        <input name="name" placeholder="Name" className="border p-1" />
        <input name="email" placeholder="Email" className="border p-1" />
        <button type="submit">Create</button>
      </form>
      <pre className="mt-4 text-xs">{JSON.stringify(clients, null, 2)}</pre>
    </div>
  )
}
