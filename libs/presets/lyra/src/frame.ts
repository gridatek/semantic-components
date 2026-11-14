// The card's frame in lyra (shadcn-reference/presets/lyra/card.tsx): its
// radius, ring and shadow — drawn round any box by scFrame, and round the card
// itself (ScCard adds it; its card.ts no longer has these classes).
export const frame = 'rounded-none ring-1 ring-foreground/10';

// A small box's frame (scFrame size="sm": a row, an icon's box): shadcn draws
// these with rounded-md ring ring-border (the same here), square in lyra.
export const frameSm = 'rounded-none ring-1 ring-border';

// A tiny box's corners (scFrame size="xs": a meter's track and fill, a swatch):
// shadcn draws these with rounded-sm, square in lyra; no ring.
export const frameXs = 'rounded-none';
