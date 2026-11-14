import type { ScChartStyles } from '@semantic-components/presets';

// shadcn's chart in luma (shadcn-reference/presets/luma/chart.tsx): the tooltip's box,
// the only class shadcn changes from style to style.
export const chart: ScChartStyles = {
  // Its bars' corners: a step under its skeleton's (rounded-2xl) — ours; shadcn's
  // examples round them the same in every style but lyra and sera (square).
  chart: '[--chart-bar-radius:var(--radius-xl)]',
  tooltip:
    'grid min-w-32 items-start gap-1.5 rounded-xl bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10',
};
