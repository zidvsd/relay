"use server"

import { createClient } from "@/lib/supabase/server"
import { verifyRole } from "@/lib/dal"
import { revalidatePath } from "next/cache"

// helper: confirms the project belongs to the freelancer before touching tasks
async function assertOwnsProject(projectId: string, userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", userId)
    .single()

  if (error || !data) throw new Error("Unauthorized or project not found")
}

export async function getTasksByProject(projectId: string) {
  const { user } = await verifyRole("freelancer")
  await assertOwnsProject(projectId, user.id)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function createTask(input: {
  project_id: string
  title: string
  priority?: string
}) {
  const { user } = await verifyRole("freelancer")
  await assertOwnsProject(input.project_id, user.id)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...input, priority: input.priority ?? "medium" })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/freelancer/projects/${input.project_id}`)
  revalidatePath("/freelancer/kanban")
  return data
}

export async function toggleTaskDone(
  taskId: string,
  projectId: string,
  isDone: boolean
) {
  const { user } = await verifyRole("freelancer")
  await assertOwnsProject(projectId, user.id)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .update({ is_done: isDone })
    .eq("id", taskId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/freelancer/projects/${projectId}`)
  revalidatePath("/freelancer/kanban")
  return data
}

export async function updateTask(
  taskId: string,
  projectId: string,
  updates: Partial<{ title: string; priority: string; is_done: boolean }>
) {
  const { user } = await verifyRole("freelancer")
  await assertOwnsProject(projectId, user.id)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/freelancer/projects/${projectId}`)
  return data
}

export async function deleteTask(taskId: string, projectId: string) {
  const { user } = await verifyRole("freelancer")
  await assertOwnsProject(projectId, user.id)

  const supabase = await createClient()
  const { error } = await supabase.from("tasks").delete().eq("id", taskId)

  if (error) throw new Error(error.message)
  revalidatePath(`/freelancer/projects/${projectId}`)
  revalidatePath("/freelancer/kanban")
}
