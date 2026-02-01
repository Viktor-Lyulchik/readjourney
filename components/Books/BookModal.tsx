'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useBookDetails } from '@/lib/api/queries/books.queries';
import { useAddBookToLibrary } from '@/lib/api/mutations/library.mutations';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function BookModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId');

  // ✅ Використовуємо query hook
  const { data: book, isLoading, error } = useBookDetails(bookId);

  // ✅ Використовуємо mutation hook
  const { mutate: addBook, isPending } = useAddBookToLibrary();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('bookId');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleAddToLibrary = () => {
    if (!bookId) return;

    // Викликаємо мутацію
    addBook(bookId, {
      onSuccess: () => {
        // Після успішного додавання закриваємо модалку
        handleClose();
      },
    });
  };

  if (!bookId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className={cn(
          'bg-(--dark-grey) rounded-2xl p-10',
          'max-w-2xl w-full mx-4'
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-(--grey1)">Loading book details...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center py-10">
            <p className="text-destructive mb-4">Failed to load book details</p>
            <button onClick={handleClose} className="main-button">
              Close
            </button>
          </div>
        )}

        {/* Success state */}
        {book && (
          <>
            <div className="flex gap-6 mb-6">
              <div className="relative w-40 h-60 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-(--grey1) mb-4">{book.author}</p>
                <p className="text-sm mb-2">
                  Total pages:{' '}
                  <span className="font-bold">{book.totalPages}</span>
                </p>
                <p className="text-sm">
                  Status: <span className="font-bold">{book.status}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToLibrary}
                disabled={isPending}
                className={cn(
                  'main-button flex-1',
                  isPending && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isPending ? 'Adding...' : 'Add to Library'}
              </button>
              <button
                onClick={handleClose}
                className="main-button logout-button flex-1"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
