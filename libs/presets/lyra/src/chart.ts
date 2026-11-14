import type { ScChartStyles } from '@semantic-components/presets';

// shadcn's chart in lyra (shadcn-reference/presets/lyra/chart.tsx): the tooltip's box,
// the only class shadcn changes from style to style.
export const chart: ScChartStyles = {
  // Its bars' corners: a step under its skeleton's (none) — ours; shadcn's
  // examples round them the same in every style but lyra and sera (square).
  chart: '[--chart-bar-radius:0px]',
  tooltip:
    'grid min-w-32 items-start gap-1.5 rounded-none border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
};
