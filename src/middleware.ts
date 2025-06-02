import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];
const PUBLIC_ROUTES = ["/login", "/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("firebaseIdToken")?.value; // Example: adjust cookie name as per your auth setup

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
