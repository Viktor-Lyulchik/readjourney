import { fetchRecommendedServer } from '@/lib/api/serverApi.server';
import BooksList from './BooksList';
import Pagination from './Pagination';
import RecommendedBookModal from '@/components/Modals/RecommendedBookModal';
import BooksListSkeleton from './BooksListSkeleton';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { RecommendedBooksProvider } from './RecommendedBooksContext';

type Props = {
  searchParams?: {
    page?: string;
    limit?: string;
    author?: string;
    title?: string;
  };
};

/**
 * Server component for displaying recommended books with pagination.
 *
 * Changes:
 * - Added RecommendedBooksProvider to pass the array of books to the modal
 * - Book data is now taken from the context instead of backend requests
 */
export default async function RecommendedBooks({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const author = searchParams?.author || '';
  const title = searchParams?.title || '';

  let data;
  try {
    data = await fetchRecommendedServer({ page, limit, author, title });
  } catch (error) {
    console.error('Fetching recommended books failed:', error);
    return <p>Failed to load recommended books.</p>;
  }

  return (
    <RecommendedBooksProvider books={data.results}>
      <div
        className={cn(
          'flex flex-col',
          'bg-(--dark-grey)',
          'rounded-2xl',
          'p-10 px-5 md:px-10 xxl:px-10'
        )}
      >
        <div
          className={cn(
            'flex flex-row justify-between items-start',
            'mb-5.5 md:mb-5'
          )}
        >
          <h1
            className={cn(
              'text-[18px] md:text-[28px] font-bold leading-8 tracking-[0.02em]'
            )}
          >
            Recommended
          </h1>
          <Pagination page={data.page} totalPages={data.totalPages} />
        </div>
        <Suspense fallback={<BooksListSkeleton />}>
          <BooksList books={data.results} />
        </Suspense>

        {/* 
          RecommendedBookModal now receives data from the context
          It does not make a backend request but uses data from the books array
        */}
        <RecommendedBookModal />
      </div>
    </RecommendedBooksProvider>
  );
}
