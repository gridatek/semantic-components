import type { ScMarkerStyles } from '@semantic-components/presets';

// shadcn's marker in rhea (shadcn-reference/presets/rhea/marker.tsx).
export const marker: ScMarkerStyles = {
  root: 'group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-sm text-muted-foreground [&_svg:not([class*=size-])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground',
  icon: 'size-4 shrink-0 [&_svg:not([class*=size-])]:size-4',
};
