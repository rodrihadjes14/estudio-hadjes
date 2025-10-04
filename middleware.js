import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  // Aplica a todo /lp/*
  if (url.pathname.startsWith("/lp/")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, noimageindex");
  }
  return res;
}

export const config = {
  matcher: ["/lp/:path*"],
};
