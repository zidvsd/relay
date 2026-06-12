import { Card, CardContent } from "@/components/ui/card"
import { Users, FolderOpen, LayoutDashboard, CreditCard } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Keep all client contact info, contracts, and communication history in one organized database.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: FolderOpen,
    title: "Project Tracking",
    description:
      "Monitor timelines, milestones, and deliverables with a clean, intuitive project dashboard.",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
  {
    icon: LayoutDashboard,
    title: "Task Organization",
    description:
      "Break down complex projects into manageable tasks with our flexible Kanban and list views.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description:
      "Automate invoicing, track payment statuses, and view your revenue growth at a glance.",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-primary/5 py-24">
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Everything you need to thrive
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A complete suite of tools designed specifically for the modern
            independent professional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <div
                    className={`h-14 w-14 rounded-xl ${feature.iconBg} mb-6 flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
