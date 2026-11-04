import type { ScBreadcrumbStyles } from '@semantic-components/presets';

// shadcn's breadcrumb in mira (shadcn-reference/presets/mira/breadcrumb.tsx).
export const breadcrumb: ScBreadcrumbStyles = {
  list: 'flex flex-wrap items-center gap-1.5 text-xs/relaxed wrap-break-word text-muted-foreground',
  item: 'inline-flex items-center gap-1',
  ellipsis: 'flex size-4 items-center justify-center [&>svg]:size-3.5',
};
