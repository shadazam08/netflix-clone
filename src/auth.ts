import NextAuth from "next-auth";

import { authConfig } from "@/server/auth";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);