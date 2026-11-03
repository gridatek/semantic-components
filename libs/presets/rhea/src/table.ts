import type { ScTableStyles } from '@semantic-components/presets';

// shadcn's table in rhea (shadcn-reference/presets/rhea/table.tsx).
export const table: ScTableStyles = {
  table: 'w-full caption-bottom text-sm',
  headerCell:
    'h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pe-0',
  cell: 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0',
  caption: 'mt-4 text-sm text-muted-foreground',
  // The card's frame in rhea (card.tsx): a framed table is a block of content.
  bordered:
    'rounded-[min(var(--radius-4xl),24px)] shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10',
};
