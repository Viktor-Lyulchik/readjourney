'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import {
  CARD_CONTAINER,
  FLEX_BETWEEN,
  GAP_LG,
} from '@/lib/styles/containers.styles';
import { BUTTON_SECONDARY } from '@/lib/styles/buttons.styles';

// Константи для Header
const HEADER_HEIGHT = cn(
  'h-18.5 md:h-26.5 xxl:26.5',
  'bg-background',
  'pt-4 md:pt-8 xxl:pt-8',
  'mb-2.5 md:mb-4 xxl:mb-4'
);

const HEADER_CONTAINER = cn(
  CARD_CONTAINER,
  'container px-5! py-2.5! md:p-4! xxl:p-4!',
  FLEX_BETWEEN
);

const USER_AVATAR = cn(
  'w-10 h-10 rounded-full bg-(--grey3) border border-(--grey1)',
  'flex justify-center items-center',
  'font-bold text-[16px]',
  'leading-[125%] tracking-[-0.02em]'
);

const USER_NAME = cn(
  'font-bold text-[16px]',
  'leading-[125%] tracking-[-0.02em]',
  'hidden xxl:block'
);

const DRAWER = cn(
  'relative ml-auto w-1/2 h-full',
  'bg-(--dark-grey)',
  'flex flex-col justify-center items-end',
  'pt-70 px-14 pb-10',
  'transform transition-transform duration-300 ease-in-out'
);

const CLOSE_BUTTON = cn(
  'absolute top-10.25 right-11.75',
  'w-7 h-7',
  'flex items-center justify-center'
);

// Навігаційні лінки (data для рендерингу)
const NAV_LINKS = [
  { href: '/recommended', label: 'Home' },
  { href: '/library', label: 'My Library' },
];

export default function Header() {
  const { user, logout, isLoading } = useAuthStore();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const isActiveRoute = (route: string) => {
    return pathname === route || pathname?.startsWith(`${route}/`);
  };

  return (
    <header className={HEADER_HEIGHT}>
      <div className={HEADER_CONTAINER}>
        {/* Logo */}
        <div>
          <Link href="/">
            <svg className="block xxl:hidden" width="42" height="17">
              <use
                href="/icons.svg#icon-logo_mob"
                fill="#F9F9F9"
                stroke="#141414"
              />
            </svg>
          </Link>
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

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className={cn('hidden md:flex', GAP_LG)}>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  isActive={isActiveRoute(link.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* UserBar */}
        <div className="flex items-center gap-2.5 md:gap-4">
          <div className="flex items-center gap-2">
            <div className={USER_AVATAR}>{user?.name.slice(0, 1)}</div>
            {user && <span className={USER_NAME}>{user.name}</span>}
          </div>

          {/* Desktop Logout */}
          <button
            className={cn(BUTTON_SECONDARY, 'py-2 px-4 hidden md:block')}
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Log out'}
          </button>

          {/* Mobile Menu Button */}
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
              <div className="absolute inset-0 bg-black/50" />

              <div
                className={DRAWER}
                onClick={e => e.stopPropagation()}
                ref={menuRef}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsNavOpen(false)}
                  className={CLOSE_BUTTON}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>

                <div className="flex flex-col h-full gap-16 items-start mx-auto">
                  {/* Mobile Navigation */}
                  <nav className="w-full flex justify-start">
                    <ul className="flex flex-col gap-5">
                      {NAV_LINKS.map(link => (
                        <li key={link.href}>
                          <NavLink
                            href={link.href}
                            label={link.label}
                            isActive={isActiveRoute(link.href)}
                            isMobile
                            onClick={() => setIsNavOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Logout */}
                  <button
                    onClick={async () => {
                      setIsNavOpen(false);
                      await handleLogout();
                    }}
                    disabled={isLoading}
                    className={cn(BUTTON_SECONDARY, 'mt-auto')}
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
