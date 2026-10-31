import type { ScSelectStyles } from '@semantic-components/presets';

// shadcn's select on Radix, in maia (shadcn-reference/presets-radix/maia/select.tsx),
// adapted: Radix's states as ours show them — the active item is
// `data-[active=true]` (focus stays on the trigger), disabled is `aria-disabled`.
export const select: ScSelectStyles = {
  trigger:
    "flex w-fit items-center justify-between gap-1.5 rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  icon: 'pointer-events-none size-4 text-muted-foreground',
  popup:
    'relative z-50 min-w-36 overflow-x-hidden overflow-y-auto rounded-2xl bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  popupEnter: 'animate-in fade-in-0 zoom-in-95',
  popupLeave: 'animate-out fade-out-0 zoom-out-95',
  popupPopper:
    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 rtl:data-[side=left]:translate-x-1 data-[side=right]:translate-x-1 rtl:data-[side=right]:-translate-x-1 data-[side=top]:-translate-y-1',
  viewport: 'data-[position=popper]:w-full',
  group: 'scroll-my-1 p-1',
  groupLabel: 'px-3 py-2.5 text-xs text-muted-foreground',
  item: "relative flex w-full cursor-default items-center gap-2.5 rounded-xl py-2 pe-8 ps-3 text-sm outline-hidden select-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground not-data-[variant=destructive]:data-[active=true]:**:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
  itemIndicator:
    'pointer-events-none absolute end-2 flex size-4 items-center justify-center',
  separator: 'pointer-events-none -mx-1 my-1 h-px bg-border/50',
  scrollUpButton:
    "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
  scrollDownButton:
    "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
};
