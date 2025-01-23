/**
 * NextAuth configuration for authentication handling
 * Supports both Google OAuth and credentials-based authentication
 */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { AuthOptions } from 'next-auth';

/**
 * Main authentication handler that configures providers and authentication options
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
  },
  callbacks: {
    // @ts-expect-error | Authorized is part of the NextAuth callbacks: https://authjs.dev/reference/nextjs#authorized
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPlay = nextUrl.pathname.startsWith('/play');
      if (isOnPlay) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/play', nextUrl));
      }
      return true;
    },
  },

  providers: [
    /**
     * Google OAuth provider configuration
     * Requires GOOGLE_ID and GOOGLE_SECRET environment variables
     * Uses offline access for refresh tokens and explicit consent prompt
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    /**
     * Credentials provider for username/password authentication
     * Provides a basic form with username and password fields
     */
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Authorization function for credentials validation
       * @param credentials - Object containing username and password
       * @param req - NextAuth request object
       * @returns User object if authenticated, null if invalid
       */
      async authorize(credentials, req) {
        const res = await fetch('/your/endpoint', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies AuthOptions);
