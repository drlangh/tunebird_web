/**
 * NextAuth configuration for authentication handling
 * Supports Spotify OAuth provider
 */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';

import type { NextAuthConfig } from 'next-auth';

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
      const [spotifyAccount] = await prisma.account.findMany({
        where: { userId: session.user.id, provider: 'spotify' },
      });

      if (
        spotifyAccount &&
        typeof spotifyAccount.expires_at === 'number' &&
        spotifyAccount.refresh_token &&
        Date.now() < spotifyAccount.expires_at * 1000
      ) {
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
                refresh_token: spotifyAccount.refresh_token,
              }),
            }
          );

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          await prisma.account.update({
            data: {
              access_token: newTokens.access_token,
              expires_at: newTokens.expires_in,
              refresh_token:
                newTokens.refresh_token ||
                spotifyAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'spotify',
                providerAccountId: spotifyAccount.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error('Error refreshing access_token', error);
        }
      }
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
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope:
            'user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,user-read-private',
          response_type: 'code',
          show_dialog: false,
        },
      },
    }),
  ],
} satisfies NextAuthConfig);
