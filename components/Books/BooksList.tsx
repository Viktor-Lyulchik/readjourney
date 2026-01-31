import { RecommendedBook } from '@/types/book';
import BookCard from './BookCard';
import { cn } from '@/lib/utils';

type Props = {
  books: RecommendedBook[];
};

export default function BooksList({ books }: Props) {
  return (
    <ul
      className={cn(
        'grid max-md:grid-cols-2 max-[1439px]:grid-cols-4 xxl:grid-cols-5',
        'gap-x-4 md:gap-x-6 xxl:gap-x-5',
        'max-md:gap-y-2 max-[1439px]:gap-y-6.75 xxl:gap-y-6.75'
      )}
    >
      {books.map(book => (
        <li key={book._id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}
