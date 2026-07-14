import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { prisma } from "@/server/db/prisma";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize() {
        // Will implement in next phase
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
};