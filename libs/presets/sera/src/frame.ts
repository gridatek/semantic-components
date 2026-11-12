// The card's frame in sera (shadcn-reference/presets/sera/card.tsx): its
// radius, ring and shadow — drawn round any box by scFrame, and round the card
// itself (ScCard adds it; its card.ts no longer has these classes).
export const frame = 'shadow-sm ring-1 ring-foreground/5';

// A small box's frame (scFrame size="sm": a row, an icon's box): shadcn draws
// these with rounded-md ring ring-border (the same here), square in sera.
export const frameSm = 'rounded-none ring-1 ring-border';
