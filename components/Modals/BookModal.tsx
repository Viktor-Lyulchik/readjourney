'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookDetailsResponse, RecommendedBook } from '@/types/book';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

type ActionType = 'start-reading' | 'add-to-library';

type Props = {
  book: BookDetailsResponse | RecommendedBook;
  isOpen: boolean;
  onClose: () => void;
  actionType: ActionType;
  onAction: () => void;
  actionPending?: boolean;
};

export default function BookModal({
  book,
  isOpen,
  onClose,
  actionType,
  onAction,
  actionPending = false,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

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

  const buttonText = (() => {
    if (actionType === 'start-reading') return 'Start reading';
    if (actionType === 'add-to-library')
      return actionPending ? 'Adding...' : 'Add to library';
    return '';
  })();

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
          'max-[375px]:w-full md:w-[calc(100%-32px)] max-w-83.75 md:max-w-125',
          'bg-(--dark-grey) rounded-xl border border-(--grey4)',
          'p-10 md:p-12 xxl:p-12.5',
          'relative overflow-y-auto max-h-[90vh]'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex flex-col justify-center items-center text-center">
          <div
            className={cn(
              'relative rounded-lg overflow-hidden shrink-0',
              'w-35 h-53.25 md:w-38.25 md:h-58.25',
              'mb-4'
            )}
          >
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-(--grey3) flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center w-full mb-5 md:mb-8">
            <h2
              className={cn(
                HEADING_MD,
                'text-foreground font-bold text-lg md:text-xl mb-2'
              )}
            >
              {book.title}
            </h2>
            <p className="text-xs md:text-sm font-medium text-(--grey1) mb-1">
              {book.author}
            </p>
            <p className="text-foreground text-[10px] font-medium">
              {book.totalPages} pages
            </p>
          </div>

          <button
            onClick={onAction}
            disabled={actionPending}
            className={cn(
              'max-w-70 py-3 md:py-3.5 px-6 rounded-full border border-(--grey1)',
              'text-foreground font-bold text-sm md:text-base hover:bg-foreground hover:text-background transition-all duration-300',
              actionPending && 'opacity-50 cursor-not-allowed'
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
