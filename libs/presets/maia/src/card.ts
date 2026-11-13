import type { ScCardStyles } from '@semantic-components/presets';

// shadcn's card in maia (shadcn-reference/presets/maia/card.tsx).
export const card: ScCardStyles = {
  // Its radius, ring and shadow are the preset's `frame` (frame.ts), which
  // ScCard adds: a change to the card's frame goes there.
  card: 'group/card flex flex-col gap-(--card-spacing) overflow-hidden bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
  header:
    'group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
  title: 'font-heading text-base font-medium',
  description: 'text-sm text-muted-foreground',
  body: 'px-(--card-spacing)',
  footer:
    'flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
};
