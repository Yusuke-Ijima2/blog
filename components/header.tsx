'use client';

import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Newspaper } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">マイブログ</span>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}