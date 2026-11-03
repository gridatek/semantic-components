import type { ScPaginationStyles } from '@semantic-components/presets';

// shadcn's pagination in mira (shadcn-reference/presets/mira/pagination.tsx).
export const pagination: ScPaginationStyles = {
  list: 'flex items-center gap-0.5',
  ellipsis:
    "flex size-7 items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
  previous: 'ps-2!',
  next: 'pe-2!',
};
