'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SUBTITLE_XS } from '@/lib/styles/typography.styles';
import { cn } from '@/lib/utils';
import { BookDetailsResponse } from '@/types/book';

type Status = BookDetailsResponse['status'];

type FilterOption = {
  value: 'all' | Status;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All books' },
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

type Props = {
  value: 'all' | Status;
  onChange: (value: 'all' | Status) => void;
};

export default function BooksFilter({ value, onChange }: Props) {
  const [offset, setOffset] = useState(4);

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.innerWidth >= 768 ? 8 : 4);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [setOffset]);

  return (
    <Select
      value={value}
      onValueChange={val => onChange(val as 'all' | Status)}
    >
      <SelectTrigger
        className={cn(
          'w-30 md:w-38 min-w-35 h-auto',
          'bg-(--dark-grey) text-foreground',
          'rounded-xl border border-(--grey1)',
          'p-3 md:p-3.5 xxl:p-3.5',
          'focus:ring-0 focus:ring-offset-0 outline-none',
          SUBTITLE_XS
        )}
      >
        <SelectValue placeholder="Select filter" />
      </SelectTrigger>

      <SelectContent
        className={cn('bg-(--grey3) border-none rounded-xl text-foreground')}
        sideOffset={offset}
      >
        {FILTER_OPTIONS.map(opt => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={cn(
              'cursor-pointer transition-colors',
              'text-(--grey1) focus:text-foreground focus:bg-transparent',
              'data-[state=checked]:text-foreground data-[state=checked]:bg-transparent',
              SUBTITLE_XS
            )}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
