import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in luma (shadcn-reference/presets/luma/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-3 w-full items-center overflow-x-hidden rounded-full bg-muted',
  label: 'text-sm font-medium',
  value: 'ms-auto text-sm text-muted-foreground tabular-nums',
};
