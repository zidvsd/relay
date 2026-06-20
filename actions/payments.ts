"use server"

import { createClient } from "@/lib/supabase/server"
import { verifySession, verifyRole } from "@/lib/dal"
import { revalidatePath } from "next/cache"

export async function getPayments() {
  const { user, role, profile } = await verifySession()
  const supabase = await createClient()

  if (role === "freelancer") {
    const { data, error } = await supabase
      .from("payments")
      .select("*, projects!inner(title, user_id, clients(name, company))")
      .eq("projects.user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }

  // client view
  const { data, error } = await supabase
    .from("payments")
    .select("*, projects!inner(title, clients!inner(email))")
    .eq("projects.clients.email", profile.email)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getPaymentsByProject(projectId: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("payments")
    .select("*, projects!inner(user_id)")
    .eq("project_id", projectId)
    .eq("projects.user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function createInvoice(input: {
  project_id: string
  amount: number
  payment_date?: string
}) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  // confirm ownership of project before inserting
  const { data: project, error: projError } = await supabase
    .from("projects")
    .select("id")
    .eq("id", input.project_id)
    .eq("user_id", user.id)
    .single()

  if (projError || !project)
    throw new Error("Unauthorized or project not found")

  const { data, error } = await supabase
    .from("payments")
    .insert({ ...input, status: "pending" })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/payments")
  return data
}

export async function markAsPaid(paymentId: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  // verify ownership through the project relationship
  const { data: payment, error: fetchError } = await supabase
    .from("payments")
    .select("id, projects!inner(user_id)")
    .eq("id", paymentId)
    .eq("projects.user_id", user.id)
    .single()

  if (fetchError || !payment)
    throw new Error("Unauthorized or payment not found")

  const { data, error } = await supabase
    .from("payments")
    .update({
      status: "paid",
      payment_date: new Date().toISOString().split("T")[0],
    })
    .eq("id", paymentId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/payments")
  return data
}

export async function updatePaymentStatus(
  paymentId: string,
  status: "pending" | "paid" | "overdue"
) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data: payment, error: fetchError } = await supabase
    .from("payments")
    .select("id, projects!inner(user_id)")
    .eq("id", paymentId)
    .eq("projects.user_id", user.id)
    .single()

  if (fetchError || !payment)
    throw new Error("Unauthorized or payment not found")

  const { data, error } = await supabase
    .from("payments")
    .update({ status })
    .eq("id", paymentId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/payments")
  return data
}

export async function deletePayment(paymentId: string) {
  const { user } = await verifyRole("freelancer")
  const supabase = await createClient()

  const { data: payment, error: fetchError } = await supabase
    .from("payments")
    .select("id, projects!inner(user_id)")
    .eq("id", paymentId)
    .eq("projects.user_id", user.id)
    .single()

  if (fetchError || !payment)
    throw new Error("Unauthorized or payment not found")

  const { error } = await supabase.from("payments").delete().eq("id", paymentId)

  if (error) throw new Error(error.message)
  revalidatePath("/freelancer/payments")
}
