import type { ScTableStyles } from '@semantic-components/presets';

// shadcn's table in sera (shadcn-reference/presets/sera/table.tsx).
export const table: ScTableStyles = {
  table: 'w-full caption-bottom text-sm',
  headerCell:
    'h-12 px-3 text-start align-middle text-xs font-medium tracking-wider whitespace-nowrap text-muted-foreground uppercase [&:has([role=checkbox])]:pe-0',
  cell: 'p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0',
  caption: 'mt-4 text-sm text-muted-foreground',
};
