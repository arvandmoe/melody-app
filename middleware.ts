import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.cookies.has("token") &&
    !req.nextUrl.pathname.startsWith(`/auth`)
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (
    !req.nextUrl.pathname.startsWith("/_next") &&
    req.cookies.has("token") &&
    req.nextUrl.pathname.startsWith(`/auth`)
  ) {
    return NextResponse.redirect(new URL(`/auth/login`, req.url));
  }
  return NextResponse.next();
}
