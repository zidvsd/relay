"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Laptop, Briefcase, CheckCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { setRole } from "@/actions/set-role"
type Role = "freelancer" | "client"

export default function RoleSelectPage() {
  const router = useRouter()

  const [pendingRole, setPendingRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  async function confirmRole() {
    if (!pendingRole) return
    setLoading(true)

    try {
      await setRole(pendingRole)
    } catch {
      setLoading(false)
    }
  }

  const roles = [
    {
      key: "freelancer" as Role,
      label: "I am a Freelancer",
      description:
        "Complete suite for independent professionals to scale their business.",
      icon: Briefcase,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      checkColor: "text-primary",
      hoverBorder: "hover:border-primary/60",
      buttonVariant: "default" as const,
      buttonLabel: "Continue as Freelancer",
      dialogTitle: "Continue as a Freelancer?",
      dialogDescription:
        "Your account will be set up as a Freelancer. You'll get access to time tracking, invoicing, and client management tools.",
      features: [
        "Track time and manage task pipelines",
        "Send smart invoices and get paid faster",
        "Manage multiple client relationships",
      ],
    },
    {
      key: "client" as Role,
      label: "I am a Client",
      description:
        "Monitor progress and collaborate with your hired talent seamlessly.",
      icon: Laptop,
      iconBg: "bg-muted",
      iconColor: "text-foreground",
      checkColor: "text-muted-foreground",
      hoverBorder: "hover:border-muted-foreground/40",
      buttonVariant: "outline" as const,
      buttonLabel: "Enter Client Portal",
      dialogTitle: "Continue as a Client?",
      dialogDescription:
        "Your account will be set up as a Client. You'll get access to project tracking, milestone approvals, and your team communication hub.",
      features: [
        "Real-time project timeline tracking",
        "Approve milestones and release funds",
        "Centralized communication hub",
      ],
    },
  ]

  const pendingRoleData = roles.find((r) => r.key === pendingRole)

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center px-4 py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl leading-tight font-medium text-foreground">
          Choose your experience
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Select how you'll be using FreelanceFlow today. We'll tailor your
          workspace to fit your workflow perfectly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {roles.map(
          ({
            key,
            label,
            description,
            icon: Icon,
            iconBg,
            iconColor,
            checkColor,
            hoverBorder,
            buttonVariant,
            buttonLabel,
            features,
          }) => (
            <div
              key={key}
              onClick={() => setPendingRole(key)}
              className={`group flex cursor-pointer flex-col rounded-xl border border-border bg-card p-8 transition-colors ${hoverBorder}`}
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <h2 className="mb-2 text-lg font-medium text-card-foreground">
                {label}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <ul className="mb-8 flex flex-col gap-2">
                {features.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant={buttonVariant}
                className="mt-auto w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setPendingRole(key)
                }}
              >
                {buttonLabel}
              </Button>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <HelpCircle className="h-4 w-4" />
        Not sure which one to pick?{" "}
        <Button variant="link" className="h-auto p-0 text-sm" asChild>
          <a href="#">Talk to our team.</a>
        </Button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        open={!!pendingRole}
        onOpenChange={(open) => {
          if (!open) setPendingRole(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingRoleData?.dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingRoleData?.dialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRole} disabled={loading}>
              {loading ? "Saving..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
