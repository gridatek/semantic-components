import type { ScProgressStyles } from '@semantic-components/presets';

// shadcn's progress in sera (shadcn-reference/presets/sera/progress.tsx).
export const progress: ScProgressStyles = {
  track:
    'relative flex h-0.5 w-full items-center overflow-x-hidden rounded-none bg-muted',
  label: 'text-xs font-semibold tracking-wide uppercase',
  value: 'ms-auto text-sm text-muted-foreground tabular-nums',
};
