'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, FormEvent } from 'react';

export default function RecommendedDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [author, setAuthor] = useState(searchParams.get('author') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 when applying filters
    params.set('page', '1');

    // Set or remove filter params
    if (title.trim()) {
      params.set('title', title.trim());
    } else {
      params.delete('title');
    }

    if (author.trim()) {
      params.set('author', author.trim());
    } else {
      params.delete('author');
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className={cn('flex flex-col gap-5', 'pt-5')}>
      {/* Filters */}
      <div className={cn('flex flex-row flex-wrap xxl:flex-col gap-5')}>
        <form
          onSubmit={handleSubmit}
          className={cn(
            'flex flex-col gap-2 xxl:gap-2',
            'max-md:w-full max-[1439px]:w-[calc((100%-20px)/2)] xxl:w-full'
          )}
        >
          <p className={cn('pl-2 text-sm font-medium')}>Filters:</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Book title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={isPending}
              className={cn(
                'input',
                'pl-16.5!',
                'bg-(--grey3) text-foreground focus:outline-none'
              )}
            />
            <span
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2',
                'text-(--grey1) text-[12px] pointer-events-none'
              )}
            >
              Book title
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              disabled={isPending}
              className={cn(
                'input',
                'pl-19!',
                'bg-(--grey3) text-foreground focus:outline-none'
              )}
            />
            <span
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2',
                'text-(--grey1) text-[12px] pointer-events-none'
              )}
            >
              The author
            </span>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              'mt-3',
              'main-button logout-button py-2 px-4',
              'w-30.5!',
              isPending && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isPending ? 'Applying...' : 'To apply'}
          </button>
        </form>

        {/* Start your workout */}
        <div
          className={cn(
            'bg-(--grey3)',
            'rounded-2xl',
            'p-5 md:p-5 xxl:p-5',
            'max-md:w-full max-[1439px]:w-[calc((100%-20px)/2)] xxl:w-full'
          )}
        >
          <h2
            className={cn(
              'text-lg md:text-xl xxl:text-xl',
              'text-foreground font-bold leading-none tracking-[-0.02em]',
              'mb-10'
            )}
          >
            Start your workout
          </h2>
          <div className={cn('flex flex-col gap-5', 'mb-5.5')}>
            <div className="flex gap-3 justify-start items-start flex-1">
              <div
                className={cn(
                  'w-11 h-11 rounded-full bg-foreground',
                  'flex justify-center items-center',
                  'text-lg md:text-xl xxl:text-xl',
                  'text-background font-bold leading-none tracking-[-0.02em]'
                )}
              >
                1
              </div>
              <p
                className={cn(
                  'w-49.25',
                  'text-foreground text-sm font-medium leading-[1.28571] tracking-[-0.02em]'
                )}
              >
                Create a personal library:{' '}
                <span className="text-(--grey1)">
                  add the books you intend to read to it.
                </span>
              </p>
            </div>
            <div className="flex gap-3 justify-start items-start flex-1">
              <div
                className={cn(
                  'w-11 h-11 rounded-full bg-foreground',
                  'flex justify-center items-center',
                  'text-lg md:text-xl xxl:text-xl',
                  'text-background font-bold leading-none tracking-[-0.02em]'
                )}
              >
                2
              </div>
              <p
                className={cn(
                  'w-49.25',
                  'text-foreground text-sm font-medium leading-[1.28571] tracking-[-0.02em]'
                )}
              >
                Create your first workout:{' '}
                <span className="text-(--grey1)">
                  define a goal, choose a period, start training.
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/library"
              className={cn(
                'underline inline-block',
                'text-(--grey1) text-sm font-medium leading-[1.28571] tracking-[-0.02em]'
              )}
            >
              My library
            </Link>
            <svg width="24" height="24">
              <use
                href={'/icons.svg#icon-log-in'}
                fill="#141414"
                stroke="#F9F9F9"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Quote */}

      <div
        className={cn(
          'hidden xxl:flex',
          'flex-row justify-between items-center',
          'bg-(--grey3)',
          'rounded-2xl',
          'px-5 md:px-5 xxl:px-5 py-3.5'
        )}
      >
        <picture className="block w-10 h-10">
          {/* Desktop */}
          <source
            srcSet="
                        /img/books@1x.webp 1x,
                        /img/books@2x.webp 2x
                      "
            media="(min-width: 1440px)"
          />

          <img
            src="/img/books@1x.webp"
            alt="Books are windows to the world, and reading is a journey into the unknown."
            className="w-full h-full object-contain"
          />
        </picture>
        <p
          className={cn(
            'text-(--grey1) text-sm font-medium leading-[1.28571] tracking-[-0.02em]',
            'w-55.25'
          )}
        >
          "Books are<span className={cn('text-foreground')}> windows</span> to
          the world, and reading is a journey into the unknown."
        </p>
      </div>
    </div>
  );
}
