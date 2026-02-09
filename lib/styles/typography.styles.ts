import { cn } from '@/lib/utils';

/**
 * Constants for reusable typography styles
 * Use them instead of duplicating the same combinations of classes in different components.
 * This way, if you need to change a style, you can do it in one place.
 * Also, it improves readability and maintainability of the code.
 */

// Base settings (tracking is used EVERYWHERE)
const BASE_TRACKING = 'tracking-[-0.02em]';

// Headings
export const HEADING_LG = cn(
  'text-[18px] md:text-[28px] font-bold leading-8',
  BASE_TRACKING
);

export const HEADING_MD = cn(
  'text-lg md:text-xl xxl:text-xl',
  'font-bold leading-none',
  BASE_TRACKING
);

export const HEADING_SM = cn('text-sm font-bold leading-4.5', BASE_TRACKING);

export const HEADING_XS = cn(
  'text-[10px] font-bold leading-[1.2]',
  BASE_TRACKING
);

// Subheadings and descriptions
export const SUBTITLE = cn(
  'text-sm font-medium leading-[1.28571]',
  BASE_TRACKING
);

export const SUBTITLE_XS = cn(
  'max-md:text-xs md:text-sm',
  'font-medium',
  'max-md:leading-[1.33] md:leading-[1.28571]',
  BASE_TRACKING
);

export const SUBTITLE_GREY = cn(SUBTITLE, 'text-(--grey1)');

// Text for navigation/links
export const NAV_LINK_BASE = cn(
  'font-medium',
  BASE_TRACKING,
  'hover:text-foreground'
);

export const NAV_LINK_DESKTOP = cn(
  NAV_LINK_BASE,
  'text-[16px] leading-[112.5%] pb-2'
);

export const NAV_LINK_MOBILE = cn(NAV_LINK_BASE, 'text-[14px]');

// States for navigation links
export const NAV_LINK_ACTIVE = cn('text-foreground border-b-2 border-(--blue)');

export const NAV_LINK_INACTIVE = cn('text-(--grey1)');

// Helper text (small grey text used for hints, errors, etc.)
export const TEXT_HELPER = cn('text-xs text-(--grey1)');

export const TEXT_HELPER_XS = cn('text-[10px] text-(--grey1)');
export const TEXT_HELPER_XSS = cn('font-medium text-[10px] text-(--grey1)');

export const TEXT_ERROR = cn('text-destructive text-[12px] md:text-[14px]');

// Body text
export const TEXT_BODY = cn('text-sm font-medium', BASE_TRACKING);

export const TEXT_BODY_GREY = cn(TEXT_BODY, 'text-(--grey1)');
