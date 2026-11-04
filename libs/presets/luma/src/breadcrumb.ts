import type { ScBreadcrumbStyles } from '@semantic-components/presets';

// shadcn's breadcrumb in luma (shadcn-reference/presets/luma/breadcrumb.tsx).
export const breadcrumb: ScBreadcrumbStyles = {
  list: 'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5',
  item: 'inline-flex items-center gap-1.5',
  ellipsis: 'flex size-5 items-center justify-center [&>svg]:size-4',
};
