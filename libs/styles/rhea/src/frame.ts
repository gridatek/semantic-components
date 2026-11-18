// The card's frame in rhea (shadcn-reference/presets/rhea/card.tsx): its
// radius, ring and shadow — drawn round any box by scFrame, and round the card
// itself (ScCard adds it; its card.ts no longer has these classes).
export const frame =
  'rounded-[min(var(--radius-4xl),24px)] shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10';

// A small box's frame (scFrame size="sm": a row, an icon's box): shadcn draws
// these with rounded-md ring ring-border (the same here).
export const frameSm = 'rounded-md ring-1 ring-border';

// A tiny box's corners (scFrame size="xs": a meter's track and fill, a swatch):
// shadcn draws these with rounded-sm (the same here); no ring.
export const frameXs = 'rounded-sm';
