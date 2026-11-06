import type { ScDrawerStyles } from '@semantic-components/presets';

// shadcn's drawer in rhea (shadcn-reference/presets/rhea/drawer.tsx): its look
// only — Base UI's mechanics (swipe, snap, stack) are the part's.
export const drawer: ScDrawerStyles = {
  content:
    'rounded-[min(var(--radius-4xl),24px)] border border-popover bg-popover text-sm text-popover-foreground shadow-xl [--drawer-inset:--spacing(2)] dark:border-border',
  handle:
    'after:rounded-full after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-[100px] group-data-[swipe-axis=x]/drawer-popup:after:w-1.5 group-data-[swipe-axis=y]/drawer-popup:after:h-1.5 group-data-[swipe-axis=y]/drawer-popup:after:w-[100px]',
  header:
    'flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-1.5 md:text-start',
  footer: 'mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0',
  title: 'font-heading text-base font-medium text-foreground',
  description: 'text-sm text-balance text-muted-foreground',
};
