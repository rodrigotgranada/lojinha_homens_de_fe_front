import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Don't intercept API routes or internal static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Domain Acampar: rewrite root "/" to "/acampar"
  if (host.startsWith("acampar") || host.includes("acampar.")) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/acampar", request.url));
    }
  }

  // Domain Trabalhar: rewrite root "/" to "/trabalhar"
  if (host.startsWith("trabalhar") || host.includes("trabalhar.")) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/trabalhar", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
