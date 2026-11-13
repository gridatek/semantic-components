import type { ScPaginationStyles } from '@semantic-components/presets';

// shadcn's pagination in nova (shadcn-reference/presets/nova/pagination.tsx).
export const pagination: ScPaginationStyles = {
  list: 'flex items-center gap-0.5',
  ellipsis:
    "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
  previous: 'ps-1.5!',
  next: 'pe-1.5!',
};
