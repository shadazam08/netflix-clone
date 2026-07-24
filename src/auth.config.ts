import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        // Authentication logic next step me likhenge
        return null;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export default authConfig;
