import Image from "next/image"

const steps = [
  {
    number: 1,
    title: "Add Your Clients",
    description:
      "Import your existing client list or add new ones manually. Set up custom rates and preferences for each.",
  },
  {
    number: 2,
    title: "Create Projects & Tasks",
    description:
      "Define project scopes, set deadlines, and organize tasks. Use our visual boards to keep everything moving.",
  },
  {
    number: 3,
    title: "Track Work & Payments",
    description:
      "Mark tasks as complete and generate invoices instantly. Monitor your cash flow with real-time financial reporting.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-primary/5 py-24">
      <div className="container">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Left: Steps */}
          <div className="lg:w-1/2">
            <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
              Streamline your workflow in minutes
            </h2>

            <div className="relative space-y-12">
              {/* Vertical line */}
              <div className="absolute top-2 bottom-2 left-6 hidden w-0.5 bg-border md:block" />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex items-start gap-8"
                >
                  <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-primary/20 to-chart-2/20 blur-3xl" />
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMirGK4wc2oGhL4HJ3GIOy8T_d69DdTmDMFroNuXfCW5DZEQCgIljoVj4kqIDCYzlihIgj-i-arm3-mtyp3016dwMVhlWgMtTmeWZ6BgtPicmZK5LdN6RQEpRQe3KAFr9ae115h7NPLhs0YPWckUcBgiEkrSjG5GgidHEg7LHgxlYbamkW-N-YupLn8QsFz5xDdMaar6Bl590qcPtMi30B-MNX47JQjDvGbNPapqcnpOBhwIUxU_HdAugYGQ4JIR4sfU9SP5Fxaw"
                alt="Professional project management dashboard mockup on a laptop"
                width={700}
                height={394}
                className="aspect-video w-full rounded-3xl border border-border object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
