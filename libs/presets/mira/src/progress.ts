import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in mira (shadcn-reference/presets/mira/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-1 w-full items-center overflow-x-hidden rounded-md bg-muted',
  label: 'text-xs/relaxed font-medium',
  value: 'ms-auto text-xs/relaxed text-muted-foreground tabular-nums',
  arc: '[stroke-linecap:round]',
};
