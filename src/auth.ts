/**
 * NextAuth configuration for authentication handling
 * Supports both Google OAuth and credentials-based authentication
 */
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Spotify from 'next-auth/providers/spotify';

import type { NextAuthConfig } from 'next-auth';

/**
 * Main authentication handler that configures providers and authentication options
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
  },
  callbacks: {
    /**
     * Authorization callback for protected routes
     * Redirects to login page if user is not authenticated
     * Redirects to play page if user is authenticated
     * @param param0 - Object containing auth and request objects
     * @returns True if user is authenticated, false if not
     * @returns Redirect to play page if user is authenticated
     */
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

    /**
     * JWT callback for token generation
     * @param param0 - Object containing token and account objects
     * @returns Token object with access token
     */
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.expires_in = account.expires_in;
        token.provider = account.provider;
      }
      return token;
    },

    /**
     * Session callback for session object generation
     * @param param0 - Object containing session, token, and account objects
     * @returns Session object with token
     */
    async session({ session, token }) {
      return {
        ...session,
        token,
      };
    },
  },

  providers: [
    /**
     * Spotify OAuth provider configuration
     * Requires SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables
     */
    Spotify({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,user-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
    // /**
    //  * Google OAuth provider configuration
    //  * Requires GOOGLE_ID and GOOGLE_SECRET environment variables
    //  * Uses offline access for refresh tokens and explicit consent prompt
    //  */
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // /**
    //  * Credentials provider for username/password authentication
    //  * Provides a basic form with username and password fields
    //  */
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username',
    //       type: 'text',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   /**
    //    * Authorization function for credentials validation
    //    * @param credentials - Object containing username and password
    //    * @param req - NextAuth request object
    //    * @returns User object if authenticated, null if invalid
    //    */
    //   async authorize(credentials, req) {
    //     const res = await fetch('/your/endpoint', {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //       headers: { 'Content-Type': 'application/json' },
    //     });
    //     const user = await res.json();

    //     if (res.ok && user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig);
