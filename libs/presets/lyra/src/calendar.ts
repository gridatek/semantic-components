// shadcn's calendar in lyra (shadcn-reference/presets/lyra/calendar.tsx): its root —
// the padding, the cells' size (--cell-size) and corners (--cell-radius); no background in a
// card's content or a popover (their slot is `popover` here).
export const calendar =
  'bg-background p-2 [--cell-size:--spacing(7)] in-data-[slot=card-body]:bg-transparent in-data-[slot=popover]:bg-transparent';
