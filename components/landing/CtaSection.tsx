import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="container">
        <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-primary to-chart-2 p-12 text-center shadow-2xl md:p-20">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl leading-tight font-bold text-primary-foreground md:text-5xl">
              Start managing your freelance business smarter
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              Organize everything in one place and focus on delivering great
              work. Join thousands of freelancers who have already simplified
              their life.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Button
                size="lg"
                className="h-auto rounded-xl bg-white px-10 py-5 text-base font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90 active:scale-95"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto rounded-xl border-white/30 bg-white/10 px-10 py-5 text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                Schedule a Demo
              </Button>
            </div>

            <p className="text-xs font-medium text-primary-foreground/60">
              No credit card required. 14-day free trial on Pro features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
