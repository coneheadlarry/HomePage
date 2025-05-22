import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/signIN") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get("connect.sid");
  if (!session) {
    return NextResponse.redirect(new URL("/signIN", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!signIN|_next|favicon.ico|api).*)"],
};
