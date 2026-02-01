import { cn } from '@/lib/utils';

/**
 * Константи для кнопок
 * Використовуйте їх для уніфікації стилів кнопок
 */

// Базовий стан для disabled кнопок (повторюється скрізь)
export const BUTTON_DISABLED = cn('opacity-50 cursor-not-allowed');

// Основні кнопки (використовують глобальні класи з globals.css)
export const BUTTON_PRIMARY = cn('main-button');

export const BUTTON_SECONDARY = cn('main-button logout-button');

// Кнопки з padding варіантами
export const BUTTON_PRIMARY_SM = cn(BUTTON_PRIMARY, 'py-2 px-4');

export const BUTTON_PRIMARY_MD = cn(BUTTON_PRIMARY, 'py-4 w-full');

// Кнопка з disabled станом
export const getButtonClasses = (
  isPending: boolean,
  variant: 'primary' | 'secondary' = 'primary'
) => {
  const baseClass = variant === 'primary' ? BUTTON_PRIMARY : BUTTON_SECONDARY;
  return cn(baseClass, isPending && BUTTON_DISABLED);
};
