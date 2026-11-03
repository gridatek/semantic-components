import type { ScPaginationStyles } from '@semantic-components/presets';

// shadcn's pagination in sera (shadcn-reference/presets/sera/pagination.tsx).
export const pagination: ScPaginationStyles = {
  list: 'flex items-center gap-1',
  ellipsis:
    "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
  previous: 'ps-2!',
  next: 'pe-2!',
};
