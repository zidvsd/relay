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

  const is = {
    callback: path.startsWith("/auth/callback") || path.startsWith("/callback"),
    public:
      path === "/" || path.startsWith("/pricing") || path.startsWith("/about"),
    protected:
      path.startsWith("/dashboard") ||
      path.startsWith("/client") ||
      path.startsWith("/freelancer"),
    auth: path.startsWith("/signin") || path.startsWith("/signup"),
    roleSelect: path.startsWith("/role-select"),
    dashboard: path === "/dashboard",
  }

  if (is.callback) return supabaseResponse

  if (!user && is.protected) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  if (!user) return supabaseResponse

  let role = request.cookies.get("user_role")?.value

  if (!role) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    role = profile?.role ?? undefined

    // Sync the cookie so subsequent requests don't hit the DB
    if (role) {
      supabaseResponse.cookies.set("user_role", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    }
  }

  if (user && is.auth) {
    const dest = role ? `/${role}/dashboard` : "/role-select"
    return NextResponse.redirect(new URL(dest, request.url))
  }

  if (user && !role && !is.roleSelect && !is.public) {
    return NextResponse.redirect(new URL("/role-select", request.url))
  }

  if (user && role && is.dashboard) {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
  }

  if (role === "freelancer" && path.startsWith("/client")) {
    return NextResponse.redirect(new URL("/freelancer/dashboard", request.url))
  }

  if (role === "client" && path.startsWith("/freelancer")) {
    return NextResponse.redirect(new URL("/client/dashboard", request.url))
  }

  return supabaseResponse
}
