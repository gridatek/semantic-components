import type { ScDrawerStyles } from '@semantic-components/presets';

// shadcn's drawer in nova (shadcn-reference/presets/nova/drawer.tsx): its look
// only — Base UI's mechanics (swipe, snap, stack) are the part's.
export const drawer: ScDrawerStyles = {
  content:
    'bg-popover text-sm text-popover-foreground data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b',
  handle:
    'after:rounded-full after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-24',
  header:
    'flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-0.5 md:text-start',
  footer: 'mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0',
  title: 'font-heading text-base font-medium text-foreground',
  description: 'text-sm text-balance text-muted-foreground',
};
