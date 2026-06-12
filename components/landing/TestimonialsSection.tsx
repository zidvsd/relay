import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Relay has completely transformed how I handle my projects. I no longer lose track of invoices or client details. It's a game-changer for my sanity.",
    name: "Sarah Jenkins",
    role: "Product Designer",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwV7nsZ_9fz9frdgtZCMTr_EgWKewNQ9SCgYAlehIoZDDRi7m9CMSJrBkuZArJIgc8fZAovz0ekbpjmAzViEI8TQv1xxmMGvZeONnrXavRUCS2t14p9C902blCYTD3J1UrNT7aWo2euloQtkrDv3gnq_9VUnu-xbp7H5V9thrI1bFetQ9TcSqsECy3vHV14O4rAaVfblQ6AhKHtApXvli7Rv1s4DeqpQByR_ZT7riEfIZqDdeMQOIMx8GrJblAfxRyp3YgN9qNbg",
  },
  {
    quote:
      "The financial tracking is what won me over. Seeing my revenue growth visualized makes it so much easier to plan my business goals.",
    name: "Marcus Chen",
    role: "Full-stack Freelancer",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN7PfOAQiQiPP1rhdiIEOzmMLsiGXVRlZGe7iBOopLZb95tE8fWfNqqPK7Fs50DNtLmS9ZIGP95ggLv-3XwrhU-QeiiKuIVAUE2pQEse9Neg8pAAIu-ZwUDFr1LUlrlGTpqiI28tM8Vm-bOM8w_3e43d5Py5jpctiCN6sspzlGCnKbAeqHZ6xv4GHlv-lvxn_llag5jANOqX9RS92GOt4GMb_GkVK-LWw2tlsrR1wTXNrYAqG9GChppYvTP38_zuarl1rnAWpzbQ",
  },
  {
    quote:
      "Simple, elegant, and powerful. I tried every project manager out there, but Relay is the only one that felt right for a solo pro.",
    name: "Elena Rodriguez",
    role: "Content Strategist",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACbi6dfjLbGorNvHWAfC_s-fi1YhDCzL6LB1pPR0q5cLG8-r1WvAv1XUrDZNqDt1unfWfVyr603TIXj3xf4PB74jw7_l3cLOk42dcbiErWDDrocutCvb-JuSU-TR8JXxdMHJwj5rXsGSGfOQebshyNhSiib3mim-Zon5HKO88qosyX62PKZhkw_p4vqA5h6p4seNt-uQmO0I0wwqxF0YENXkSnlYN7Xyg69t4R0g0pct8hpTvSNA4vmuf7TQzAdr6E_VkygCEi1Q",
  },
]

function StarRow({ size = 4 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-chart-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-${size} w-${size} fill-current`} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-primary/5 py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Trusted by freelancers worldwide
          </h2>
          <div className="mb-2 flex justify-center">
            <StarRow size={5} />
          </div>
          <p className="text-sm text-muted-foreground">
            Rated 4.9/5 by 2,000+ verified users
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col p-8">
                <StarRow size={4} />
                <p className="mt-4 mb-8 flex-1 text-sm leading-relaxed text-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
