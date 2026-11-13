import type { ScCardStyles } from '@semantic-components/presets';

// shadcn's card in lyra (shadcn-reference/presets/lyra/card.tsx).
export const card: ScCardStyles = {
  // Its radius, ring and shadow are the preset's `frame` (frame.ts), which
  // ScCard adds: a change to the card's frame goes there.
  card: 'group/card flex flex-col gap-(--card-spacing) overflow-hidden bg-card py-(--card-spacing) text-xs/relaxed text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none',
  header:
    'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-none px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
  title: 'font-heading text-sm font-medium group-data-[size=sm]/card:text-sm',
  description: 'text-xs/relaxed text-muted-foreground',
  body: 'px-(--card-spacing)',
  footer: 'flex items-center rounded-none border-t p-(--card-spacing)',
};
