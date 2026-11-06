import type { ScDrawerStyles } from '@semantic-components/presets';

// shadcn's drawer in mira (shadcn-reference/presets/mira/drawer.tsx): its look
// only — Base UI's mechanics (swipe, snap, stack) are the part's.
export const drawer: ScDrawerStyles = {
  content:
    'rounded-xl border border-popover bg-popover text-xs/relaxed text-popover-foreground [--drawer-inset:--spacing(2)] dark:border-border',
  handle:
    'after:rounded-full after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-12 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-12',
  header:
    'flex shrink-0 flex-col gap-1 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:text-start',
  footer: 'mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0',
  title: 'font-heading text-sm font-medium text-foreground',
  description: 'text-xs/relaxed text-balance text-muted-foreground',
};
