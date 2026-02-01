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
 * Компонент навігаційного посилання
 * Використовується в Header для Desktop та Mobile навігації
 * Уникає дублювання стилів між desktop та mobile версіями
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
        // Базові стилі залежно від платформи
        isMobile ? NAV_LINK_MOBILE : NAV_LINK_DESKTOP,
        // Стан активності
        isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE
      )}
    >
      {label}
    </Link>
  );
}
