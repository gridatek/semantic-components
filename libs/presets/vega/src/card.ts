import type { ScCardStyles } from '@semantic-components/presets';

// shadcn's card in vega (shadcn-reference/presets/vega/card.tsx).
export const card: ScCardStyles = {
  card: 'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
  header:
    'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
  title:
    'font-heading text-base leading-normal font-medium group-data-[size=sm]/card:text-sm',
  description: 'text-sm text-muted-foreground',
  content: 'flex flex-col gap-3 px-(--card-spacing)',
  footer:
    'flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
};
