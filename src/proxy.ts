import NextAuth from "next-auth";

import { authConfig } from "@/server/auth";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/api/:path*",
  ],
};