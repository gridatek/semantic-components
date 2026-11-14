import type { ScChartStyles } from '@semantic-components/presets';

// shadcn's chart in sera (shadcn-reference/presets/sera/chart.tsx): the tooltip's box,
// the only class shadcn changes from style to style.
export const chart: ScChartStyles = {
  // Its bars' corners: a step under its skeleton's (none) — ours; shadcn's
  // examples round them the same in every style but lyra and sera (square).
  chart: '[--chart-bar-radius:0px]',
  tooltip:
    'grid min-w-32 items-start gap-1.5 bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-sm ring-1 ring-foreground/10',
};
