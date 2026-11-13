import type { ScBreadcrumbStyles } from '@semantic-components/presets';

// shadcn's breadcrumb in nova (shadcn-reference/presets/nova/breadcrumb.tsx).
export const breadcrumb: ScBreadcrumbStyles = {
  list: 'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground',
  item: 'inline-flex items-center gap-1',
  ellipsis: 'flex size-5 items-center justify-center [&>svg]:size-4',
};
