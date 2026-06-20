"use server"

import { createClient } from "@/lib/supabase/server"
import { verifyRole } from "@/lib/dal"
import { revalidatePath } from "next/cache"

export async function getClients() {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getClient(id: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function createClientRecord(input: {
  name: string
  company?: string
  email?: string
}) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .insert({ ...input, user_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/clients")
  return data
}

export async function updateClient(
  id: string,
  updates: Partial<{ name: string; company: string; email: string }>
) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/clients")
  return data
}

export async function deleteClient(id: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/clients")
}
