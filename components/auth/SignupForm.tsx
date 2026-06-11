"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Logo from "@/app/icon.svg"
import { supabase } from "@/lib/supabase/supabaseClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
      },
    })

    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Check your email for confirmation link!")
      router.push("/signin")
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-foreground dark:bg-background">
      <div className="pointer-events-none absolute inset-0 right-0 hidden overflow-hidden md:block">
        {/* Outer big circle */}
        <div className="absolute top-0 left-1/1 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50" />
        {/* Inner circle */}
        <div className="absolute top-0 left-1/1 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground dark:bg-background" />
      </div>

      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative max-w-lg gap-6 px-6 py-8 sm:p-12">
          <CardHeader className="text-center">
            <a href="/">
              <Image src={Logo} className="mx-auto w-4" alt="logo" />
            </a>

            <CardTitle className="text-2xl font-medium text-card-foreground">
              Create your <span className="font-bold text-primary">Relay</span>{" "}
              account
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Sign up to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSignup}>
              <FieldGroup className="gap-6">
                {/* Google signup */}
                <Field>
                  <Button
                    type="button"
                    onClick={signUpWithGoogle}
                    variant="outline"
                    className="h-9 gap-2"
                  >
                    <img
                      src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
                      alt="google"
                      className="h-4 w-4"
                    />
                    Sign up with Google
                  </Button>
                </Field>

                <FieldSeparator>
                  <span className="px-4">or sign up with email</span>
                </FieldSeparator>

                {/* Email */}
                <Field className="gap-1.5">
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </Field>

                {/* Password */}
                <Field className="gap-1.5">
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="h-10 rounded-lg"
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>

                <FieldDescription className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-card-foreground"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
