'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useBookDetails } from '@/lib/api/queries/books.queries';
import { useAddBookToLibrary } from '@/lib/api/mutations/library.mutations';
import BookModal from '@/components/Modals/BookModal';

/**
 * Клієнтський компонент для відображення модального вікна з деталями книги
 * Використовується в RecommendedBooks для додавання книги до бібліотеки
 *
 * Працює через URL query параметр bookId:
 * - При наявності bookId в URL - модалка відкривається
 * - При видаленні bookId з URL - модалка закривається
 */
export default function RecommendedBookModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId');

  // Завантажуємо деталі книги
  const { data: book, isLoading, error } = useBookDetails(bookId);

  // Mutation для додавання книги до бібліотеки
  const { mutate: addBook, isPending } = useAddBookToLibrary();

  // Закриття модалки - видаляємо bookId з URL
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('bookId');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Додавання книги до бібліотеки
  const handleAddToLibrary = () => {
    if (!bookId) return;

    addBook(bookId, {
      onSuccess: () => {
        // Після успішного додавання закриваємо модалку
        handleClose();
      },
    });
  };

  // Якщо немає bookId в URL - не показуємо модалку
  if (!bookId) return null;

  // Loading state - показуємо простий індикатор
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-(--dark-grey) rounded-xl p-10">
          <p className="text-(--grey1)">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error state - показуємо помилку
  if (error || !book) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-(--dark-grey) rounded-xl p-10">
          <p className="text-destructive mb-4">Failed to load book details</p>
          <button onClick={handleClose} className="main-button">
            Close
          </button>
        </div>
      </div>
    );
  }

  // Success state - показуємо універсальну модалку
  return (
    <BookModal
      book={book}
      isOpen={true}
      onClose={handleClose}
      actionType="add-to-library"
      onAction={handleAddToLibrary}
      actionPending={isPending}
    />
  );
}
