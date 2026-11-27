import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// self-hosted by next/font, exposed as CSS variables for globals.css
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono' });

export const metadata = {
  title: 'KenduriSafe — Book trusted kenduri caterers',
  description: 'Book verified kenduri caterers with protected, staged payments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
