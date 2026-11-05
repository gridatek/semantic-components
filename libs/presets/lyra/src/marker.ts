import type { ScMarkerStyles } from '@semantic-components/presets';

// shadcn's marker in lyra (shadcn-reference/presets/lyra/marker.tsx).
export const marker: ScMarkerStyles = {
  root: 'group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-xs text-muted-foreground [&_svg:not([class*=size-])]:size-3.5 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground',
  icon: 'size-3.5 shrink-0 [&_svg:not([class*=size-])]:size-3.5',
};
