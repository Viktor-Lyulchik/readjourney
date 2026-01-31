'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import BookDetails from './BookDetails';

export default function BookModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId');

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('bookId');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (bookId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [bookId]);

  if (!bookId) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4',
        'animate-in fade-in duration-200'
      )}
      onClick={closeModal}
    >
      <div
        className={cn(
          'bg-white rounded-lg p-6 relative max-w-lg w-full max-h-[90vh] overflow-y-auto',
          'animate-in zoom-in-95 duration-200'
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className={cn(
            'absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700',
            'w-8 h-8 flex items-center justify-center rounded-full',
            'hover:bg-gray-100 transition-colors'
          )}
          onClick={closeModal}
          aria-label="Close modal"
        >
          ✕
        </button>

        <BookDetails bookId={bookId} onClose={closeModal} />
      </div>
    </div>
  );
}
