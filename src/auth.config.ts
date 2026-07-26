import type { NextAuthConfig } from 'next-auth';
import { credentialsProvider } from './auth.providers';

const authConfig = {
  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  providers: [credentialsProvider],

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.role = user.role;
  //       token.status = user.status;
  //     }

  //     return token;
  //   },

  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.id = token.id as string;
  //       session.user.role = token.role;
  //       session.user.status = token.status;
  //     }

  //     return session;
  //   },
  // },
  callbacks: {
    async authorized({ auth, request }) {
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;

      const isAuthPage =
        nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

      const isAdminPage = nextUrl.pathname.startsWith('/admin');

      // Guest-only pages
      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
        }

        return true;
      }

      // Protected admin pages
      if (isAdminPage) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }

        if (auth?.user.role !== 'ADMIN') {
          return Response.redirect(new URL('/', nextUrl));
        }

        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
