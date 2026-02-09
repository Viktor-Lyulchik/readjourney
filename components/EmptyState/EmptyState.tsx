'use client';

import { cn } from '@/lib/utils';
import { SUBTITLE, SUBTITLE_GREY } from '@/lib/styles/typography.styles';

type Props = {
  title?: string;
  description?: React.ReactNode;
  className?: string;
};

export default function EmptyState({ title, description, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'max-md:h-[150px] max-[1439px]:h-[300px] xxl:h-[530px]',
        className
      )}
    >
      <div className="relative w-25 h-25 md:w-32.5 md:h-32.5 mb-2.5 md:mb-5 flex items-center justify-center">
        <div className="absolute inset-0 bg-(--grey3) rounded-full" />

        <picture className="relative z-10 block w-12.5 md:w-17.5 h-12.5 md:h-17.5">
          <source
            srcSet="/img/books@1x.webp 1x, /img/books@2x.webp 2x"
            media="(min-width: 320px)"
          />

          <img
            src="/img/books@1x.webp"
            alt="Books"
            className="w-full h-full object-contain"
          />
        </picture>
      </div>

      {/* Title / Description */}
      <div className="max-w-50 md:max-w-74">
        {title && <p className={cn(SUBTITLE, 'mb-2')}>{title}</p>}
        {description && <div className={SUBTITLE_GREY}>{description}</div>}
      </div>
    </div>
  );
}
