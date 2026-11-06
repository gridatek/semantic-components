import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in lyra (shadcn-reference/presets/lyra/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-1 w-full items-center overflow-x-hidden rounded-none bg-muted',
  label: 'text-xs',
  value: 'ms-auto text-xs text-muted-foreground tabular-nums',
};
