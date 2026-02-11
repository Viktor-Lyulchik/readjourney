'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAddBookToLibrary } from '@/lib/api/mutations/library.mutations';
import BookModal from '@/components/Modals/BookModal';
import { useRecommendedBooks } from '@/components/Books/RecommendedBooksContext';

/**
 * Client component for displaying a modal window with book details
 * Used in RecommendedBooks for adding a book to the library
 *
 * - Book data is obtained from the RecommendedBooksContext context
 * - The backend endpoint works only with library book IDs, so we use local data
 *
 * Works through the URL query parameter bookId:
 * - When bookId is present in the URL, the modal opens
 * - When bookId is removed from the URL, the modal closes
 */
export default function RecommendedBookModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get('bookId');

  // Get access to the array of books through the context
  const { getBookById } = useRecommendedBooks();

  // Get book data from the array instead of requesting from the backend
  const book = bookId ? getBookById(bookId) : undefined;

  // Mutation for adding a book to the library
  const { mutate: addBook, isPending } = useAddBookToLibrary();

  // Close the modal - remove bookId from the URL
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('bookId');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Adding a book to the library
  const handleAddToLibrary = () => {
    if (!bookId || !book) return;

    addBook(
      {
        bookId: bookId,
        title: book.title,
        author: book.author,
      },
      {
        onSuccess: () => {
          // After successful addition, close the modal
          handleClose();
        },
      }
    );
  };

  // If there is no bookId in the URL - do not show the modal
  if (!bookId) return null;

  // If the book is not found in the array - show an error
  if (!book) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-(--dark-grey) rounded-xl p-10">
          <p className="text-destructive mb-4">Book not found</p>
          <button onClick={handleClose} className="main-button">
            Close
          </button>
        </div>
      </div>
    );
  }

  // Success state - show the universal modal with data from the array
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
