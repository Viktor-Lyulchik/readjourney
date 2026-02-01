'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { RecommendedBook } from '@/types/book';
import { cn } from '@/lib/utils';
import { HEADING_SM, TEXT_HELPER } from '@/lib/styles/typography.styles';

type Props = {
  book: RecommendedBook;
};

// Константи для BookCard
const CARD_HOVER = cn(
  'cursor-pointer hover:scale-105 transition-all duration-250 ease-in-out',
  'flex flex-col'
);

const IMAGE_CONTAINER = cn(
  'overflow-hidden rounded-xl mb-2',
  'relative aspect-2/3 w-full cursor-pointer'
);

const IMAGE_STYLES = cn(
  'object-cover transition-transform duration-300 group-hover:scale-105'
);

export default function BookCard({ book }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('bookId', book._id);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={CARD_HOVER} onClick={handleOpen}>
      <div className={IMAGE_CONTAINER}>
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1440px) 25vw, 20vw"
          className={IMAGE_STYLES}
        />
      </div>
      <p className={cn(HEADING_SM, 'truncate w-full mb-0.5')}>{book.title}</p>
      <p className={TEXT_HELPER}>{book.author}</p>
    </div>
  );
}
