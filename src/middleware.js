import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req) {
  // get requested path name
  const pathname = req.nextUrl.pathname;

  // get access token
  const rawToken = cookies(req).get("accessToken");
  const token = rawToken?.value;

  // if token is null, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // remove the 's:' prefix if available with the token
    const jwtToken = token.startsWith("s:") ? token.slice(2) : token;
    const payloadBase64 = jwtToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const { role } = decodedPayload;

    // allow access to admin routes only for admins
    if (pathname.startsWith("/dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    // allow access to user routes only for authenticated users
    const protectedPaths = ["/my-profile", "/my-orders"];

    if (
      protectedPaths.some((path) => pathname.startsWith(path)) &&
      !["user", "admin"].includes(role)
    ) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
  } catch (err) {
    // redirect to login if token is error
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // allow request to access if token is valid and role matches
  return NextResponse.next();
}

// define which routes the middleware should be execute
// matcher configuration
export const config = {
  matcher: ["/my-profile", "/my-orders", "/dashboard/:path*"],
};
