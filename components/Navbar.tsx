'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-2xl tracking-tight text-zinc-900">
            TriPortfolio
          </Link>

          <div className="flex items-center gap-10 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Blog</Link>

            <div className="group relative">
              <span className="cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1">
                Philosophy ▼
              </span>
              <div className="absolute hidden group-hover:block pt-4">
                <div className="bg-white border border-zinc-200 rounded-xl shadow-xl py-3 px-6 w-56 text-sm">
                  <Link href="/philosophy#investing" className="block py-2 hover:text-blue-600">Investing</Link>
                  <Link href="/philosophy#flywheels" className="block py-2 hover:text-blue-600">Flywheels</Link>
                  <Link href="/philosophy#moats" className="block py-2 hover:text-blue-600">Moats</Link>
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}