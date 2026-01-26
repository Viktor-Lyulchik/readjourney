'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout, isLoading } = useAuthStore();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <header className="bg-(--dark-grey) p-5 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <svg width="182" height="17">
          <use href="/icons.svg#icon-logo" fill="#F9F9F9" stroke="#141414" />
        </svg>
      </Link>

      {/* Navigation */}
      <nav>
        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link
              href="/recommended"
              className={cn(
                'hover:text-foreground',
                location.pathname === '/recommended' ? 'font-bold' : ''
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/library"
              className={cn(
                'hover:text-foreground',
                location.pathname === '/library' ? 'font-bold' : ''
              )}
            >
              My Library
            </Link>
          </li>
        </ul>

        {/* Mobile / Tablet Burger */}
        <div className="md:hidden relative">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>☰</button>
          {isNavOpen && (
            <ul className="absolute right-0 mt-2 bg-(--dark-grey) p-4 rounded shadow-lg flex flex-col gap-2">
              <li>
                <Link href="/recommended" onClick={() => setIsNavOpen(false)}>
                  Recommended
                </Link>
              </li>
              <li>
                <Link href="/library" onClick={() => setIsNavOpen(false)}>
                  My Library
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* UserBar */}
      <div className="flex items-center gap-4">
        {user && <span className="text-(--grey1)">Hello, {user.name}</span>}
        <button
          className="main-button py-2 px-4"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </header>
  );
}
