import { cn } from '@/lib/utils';

/**
 * Константи для повторюваних стилів типографіки
 * Використовуйте їх замість дублювання однакових комбінацій
 */

// Базові налаштування (tracking використовується СКРІЗЬ)
const BASE_TRACKING = 'tracking-[-0.02em]';

// Заголовки
export const HEADING_LG = cn('text-[28px] font-bold leading-8', BASE_TRACKING);

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

// Підзаголовки та описи
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

// Текст для навігації/посилань
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

// Стани для навігаційних лінків
export const NAV_LINK_ACTIVE = cn('text-foreground border-b-2 border-(--blue)');

export const NAV_LINK_INACTIVE = cn('text-(--grey1)');

// Допоміжний текст (маленький сірий текст)
export const TEXT_HELPER = cn('text-xs text-(--grey1)');

export const TEXT_HELPER_XS = cn('text-[10px] text-(--grey1)');
export const TEXT_HELPER_XSS = cn('font-medium text-[10px] text-(--grey1)');

export const TEXT_ERROR = cn('text-destructive text-[12px] md:text-[14px]');

// Body текст
export const TEXT_BODY = cn('text-sm font-medium', BASE_TRACKING);

export const TEXT_BODY_GREY = cn(TEXT_BODY, 'text-(--grey1)');
