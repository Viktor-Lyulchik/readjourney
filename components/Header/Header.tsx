'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout, isLoading } = useAuthStore();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <header
      className={cn(
        'h-18.5 md:h-26.5 xxl:26.5',
        'bg-background',
        'pt-4 md:pt-8 xxl:pt-8',
        'mb-2.5 md:mb-4 xxl:mb-4'
      )}
    >
      <div
        className={cn(
          'bg-(--dark-grey)',
          'rounded-2xl',
          'container px-5! py-2.5! md:p-4! xxl:p-4!',
          'flex justify-between items-center'
        )}
      >
        <div>
          {/* Mobile logo */}
          <Link href="/">
            <svg className="block xxl:hidden" width="42" height="17">
              <use
                href="/icons.svg#icon-logo_mob"
                fill="#F9F9F9"
                stroke="#141414"
              />
            </svg>
          </Link>

          {/* Tablet+ logo */}
          <Link href="/">
            <svg className="hidden xxl:block" width="182" height="17">
              <use
                href="/icons.svg#icon-logo"
                fill="#F9F9F9"
                stroke="#141414"
              />
            </svg>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          {/* Desktop */}
          <ul className="hidden md:flex gap-8 xxl:gap-10">
            <li>
              <Link
                href="/recommended"
                className={cn(
                  'hover:text-foreground',
                  'font-medium text-[16px] leading-[112.5%] tracking-[-0.02em] pb-2',
                  location.pathname === '/recommended'
                    ? 'text-foreground border-b-2 border-(--blue)'
                    : 'text-(--grey1)'
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
                  'font-medium text-[16px] leading-[112.5%] tracking-[-0.02em] pb-2',
                  location.pathname === '/library'
                    ? 'text-foreground border-b-2 border-(--blue)'
                    : 'text-(--grey1)'
                )}
              >
                My Library
              </Link>
            </li>
          </ul>
        </nav>

        {/* UserBar */}
        <div className="flex items-center gap-2.5 md:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-10 h-10 rounded-full bg-(--grey3) border border-(--grey1)',
                'flex justify-center items-center',
                'font-bold text-[16px]',
                'leading-[125%] tracking-[-0.02em]'
              )}
            >
              {user?.name.slice(0, 1)}
            </div>
            {user && (
              <span
                className={cn(
                  'font-bold text-[16px]',
                  'leading-[125%] tracking-[-0.02em]',
                  'hidden xxl:block'
                )}
              >
                {user.name}
              </span>
            )}
          </div>
          <button
            className="main-button logout-button py-2 px-4 hidden md:block"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Log out'}
          </button>

          <button
            className="md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg className="block" width="28" height="28">
              <use
                href="/icons.svg#icon-burger"
                fill="#141414"
                stroke="#F9F9F9"
              />
            </svg>
          </button>

          {/* Mobile Drawer */}
          {isNavOpen && (
            <div
              className="md:hidden fixed inset-0 z-40 flex"
              onClick={() => setIsNavOpen(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Drawer */}
              <div
                ref={menuRef}
                className={cn(
                  'relative ml-auto w-1/2 h-full',
                  'bg-(--dark-grey)',
                  'flex flex-col justify-center items-end', // ⬅️ центруємо по горизонталі
                  'pt-70',
                  'px-14',
                  'pb-10',
                  'transform transition-transform duration-300 ease-in-out'
                )}
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsNavOpen(false)}
                  className={cn(
                    'absolute',
                    'top-10.25 right-11.75',
                    'w-7 h-7',
                    'flex items-center justify-center'
                  )}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>

                <div className="flex flex-col h-full gap-16 items-start mx-auto">
                  {/* Navigation */}
                  <nav className="w-full flex justify-start">
                    <ul className="flex flex-col gap-5">
                      <li>
                        <Link
                          href="/recommended"
                          onClick={() => setIsNavOpen(false)}
                          className={cn(
                            'text-foreground font-medium text-[14px]',
                            location.pathname === '/recommended'
                              ? 'text-foreground border-b-2 border-(--blue)'
                              : 'text-(--grey1)'
                          )}
                        >
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/library"
                          onClick={() => setIsNavOpen(false)}
                          className={cn(
                            'text-foreground font-medium text-[14px]',
                            location.pathname === '/library'
                              ? 'text-foreground border-b-2 border-(--blue)'
                              : 'text-(--grey1)'
                          )}
                        >
                          My Library
                        </Link>
                      </li>
                    </ul>
                  </nav>

                  {/* Logout */}
                  <button
                    onClick={async () => {
                      setIsNavOpen(false);
                      await handleLogout();
                    }}
                    disabled={isLoading}
                    className="main-button logout-button mt-auto"
                  >
                    {isLoading ? 'Logging out...' : 'Log out'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
