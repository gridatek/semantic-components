import type { ScAccordionStyles } from '@semantic-components/presets';

// shadcn's accordion in lyra (shadcn-reference/presets/lyra/accordion.tsx).
// Its panel's open/close classes and height variable are left out: the panel
// animates its height itself. One icon, turned, for its two.
export const accordion: ScAccordionStyles = {
  root: 'flex w-full flex-col',
  item: 'not-last:border-b',
  trigger:
    'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-none border border-transparent py-2.5 text-start text-xs font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50',
  icon: 'ms-auto size-4 text-muted-foreground pointer-events-none shrink-0',
  panel: 'overflow-hidden text-xs',
  content:
    'pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
};
