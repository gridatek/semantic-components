// shadcn's calendar in vega (shadcn-reference/presets/vega/calendar.tsx): its root —
// the padding, the cells' size (--cell-size) and corners (--cell-radius); no background in a
// card's content or a popover (their slot is `popover` here).
export const calendar =
  'bg-background p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8)] in-data-[slot=card-body]:bg-transparent in-data-[slot=popover]:bg-transparent';
