'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
};

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  description,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={cn(
          CARD_CONTAINER,
          'relative w-full max-w-85.5 mx-4',
          'p-10 md:p-12.5',
          'flex flex-col items-center text-center border border-white/10'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <X size={24} strokeWidth={2} />{' '}
        </button>

        <div
          className={cn(
            'relative w-25 h-25 md:w-32.5 md:h-32.5 mb-5 flex items-center justify-center',
            'mb-5 md:mb-8'
          )}
        >
          <div className="absolute inset-0" />

          <picture className="relative z-10 block w-12.5 h-12.5 md:w-17.5 md:h-17.5">
            <source
              srcSet="/img/ok_hand@1x.webp 1x, /img/ok_hand@2x.webp 2x"
              media="(min-width: 320px)"
            />

            <img
              src="/img/ok_hand@1x.webp"
              alt="Good job"
              className="w-full h-full object-contain"
            />
          </picture>
        </div>

        <h2 className={cn(HEADING_MD, 'mb-3 text-[18px] md:text-[20px]')}>
          {title}
        </h2>

        {description && (
          <div
            className={cn(
              'font-medium text-[14px] leading-[1.28571] tracking-[-0.02em] text-(--grey1)',
              'max-w-65 md:max-w-74'
            )}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
