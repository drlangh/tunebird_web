/**
 * NextAuth configuration for authentication handling
 * Supports Spotify Authenthication
 */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Spotify from 'next-auth/providers/spotify';

import type { NextAuthConfig } from 'next-auth';

import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const neon = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaNeon(neon);

const prisma = new PrismaClient({ adapter });

/**
 * Main authentication handler that configures providers and authentication options
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
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
        const expires_in = account.expires_in
          ? Math.floor(Date.now() / 1000 + account.expires_in)
          : undefined;

        return {
          ...token,
          access_token: account.access_token,
          expires_at: expires_in,
          refresh_token: account.refresh_token,
        };
      } else if (
        typeof token.expires_at === 'number' &&
        Date.now() / 1000 < token.expires_at
      ) {
        return token;
      } else {
        if (
          !token.refresh_token ||
          typeof token.refresh_token !== 'string'
        ) {
          console.error('Missing or invalid refresh_token');
          return { ...token, error: 'RefreshTokenError' };
        }

        try {
          const response = await fetch(
            'https://accounts.spotify.com/api/token',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString('base64')}`,
              },
              body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
              }),
            }
          );

          const newTokens = await response.json();
          if (!response.ok) throw newTokens;

          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + newTokens.expires_in
            ),
            refresh_token:
              newTokens.refresh_token || token.refresh_token, // Si no devuelve uno nuevo, conservar el anterior
          };
        } catch (error) {
          console.error('Error refreshing access_token', error);
          return { ...token, error: 'RefreshTokenError' };
        }
      }
    },

    /**
     * Session callback for session object generation
     * @param param0 - Object containing session, token, and account objects
     * @returns Session object with token
     */
    async session({ session, token }) {
      return {
        ...session,
        access_token: token.access_token,
        error: token.error || null,
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
    //  * Uses offline access for refre tokens and explicit consent prompt
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
  ],
} satisfies NextAuthConfig);
