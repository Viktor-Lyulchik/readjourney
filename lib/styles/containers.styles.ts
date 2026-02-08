import { cn } from '@/lib/utils';

/**
 * Constants for reusable container styles
 * Use them instead of duplicating cn() calls
 */

// Base dark container (used everywhere)
export const CARD_CONTAINER = cn('bg-(--dark-grey)', 'rounded-2xl');

// Padding variants for containers
export const CARD_PADDING = cn('max-md:p-5 max-[1439px]:p-8 xxl:p-5');

export const CARD_PADDING_LG = cn('px-5 md:px-10 xxl:px-10', 'py-10');

// Full card container (dark background + padding)
export const CARD = cn(CARD_CONTAINER, CARD_PADDING);

export const CARD_LG = cn(CARD_CONTAINER, CARD_PADDING_LG);

// Flex containers (commonly used combinations)
export const FLEX_COL = cn('flex flex-col');
export const FLEX_ROW = cn('flex flex-row');
export const FLEX_CENTER = cn('flex justify-center items-center');
export const FLEX_BETWEEN = cn('flex justify-between items-center');

// Spacing (repeated gap values)
export const GAP_SM = cn('gap-2.5 md:gap-4 xxl:gap-4');
export const GAP_MD = cn('gap-5');
export const GAP_LG = cn('gap-8 xxl:gap-10');
