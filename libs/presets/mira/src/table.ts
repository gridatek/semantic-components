import type { ScTableStyles } from '@semantic-components/presets';

// shadcn's table in mira (shadcn-reference/presets/mira/table.tsx).
export const table: ScTableStyles = {
  table: 'w-full caption-bottom text-xs',
  headerCell:
    'h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pe-0',
  cell: 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0',
  caption: 'mt-4 text-xs text-muted-foreground',
  // The card's frame in mira (card.tsx): a framed table is a block of content.
  bordered: 'rounded-lg ring-1 ring-foreground/10',
};
