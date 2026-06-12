import DashboardLayout from "@/components/layout/DashboardLayout"

// app/freelancer/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="freelancer">{children}</DashboardLayout>
}
