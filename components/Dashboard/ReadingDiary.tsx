'use client';

import { cn } from '@/lib/utils';
import { BookProgress } from '@/types/book';
import { useDeleteReading } from '@/lib/api/mutations/reading.mutations';

type Props = {
  bookId: string;
  progress: BookProgress[];
  totalPages: number;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function ReadingDiary({ bookId, progress, totalPages }: Props) {
  const { mutateAsync: deleteReading, isPending } = useDeleteReading();

  const completedSessions = [...progress]
    .filter(p => p.status === 'inactive' && p.finishPage && p.finishReading)
    .sort(
      (a, b) =>
        new Date(b.finishReading!).getTime() -
        new Date(a.finishReading!).getTime()
    );

  const groupedSessions = completedSessions.reduce(
    (acc, session) => {
      const dateKey = formatDate(new Date(session.finishReading!));
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, totalPagesInDay: 0, sessions: [] };
      }
      const pagesRead = session.finishPage! - session.startPage + 1;
      acc[dateKey].totalPagesInDay += pagesRead;
      acc[dateKey].sessions.push(session);
      return acc;
    },
    {} as Record<
      string,
      { date: string; totalPagesInDay: number; sessions: BookProgress[] }
    >
  );

  const groups = Object.values(groupedSessions);

  const handleDelete = async (session: BookProgress) => {
    try {
      await deleteReading({ bookId, readingId: session._id });
    } catch {
      /* Error handled in mutation */
    }
  };

  return (
    <div className={cn('bg-(--grey3) rounded-[15px] p-5')}>
      <div
        className={cn('max-h-[333px] overflow-y-auto pr-2 custom-scrollbar')}
      >
        <div className={cn('flex flex-col gap-5.5')}>
          {groups.map((group, groupIndex) => (
            <div
              key={group.date}
              className={cn('flex flex-col gap-4 md:gap-4.5')}
            >
              {/* Header of the day */}
              <div
                className={cn(
                  'flex items-center justify-between pl-0 pr-9.5 md:pr-7'
                )}
              >
                <div className={cn('flex items-center gap-2.25 md:gap-2.5')}>
                  <div
                    className={cn(
                      'w-4 h-4 md:w-5 md:h-5 border-4 rounded flex items-center justify-center transition-colors',
                      groupIndex === 0
                        ? 'border-foreground'
                        : 'border-(--grey1)'
                    )}
                  ></div>
                  <span
                    className={cn(
                      'transition-colors',
                      'font-bold text-xs md:text-base max-md:leading-[1.33] md:leading-[1.125] tracking-[0.02em]',
                      groupIndex === 0 ? 'text-foreground' : 'text-(--grey1)'
                    )}
                  >
                    {group.date}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-(--grey1)',
                    'text-xs md:text-sm font-medium max-md:leading-[1.33] md:leading-[1.28571] tracking-[-0.02em]'
                  )}
                >
                  {group.totalPagesInDay} pages
                </span>
              </div>

              {/* List of sessions */}
              <div
                className={cn(
                  'relative flex flex-col gap-4 md:gap-7 ml-2 pl-6 border-l-2 border-background'
                )}
              >
                {group.sessions.map((session, sIndex) => {
                  const startDate = new Date(session.startReading);
                  const finishDate = new Date(session.finishReading!);
                  const durationMinutes = Math.max(
                    1,
                    Math.floor(
                      (finishDate.getTime() - startDate.getTime()) / 60000
                    )
                  );
                  const percent = (
                    ((session.finishPage! - session.startPage + 1) /
                      totalPages) *
                    100
                  ).toFixed(2);

                  return (
                    <div
                      key={sIndex}
                      className={cn(
                        'grid grid-cols-[1fr_43px_16px] md:grid-cols-[1fr_59px_20px] items-start gap-x-1.5 md:gap-x-2'
                      )}
                    >
                      <div className={cn('flex flex-col pt-1.5')}>
                        <span
                          className={cn(
                            'text-foreground',
                            'font-medium text-sm md:text-xl max-md:leading-[1.28571] md:leading-none tracking-[-0.02em]',
                            'mb-2'
                          )}
                        >
                          {percent}%
                        </span>
                        <span
                          className={cn(
                            'text-(--grey1) ',
                            'font-medium text-[10px] md:text-xs max-md:leading-[1.2] md:leading-[1.16667] tracking-[-0.02em]'
                          )}
                        >
                          {durationMinutes} minutes
                        </span>
                      </div>

                      <div className={cn('flex flex-col gap-1 items-center')}>
                        <div
                          className={cn(
                            'w-[43px] md:w-[59px]',
                            'h-[17px] md:h-[24px]',
                            'relative',
                            'mb-1.75'
                          )}
                        >
                          <div
                            className={cn('absolute inset-0 bg-(--green)')}
                            style={{
                              clipPath:
                                'polygon(0% 45%, 100% 0%, 100% 10%, 0% 55%)',
                            }}
                          />
                          <div
                            className={cn('absolute inset-0')}
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(63, 143, 80, 0.4) 0%, rgba(63, 143, 80, 0) 100%)',
                              clipPath:
                                'polygon(0% 55%, 100% 10%, 100% 100%, 0% 100%)',
                            }}
                          />
                        </div>
                        <span
                          className={cn(
                            'text-(--grey1) text-center',
                            'w-[43px] md:w-[59px]',
                            'font-medium text-[10px] md:text-xs max-md:leading-[1.2] md:leading-[1.16667] tracking-[-0.02em]'
                          )}
                        >
                          {session.speed} pages per hour
                        </span>
                      </div>

                      <div className={cn('flex justify-start pt-1.5 pb-8.5')}>
                        <button
                          onClick={() => handleDelete(session)}
                          disabled={isPending}
                          className={cn(
                            'text-(--grey1) hover:text-destructive transition-colors'
                          )}
                        >
                          <svg width="16" height="16">
                            <use
                              href="/icons.svg#icon-trash"
                              fill="none"
                              stroke="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
