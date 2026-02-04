import { BookDetailsResponse } from '@/types/book';
import LibraryBookCard from './LibraryBookCard';
import { cn } from '@/lib/utils';

type Props = {
  books: BookDetailsResponse[];
  onDetails: (book: BookDetailsResponse) => void;
  onRemove: (bookId: string) => void;
};

export default function LibraryBooksList({
  books,
  onDetails,
  onRemove,
}: Props) {
  const GRID_STYLES = cn(
    'grid max-md:grid-cols-2 max-[1439px]:grid-cols-4 xxl:grid-cols-5',
    'gap-x-4 md:gap-x-6 xxl:gap-x-5',
    'max-md:gap-y-2 max-[1439px]:gap-y-6.75 xxl:gap-y-6.75'
  );

  return (
    <ul className={GRID_STYLES}>
      {books.map(book => (
        <li key={book._id}>
          <LibraryBookCard
            book={book}
            onDetails={onDetails}
            onRemove={onRemove}
          />
        </li>
      ))}
    </ul>
  );
}
