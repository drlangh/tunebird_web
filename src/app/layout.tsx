import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

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
  description:
    'A music player that helps you discover new music through AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fonarto.style} ${lexend.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
