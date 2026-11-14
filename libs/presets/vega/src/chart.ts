import type { ScChartStyles } from '@semantic-components/presets';

// shadcn's chart in vega (shadcn-reference/presets/vega/chart.tsx): the tooltip's box,
// the only class shadcn changes from style to style.
export const chart: ScChartStyles = {
  // Its bars' corners: a step under its skeleton's (rounded-md) — ours; shadcn's
  // examples round them the same in every style but lyra and sera (square).
  chart: '[--chart-bar-radius:var(--radius-sm)]',
  tooltip:
    'grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
};
