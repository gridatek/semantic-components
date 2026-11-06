import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in nova (shadcn-reference/presets/nova/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted',
  label: 'text-sm font-medium',
  value: 'ms-auto text-sm text-muted-foreground tabular-nums',
};
