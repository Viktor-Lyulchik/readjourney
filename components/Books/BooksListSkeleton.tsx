export default function BooksListSkeleton() {
  return (
    <ul className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </ul>
  );
}
