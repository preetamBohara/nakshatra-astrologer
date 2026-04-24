import { NextResponse } from "next/server";

const AUTH_TOKEN_KEY = "authToken";

function isAuthenticated(request) {
  return Boolean(request.cookies.get(AUTH_TOKEN_KEY)?.value);
}

export function proxy(request) {
  if (isAuthenticated(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/change-language",
    "/kyc-details",
    "/payout-history/:path*",
    "/review-ratings",
    "/blogs/:path*",
    "/offers/:path*",
    "/sessions/:path*",
    "/session-details",
    "/about-us",
    "/privacy-policy",
    "/terms-and-conditions",
    "/help-support",
    "/notifications",
    "/settings",
  ],
};
