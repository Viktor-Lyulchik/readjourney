'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NAV_LINK_DESKTOP,
  NAV_LINK_MOBILE,
  NAV_LINK_ACTIVE,
  NAV_LINK_INACTIVE,
} from '@/lib/styles/typography.styles';

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
};

/**
 * Component for navigation links in the header.
 * Used in Header for both Desktop and Mobile navigation
 * Avoids duplication of styles between desktop and mobile versions
 */
export default function NavLink({
  href,
  label,
  isActive,
  isMobile = false,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        // Base styles depending on platform
        isMobile ? NAV_LINK_MOBILE : NAV_LINK_DESKTOP,
        // Active state styles
        isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE
      )}
    >
      {label}
    </Link>
  );
}
