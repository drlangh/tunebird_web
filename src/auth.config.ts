/**
 * NextAuth configuration for authentication handling wihout Prisma
 * Supports Spotify OAuth authentication
 */

import Spotify from 'next-auth/providers/spotify';
import type { NextAuthConfig } from 'next-auth';

export default {
  pages: {
    /**
     * Declares the login page as the default sign-in page
     */
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
  ],
} satisfies NextAuthConfig;
