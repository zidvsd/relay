"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  MoreVertical,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background glows (NOW using your scale system) */}
      <div className="pointer-events-none absolute top-0 right-0 -z-10 -mt-48 -mr-48 h-120 w-120 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 -mb-24 -ml-24 h-100 w-100 rounded-full bg-chart-2/10 blur-[100px]" />

      <div className="container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-8">
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted by 50,000+ Freelancers
            </Badge>

            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-foreground md:text-[56px]">
              Manage{" "}
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Clients, Projects & Payments
              </span>{" "}
              in One Place
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              FreelanceFlow helps freelancers organize work, track progress, and
              manage income effortlessly. Spend less time on admin and more time
              on creating.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                className="gap-2 rounded-xl bg-linear-to-r from-primary to-chart-2 text-primary-foreground shadow-xl transition-all hover:brightness-110 active:scale-95"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-primary/30 text-primary hover:bg-muted"
              >
                View Dashboard
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden h-150 items-center justify-center lg:flex">
            {/* Background shell */}
            <div className="absolute h-120 w-120 translate-x-4 -rotate-3 rounded-3xl border border-border bg-card/40 shadow-2xl backdrop-blur-sm" />

            {/* Earnings */}
            <Card className="animate-float1 absolute top-10 right-0 w-64 shadow-lg">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total Earnings
                  </span>
                  <span className="text-sm text-primary">💳</span>
                </div>

                <div className="text-2xl font-bold">$12,450.00</div>

                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +14.5% vs last month
                </div>
              </CardContent>
            </Card>

            {/* Kanban */}
            <Card className="animate-float2 absolute bottom-10 left-0 w-72 shadow-lg">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
                  <span className="text-sm font-bold">Kanban Board</span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: "Brand Identity Design",
                      status: "In Progress",
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      label: "API Integration",
                      status: "Review",
                      color: "bg-chart-2/10 text-chart-2",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-border bg-muted p-3"
                    >
                      <p className="text-xs font-semibold">{item.label}</p>
                      <span
                        className={`mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Clients */}
            <Card className="animate-float3 absolute top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 scale-110 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Active Clients</h3>

                <div className="space-y-4">
                  {[
                    {
                      initials: "AM",
                      name: "Acme Marketing",
                      sub: "3 Active Projects",
                      primary: true,
                    },
                    {
                      initials: "GT",
                      name: "Global Tech",
                      sub: "1 Project • $4,500",
                      primary: false,
                    },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                          c.primary
                            ? "bg-linear-to-tr from-primary to-chart-2 text-white"
                            : "bg-muted text-primary"
                        }`}
                      >
                        {c.initials}
                      </div>

                      <div>
                        <p className="text-sm font-bold">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {c.sub}
                        </p>
                      </div>

                      <MoreVertical className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Invoice */}
            <Card className="animate-float1 absolute right-4 bottom-20 w-56 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold">Invoice Paid</p>
                    <p className="text-[10px] text-muted-foreground">
                      #INV-2024-012
                    </p>
                  </div>

                  <p className="ml-auto text-sm font-bold">$2,800</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        .animate-float1 {
          animation: float1 6s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 8s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 7s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0px) translateX(-50%);
          }
          50% {
            transform: translateY(-12px) translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
