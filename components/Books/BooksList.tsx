import { RecommendedBook } from '@/types/book';
import BookCard from './BookCard';
import { cn } from '@/lib/utils';

type Props = {
  books: RecommendedBook[];
  variant?: 'default' | 'compact';
};

export default function BooksList({ books, variant = 'default' }: Props) {
  const DEFAULT_STYLES = cn(
    'grid max-md:grid-cols-2 max-[1439px]:grid-cols-4 xxl:grid-cols-5',
    'gap-x-4 md:gap-x-6 xxl:gap-x-5',
    'max-md:gap-y-2 max-[1439px]:gap-y-6.75 xxl:gap-y-6.75'
  );
  const COMPACT_STYLES = cn('grid grid-cols-3', 'gap-x-5', 'gap-y-0');
  return (
    <ul className={cn(variant === 'default' ? DEFAULT_STYLES : COMPACT_STYLES)}>
      {books.map(book => (
        <li key={book._id}>
          <BookCard book={book} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
