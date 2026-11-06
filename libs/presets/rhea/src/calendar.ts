// shadcn's calendar in rhea (shadcn-reference/presets/rhea/calendar.tsx): its root —
// the padding, the cells' size (--cell-size) and corners (--cell-radius); no background in a
// card's content or a popover (their slot is `popover` here).
export const calendar =
  'bg-background p-3 [--cell-radius:var(--radius-2xl)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover]:bg-transparent';
