'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookCompletedModal({ isOpen, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as Node;
      const backdrop = backdropRef.current;
      const modal = modalRef.current;

      if (backdrop && target === backdrop) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (modal && modal.contains(target)) {
        const { scrollTop, scrollHeight, clientHeight } = modal;

        if (e instanceof WheelEvent) {
          const isScrollingDown = e.deltaY > 0;
          const isScrollingUp = e.deltaY < 0;

          if (
            (isScrollingDown && scrollTop + clientHeight >= scrollHeight) ||
            (isScrollingUp && scrollTop <= 0)
          ) {
            if (e.cancelable) e.preventDefault();
          }
        }
      }
    };

    const backdrop = backdropRef.current;
    if (backdrop) {
      backdrop.addEventListener('wheel', preventScroll, { passive: false });
      backdrop.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      if (backdrop) {
        backdrop.removeEventListener('wheel', preventScroll);
        backdrop.removeEventListener('touchmove', preventScroll);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn(
          CARD_CONTAINER,
          'relative w-full max-w-83.75 md:max-w-85.5 mx-4',
          'p-10 max-md:py-15 md:p-12.5',
          'flex flex-col items-center text-center border border-white/10'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div
          className={cn(
            'relative w-12.5 h-12.5 md:w-17.5 md:h-17.5 mb-5 md:mb-8 flex items-center justify-center',
            'mb-5 md:mb-8'
          )}
        >
          <div className="absolute inset-0" />

          <picture className="relative z-10 block w-12.5 h-12.5 md:w-17.5 md:h-17.5">
            <source
              srcSet="/img/books@1x.webp 1x, /img/books@2x.webp 2x"
              media="(min-width: 320px)"
            />

            <img
              src="/img/books@1x.webp"
              alt="Books"
              className="w-full h-full object-contain"
            />
          </picture>
        </div>

        <h2
          className={cn(
            HEADING_MD,
            'mb-2.5 md:mb-3.5',
            'font-bold text-lg md:text-xl leading-none tracking-[-0.02em]'
          )}
        >
          The book is read
        </h2>

        <div
          className={cn(
            'font-medium text-sm leading-[1.28571] tracking-[-0.04em] md:tracking-[-0.06em] text-(--grey1)',
            'max-w-70 md:max-w-80.5'
          )}
        >
          <p>
            It was an <span className="text-foreground">exciting journey</span>,
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>
        </div>
      </div>
    </div>
  );
}
