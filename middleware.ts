import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("mechanic_token")?.value;

  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // Redirect unauthenticated users
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Redirect authenticated users away from auth pages
  if (
    token &&
    (pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  const response = NextResponse.next();

  response.headers.set(
    "X-Frame-Options",
    "DENY"
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin"
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};