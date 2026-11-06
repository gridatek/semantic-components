import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in rhea (shadcn-reference/presets/rhea/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-2 w-full items-center overflow-x-hidden rounded-2xl bg-muted',
  label: 'text-sm font-medium',
  value: 'ms-auto text-sm text-muted-foreground tabular-nums',
};
