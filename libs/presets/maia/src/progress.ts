import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in maia (shadcn-reference/presets/maia/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-3 w-full items-center overflow-x-hidden rounded-4xl bg-muted',
  label: 'text-sm font-medium',
  value: 'ms-auto text-sm text-muted-foreground tabular-nums',
  arc: '[stroke-linecap:round]',
};
