'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';
import { useBookDetails } from '@/lib/api/queries/books.queries';
import { CARD_CONTAINER } from '@/lib/styles/containers.styles';
import { HEADING_MD } from '@/lib/styles/typography.styles';

/**
 * Універсальний компонент модального вікна для відображення деталей книги
 *
 * Підтримує два режими використання:
 * 1. MyLibrary - показує кнопку "Start reading" для переходу до читання
 * 2. RecommendedBooks - показує кнопку "Add to library" для додавання книги
 *
 * @example
 * // Використання в MyLibrary
 * <BookModal
 *   book={selectedBook}
 *   isOpen={!!selectedBook}
 *   onClose={() => setSelectedBook(null)}
 *   actionType="start-reading"
 *   onAction={() => router.push(`/reading/${selectedBook._id}`)}
 * />
 *
 * @example
 * // Використання в RecommendedBooks
 * <BookModal
 *   book={book}
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   actionType="add-to-library"
 *   onAction={handleAddToLibrary}
 *   actionPending={isPending}
 * />
 */

type ActionType = 'start-reading' | 'add-to-library';

type Props = {
  /** Об'єкт книги для відображення */
  book: BookDetailsResponse;
  /** Чи відкрита модалка */
  isOpen: boolean;
  /** Callback для закриття модалки */
  onClose: () => void;
  /** Тип дії кнопки: "start-reading" або "add-to-library" */
  actionType: ActionType;
  /** Callback для основної дії (читання або додавання) */
  onAction: () => void;
  /** Стан очікування для кнопки дії (опціонально) */
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
  // Завантажуємо повні деталі книги з сервера
  // Використовуємо book._id для запиту, якщо модалка відкрита
  const { data: fullBook } = useBookDetails(isOpen ? book._id : null);

  // Використовуємо повні дані якщо вони завантажені, інакше базові з props
  const displayBook = fullBook || book;

  // Обробка клавіші ESC для закриття модалки
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Не рендеримо, якщо модалка закрита
  if (!isOpen) return null;

  // Визначаємо текст кнопки в залежності від типу дії
  const buttonText = (() => {
    if (actionType === 'start-reading') {
      return 'Start reading';
    }
    if (actionType === 'add-to-library') {
      return actionPending ? 'Adding...' : 'Add to library';
    }
    return '';
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={cn(
          CARD_CONTAINER,
          'max-[375px]:w-full md:w-[calc(100%-32px)] max-w-83.75 md:max-w-125',
          'bg-(--dark-grey) rounded-xl border border-(--grey4)',
          'p-10 md:p-12 xxl:p-12.5',
          'relative'
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex flex-col justify-center items-center text-center">
          {/* Обкладинка книги */}
          <div
            className={cn(
              'relative rounded-lg overflow-hidden shrink-0',
              'w-35 h-53.25 md:w-38.25 md:h-58.25',
              'mb-4'
            )}
          >
            {displayBook.imageUrl ? (
              <Image
                src={displayBook.imageUrl}
                alt={displayBook.title}
                fill
                className="object-cover"
              />
            ) : (
              // Fallback для книг без обкладинки
              <div className="w-full h-full bg-(--grey3) flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            )}
          </div>

          {/* Інформаційний блок */}
          <div
            className={cn(
              'flex flex-col items-center w-full',
              'mb-5 md:mb-8 xxl:mb-8'
            )}
          >
            {/* Назва книги */}
            <h2
              className={cn(
                HEADING_MD,
                'text-foreground font-bold text-lg md:text-xl leading-none tracking-[-0.02em]',
                'mb-2 xxl:mb-2'
              )}
            >
              {displayBook.title}
            </h2>

            {/* Автор */}
            <p
              className={cn(
                'text-xs md:text-sm/4.5 font-medium tracking-[-0.02em] text-(--grey1)',
                'mb-1 xxl:mb-1'
              )}
            >
              {displayBook.author}
            </p>

            {/* Кількість сторінок */}
            <p
              className={cn(
                'text-foreground',
                'text-[10px]/[12px] font-medium tracking-[-0.02em]'
              )}
            >
              {displayBook.totalPages} pages
            </p>
          </div>

          {/* Кнопка дії (Start reading / Add to library) */}
          <button
            onClick={onAction}
            disabled={actionPending}
            className={cn(
              'max-w-70',
              'py-3 md:py-3.5 xxl:py-4',
              'px-6 md:px-7',
              'rounded-full border border-(--grey1)',
              'text-foreground font-bold text-sm md:text-base leading-[1.28571] md:leading-tight',
              'hover:bg-foreground hover:text-background transition-all duration-300',
              // Стилі для disabled стану
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
