// The card's frame in maia (shadcn-reference/presets/maia/card.tsx): its
// radius, ring and shadow — drawn round any box by scFrame, and round the card
// itself (ScCard adds it; its card.ts no longer has these classes).
export const frame = 'rounded-2xl ring-1 ring-foreground/10';

// A small box's frame (scFrame size="sm": a row, an icon's box): shadcn draws
// these with rounded-md ring ring-border (the same here).
export const frameSm = 'rounded-md ring-1 ring-border';
