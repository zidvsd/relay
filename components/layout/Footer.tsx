import Link from "next/link"
import { BadgeCheck, Globe, MessageCircle, Mail } from "lucide-react"

const footerLinks = {
  Product: ["Features", "Pricing", "Templates", "Integrations"],
  Company: ["About Us", "Careers", "Blog", "Contact"],
  Support: ["Help Center", "Privacy Policy", "Terms of Service", "Security"],
}

const socialIcons = [
  { icon: Globe, label: "Website" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Mail, label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 px-6 py-20 md:px-10">
      <div className="container">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BadgeCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">
                FreelanceFlow
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The all-in-one workspace for the modern freelancer. Organize
              projects, clients, and payments with ease.
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="mb-6 font-semibold text-foreground">{title}</h5>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-10 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2024 FreelanceFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Cookies", "Status", "Accessibility"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
