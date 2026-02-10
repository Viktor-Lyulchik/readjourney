'use client';

import { useState, useCallback } from 'react';
import { useAddBookAsObjectToLibraryOptimistic } from '@/lib/api/mutations/library.mutations';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ObjectSchema } from 'yup';
import RecommendedSection from './RecommendedSection';
import SuccessModal from '@/components/Modals/SuccessModal';

type AddBookFormValues = {
  title: string;
  author: string;
  totalPages: string;
};

const addBookSchema: ObjectSchema<AddBookFormValues> = yup.object({
  title: yup.string().default('').trim().min(1, 'Book title is required'),
  author: yup.string().default('').trim().min(1, 'Author is required'),
  totalPages: yup
    .string()
    .default('')
    .trim()
    .matches(/^\d+$/, 'Must be a valid number')
    .min(1, 'Number of pages is required'),
});

export default function LibraryDashboard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddBookFormValues>({
    resolver: yupResolver(addBookSchema),
    defaultValues: { title: '', author: '', totalPages: '' },
  });

  const { mutateAsync: addBook, isPending } =
    useAddBookAsObjectToLibraryOptimistic();

  // --- SuccessModal state ---
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
  });

  const closeSuccessModal = useCallback(() => {
    setSuccessModal({ isOpen: false, title: '' });
  }, []);

  // --- submit ---
  const onSubmit = async (data: AddBookFormValues) => {
    try {
      const parsedPages = parseInt(data.totalPages, 10);

      await addBook({
        title: data.title.trim(),
        author: data.author.trim(),
        totalPages: Number.isNaN(parsedPages) ? 0 : parsedPages,
      });

      // Save the book title for the modal, then reset
      const bookTitle = data.title.trim();
      reset();

      // Show SuccessModal
      setSuccessModal({ isOpen: true, title: bookTitle });
    } catch {
      // toast is handled inside the mutation
    }
  };

  // --- shared input styles ---
  const inputBase = cn(
    'input',
    'bg-(--grey3) text-foreground focus:outline-none'
  );
  const labelBase = cn(
    'absolute left-2 top-1/2 -translate-y-1/2',
    'text-(--grey1) text-[12px] pointer-events-none'
  );
  const errorBase = 'text-destructive text-[12px] md:text-[14px] mt-1';

  return (
    <div className={cn('flex flex-col gap-5', 'pt-5')}>
      <div className={cn('flex flex-row flex-wrap xxl:flex-col gap-5')}>
        {/* ─── AddBook form ─── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            'flex flex-col gap-2',
            'max-md:w-full max-[1439px]:w-[calc((100%-20px)/2)] xxl:w-full',
            'xxl:mb-19.5'
          )}
        >
          <p className="pl-2 text-sm font-medium">Create your library:</p>

          {/* Book title */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Book title"
                disabled={isSubmitting || isPending}
                className={cn(
                  inputBase,
                  'pl-16.5!',
                  errors.title && 'border border-destructive'
                )}
                {...register('title')}
              />
              <span className={labelBase}>Book title</span>
            </div>
            {errors.title && (
              <p className={errorBase}>{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Author"
                disabled={isSubmitting || isPending}
                className={cn(
                  inputBase,
                  'pl-19!',
                  errors.author && 'border border-destructive'
                )}
                {...register('author')}
              />
              <span className={labelBase}>The author</span>
            </div>
            {errors.author && (
              <p className={errorBase}>{errors.author.message}</p>
            )}
          </div>

          {/* Number of pages */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Number of pages"
                disabled={isSubmitting || isPending}
                className={cn(
                  inputBase,
                  'pl-29!',
                  errors.totalPages && 'border border-destructive'
                )}
                {...register('totalPages')}
              />
              <span className={labelBase}>Number of pages</span>
            </div>
            {errors.totalPages && (
              <p className={errorBase}>{errors.totalPages.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className={cn(
              'max-md:mt-3 max-[1439px]:mt-7.5 xxl:mt-3',
              'main-button logout-button py-2 px-4',
              'w-30.5!',
              (isSubmitting || isPending) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSubmitting || isPending ? 'Adding book...' : 'Add book'}
          </button>
        </form>

        {/* ─── Recommended books ─── */}
        <div
          className={cn(
            'bg-(--grey3) rounded-2xl',
            'p-5',
            'max-md:w-full max-[1439px]:w-[calc((100%-20px)/2)] xxl:w-full'
          )}
        >
          <h2
            className={cn(
              'text-lg md:text-xl xxl:text-xl',
              'text-foreground font-bold leading-none tracking-[-0.02em]',
              'mb-5'
            )}
          >
            Recommended books
          </h2>

          <div className="mb-5">
            <RecommendedSection />
          </div>

          <div className="flex flex-row justify-between items-center">
            <Link
              href="/recommended"
              aria-label="Go to home"
              className={cn(
                'underline inline-block',
                'text-(--grey1) text-sm font-medium leading-[1.28571] tracking-[-0.02em]'
              )}
            >
              Home
            </Link>
            <Link href="/recommended" aria-label="Go to home">
              <svg width="24" height="24">
                <use
                  href="/icons.svg#icon-log-in"
                  fill="#141414"
                  stroke="#F9F9F9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── SuccessModal ─── */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={closeSuccessModal}
        title="Good job"
        description={
          <p>
            Your book is now in{' '}
            <span className="text-foreground">the library!</span> The joy knows
            no bounds and now you can start your training
          </p>
        }
      />
    </div>
  );
}
