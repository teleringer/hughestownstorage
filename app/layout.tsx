
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hughestown Self-Storage - Safe & Secure Storage in Northeast PA',
  description: 'Professional self-storage facility in Hughestown, PA offering secure outdoor storage units, easy online rentals, and competitive prices. Gate access 6AM-10PM daily.',
  icons: {
    icon: 'https://static.readdy.ai/image/34eddc7177ae71b8c76003a700ee36ff/94da1e3f30333dc13909911ec38c3f0c.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}