import type { ScMarkerStyles } from '@semantic-components/presets';

// shadcn's marker in sera (shadcn-reference/presets/sera/marker.tsx).
export const marker: ScMarkerStyles = {
  root: 'group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-xs tracking-wide text-muted-foreground uppercase [&_svg:not([class*=size-])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground',
  icon: 'size-4 shrink-0 [&_svg:not([class*=size-])]:size-4',
};
