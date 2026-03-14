import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'TriPortfolio — 10–100x Multi-Bagger Hunter',
  description: 'Deep-dive stock analyses inspired by Amazon, Netflix and Shopify in their early days.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}