import type { ScAccordionStyles } from '@semantic-components/presets';

// shadcn's accordion in maia (shadcn-reference/presets/maia/accordion.tsx).
// Its panel's open/close classes and height variable are left out: the panel
// animates its height itself. One icon, turned, for its two.
export const accordion: ScAccordionStyles = {
  root: 'flex w-full flex-col overflow-hidden rounded-2xl border',
  item: 'not-last:border-b data-open:bg-muted/50',
  trigger:
    'group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent p-4 text-start text-sm font-medium transition-all outline-none hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50',
  icon: 'ms-auto size-4 text-muted-foreground pointer-events-none shrink-0',
  panel: 'overflow-hidden px-4 text-sm',
  content:
    'pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
};
