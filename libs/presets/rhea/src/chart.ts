import type { ScChartStyles } from '@semantic-components/presets';

// shadcn's chart in rhea (shadcn-reference/presets/rhea/chart.tsx): the tooltip's box,
// the only class that changes from style to style.
export const chart: ScChartStyles = {
  tooltip:
    'grid min-w-32 items-start gap-1.5 rounded-xl bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10',
};
