import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isCallbackRoute =
    path.startsWith("/callback") || path.startsWith("/auth/callback")
  const isPublicRoute =
    path === "/" || path.startsWith("/pricing") || path.startsWith("/about")
  const isProtectedRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/client") ||
    path.startsWith("/freelancer")
  const isAuthRoute = path.startsWith("/signin") || path.startsWith("/signup")
  const isRoleSelect = path.startsWith("/role-select")

  if (isCallbackRoute) return supabaseResponse

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  if (user && !isRoleSelect) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const role = profile?.role

    const hasRole = role && role !== "null"

    if (!hasRole) {
      return NextResponse.redirect(new URL("/role-select", request.url))
    }
    if (path === "/dashboard") {
      return NextResponse.redirect(
        new URL(
          role === "client" ? "/client/dashboard" : "/freelancer/dashboard",
          request.url
        )
      )
    }

    // Block freelancers from client routes
    if (role === "freelancer" && path.startsWith("/client")) {
      return NextResponse.redirect(
        new URL("/freelancer/dashboard", request.url)
      )
    }

    // Block clients from freelancer routes
    if (role === "client" && path.startsWith("/freelancer")) {
      return NextResponse.redirect(new URL("/client/dashboard", request.url))
    }
  }

  return supabaseResponse
}
