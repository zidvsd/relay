import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Logo from "@/app/icon.svg"
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-10 flex items-center justify-center gap-1.5 text-lg font-medium tracking-widest text-muted-foreground uppercase">
        Relay
        <Link href={"/"}>
          <Image className="size-6" src={Logo} alt="logo" />
        </Link>
      </div>

      <h1 className="text-[96px] leading-none font-medium tracking-tighter text-foreground">
        404
      </h1>
      <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-primary" />

      <p className="mt-5 text-xl font-medium text-foreground">Page not found</p>
      <p className="mt-2 mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
        This page doesn't exist or may have been moved. Double-check the URL or
        head back to safety.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
