import type { ScCardStyles } from '@semantic-components/presets';

// shadcn's card in sera (shadcn-reference/presets/sera/card.tsx).
export const card: ScCardStyles = {
  card: 'group/card flex flex-col gap-(--card-spacing) overflow-hidden bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm ring-1 ring-foreground/5 [--card-spacing:--spacing(8)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(5)] *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none',
  header:
    'group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-none px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
  title: 'font-heading text-lg font-semibold tracking-wider uppercase',
  description: 'text-sm leading-relaxed text-muted-foreground',
  content: 'px-(--card-spacing)',
  footer:
    'flex items-center px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
};
