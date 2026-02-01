'use client';

import { cn } from '@/lib/utils';

type WorkoutStepProps = {
  number: number;
  title: string;
  description: string;
};

const STEP_NUMBER_STYLES = cn(
  'w-11 h-11 rounded-full bg-foreground',
  'flex justify-center items-center',
  'text-lg md:text-xl xxl:text-xl',
  'text-background font-bold leading-none tracking-[-0.02em]'
);

const STEP_TEXT_STYLES = cn(
  'w-49.25',
  'text-foreground text-sm font-medium leading-[1.28571] tracking-[-0.02em]'
);

const DESCRIPTION_STYLES = 'text-(--grey1)';

export default function WorkoutStep({
  number,
  title,
  description,
}: WorkoutStepProps) {
  return (
    <div className="flex gap-3 justify-start items-start flex-1">
      <div className={STEP_NUMBER_STYLES}>{number}</div>
      <p className={STEP_TEXT_STYLES}>
        {title} <span className={DESCRIPTION_STYLES}>{description}</span>
      </p>
    </div>
  );
}
