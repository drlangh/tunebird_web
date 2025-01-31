import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Head from 'next/head';

const fonarto = localFont({
  src: [
    {
      path: './fonts/FonartoRegular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/FonartoBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/FonartoLight.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--fonarto',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--lexend',
});

export const metadata: Metadata = {
  title: 'Tunebird',
  description: 'The music game where the music never stops.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh">
      <Head>
        <meta
          http-equiv="ScreenOrientation"
          content="autoRotate:disabled"
        />
      </Head>
      <body
        className={`${fonarto.style} ${lexend.className} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
