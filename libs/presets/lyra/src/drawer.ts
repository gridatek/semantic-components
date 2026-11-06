import type { ScDrawerStyles } from '@semantic-components/presets';

// shadcn's drawer in lyra (shadcn-reference/presets/lyra/drawer.tsx): its look
// only — Base UI's mechanics (swipe, snap, stack) are the part's.
export const drawer: ScDrawerStyles = {
  content:
    'bg-popover text-xs/relaxed text-popover-foreground data-[swipe-direction=down]:rounded-none data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-none data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-none data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-none data-[swipe-direction=up]:border-b',
  handle:
    'after:rounded-none after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-12 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-12',
  header:
    'flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-0.5 md:text-start',
  footer: 'mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0',
  title: 'font-heading text-sm font-medium text-foreground',
  description: 'text-xs/relaxed text-balance text-muted-foreground',
};
