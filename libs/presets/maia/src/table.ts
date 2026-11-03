import type { ScTableStyles } from '@semantic-components/presets';

// shadcn's table in maia (shadcn-reference/presets/maia/table.tsx).
export const table: ScTableStyles = {
  table: 'w-full caption-bottom text-sm',
  headerCell:
    'h-12 px-3 text-start align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pe-0',
  cell: 'p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0',
  caption: 'mt-4 text-sm text-muted-foreground',
};
