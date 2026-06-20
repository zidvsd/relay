"use server"

import { createClient } from "@/lib/supabase/server"
import { verifySession, verifyRole } from "@/lib/dal"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  const { user, role, profile } = await verifySession()
  const supabase = await createClient()

  if (role === "freelancer") {
    const { data, error } = await supabase
      .from("projects")
      .select("*, clients(name, company), tasks(id, is_done)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }

  // client: see projects where the linked client record matches their email
  const { data, error } = await supabase
    .from("projects")
    .select("*, clients!inner(name, company, email), tasks(id, is_done)")
    .eq("clients.email", profile.email)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getProject(id: string) {
  const { user, role, profile } = await verifySession()
  const supabase = await createClient()

  const query = supabase
    .from("projects")
    .select("*, clients(*), tasks(*), payments(*)")
    .eq("id", id)
    .single()

  const { data, error } = await query
  if (error) throw new Error(error.message)

  // authorization check after fetch since we need to compare ownership
  const isOwner = role === "freelancer" && data.user_id === user.id
  const isClientMatch =
    role === "client" && data.clients?.email === profile.email

  if (!isOwner && !isClientMatch) throw new Error("Unauthorized")

  return data
}

export async function getProjectsByClient(clientId: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*, tasks(id, is_done)")
    .eq("client_id", clientId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createProject(input: {
  title: string
  description?: string
  client_id?: string
  status?: string
  deadline?: string
}) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...input,
      user_id: user.id,
      status: input.status ?? "not_started",
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/projects")
  revalidatePath("/freelancer/kanban")
  return data
}

export async function updateProject(
  id: string,
  updates: Partial<{
    title: string
    description: string
    status: string
    deadline: string
    client_id: string
  }>
) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/projects")
  revalidatePath("/freelancer/kanban")
  revalidatePath(`/freelancer/projects/${id}`)
  return data
}

export async function updateProjectStatus(id: string, status: string) {
  return updateProject(id, { status })
}

export async function deleteProject(id: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/projects")
  revalidatePath("/freelancer/kanban")
}
