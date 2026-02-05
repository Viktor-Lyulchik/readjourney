import { cn } from '@/lib/utils';

/**
 * Constants for buttons styles
 * Use them for unifying button styles across the application
 */

// Base state for disabled buttons (repeated everywhere)
export const BUTTON_DISABLED = cn('opacity-50 cursor-not-allowed');

// Primary buttons (use global classes from globals.css)
export const BUTTON_PRIMARY = cn('main-button');

export const BUTTON_SECONDARY = cn('main-button logout-button');

// Buttons with padding variants
export const BUTTON_PRIMARY_SM = cn(BUTTON_PRIMARY, 'py-2 px-4');

export const BUTTON_PRIMARY_MD = cn(BUTTON_PRIMARY, 'py-4 w-full');

// Button with disabled state handling
export const getButtonClasses = (
  isPending: boolean,
  variant: 'primary' | 'secondary' = 'primary'
) => {
  const baseClass = variant === 'primary' ? BUTTON_PRIMARY : BUTTON_SECONDARY;
  return cn(baseClass, isPending && BUTTON_DISABLED);
};
