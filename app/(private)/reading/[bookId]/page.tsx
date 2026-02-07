'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import Dashboard from '@/components/Dashboard/Dashboard';
import ReadingDashboard from '@/components/Dashboard/ReadingDashboard';
import MyBook from '@/components/MyBook/MyBook';
import BookCompletedModal from '@/components/Modals/BookCompletedModal';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useBookDetails } from '@/lib/api/queries/library.queries';
import { cn } from '@/lib/utils';

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params?.bookId as string;

  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const { data: book, isLoading, error } = useBookDetails(bookId);

  const handleBookCompleted = useCallback(() => {
    setShowCompletedModal(true);
  }, []);

  const closeCompletedModal = useCallback(() => {
    setShowCompletedModal(false);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }

  if (error || !book) {
    return (
      <MainLayout>
        <div
          className={cn(
            'flex flex-col items-center justify-center min-h-[50vh]',
            'text-center px-4'
          )}
        >
          <h2 className="text-xl font-bold text-foreground mb-3">
            Book not found
          </h2>
          <p className="text-(--grey1) mb-5">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/library')}
            className="main-button logout-button py-2 px-4"
          >
            Go to Library
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className={cn()}>
        <div
          className={cn(
            'flex max-[1439px]:flex-wrap xxl:flex-nowrap',
            'gap-2.5 md:gap-4 xxl:gap-4',
            'container',
            'p-0!'
          )}
        >
          {/* Left dashboard */}
          <Dashboard>
            <ReadingDashboard
              book={book}
              onBookCompleted={handleBookCompleted}
            />
          </Dashboard>

          {/* Right content */}
          <div className={cn('flex-1')}>
            <MyBook book={book} />
          </div>
        </div>
      </section>

      {/* Book completed modal */}
      <BookCompletedModal
        isOpen={showCompletedModal}
        onClose={closeCompletedModal}
      />
    </MainLayout>
  );
}
