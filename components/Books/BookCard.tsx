'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { RecommendedBook } from '@/types/book';
import { cn } from '@/lib/utils';

type Props = {
  book: RecommendedBook;
};

export default function BookCard({ book }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('bookId', book._id);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div
      className={cn(
        'cursor-pointer hover:scale-105 transition-all duration-250 ease-in-out',
        'flex flex-col'
      )}
      onClick={handleOpen}
    >
      <div
        className={cn(
          'overflow-hidden rounded-xl mb-2',
          'relative aspect-2/3 w-full cursor-pointer'
        )}
      >
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1440px) 25vw, 20vw"
          className={cn(
            'object-cover transition-transform duration-300 group-hover:scale-105'
          )}
        />
      </div>
      <p
        className={cn(
          'text-sm font-bold leading-4.5 tracking-[-0.02em]',
          'truncate w-full',
          'mb-0.5'
        )}
      >
        {book.title}
      </p>
      <p
        className={cn(
          'text-[10px] font-medium leading-[1.2] tracking-[-0.02em] text-(--grey1)'
        )}
      >
        {book.author}
      </p>
    </div>
  );
}
