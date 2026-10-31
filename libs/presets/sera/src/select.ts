import type { ScSelectStyles } from '@semantic-components/presets';

// shadcn's select on Radix, in sera (shadcn-reference/presets-radix/sera/select.tsx),
// adapted: Radix's states as ours show them — the active item is
// `data-[active=true]` (focus stays on the trigger), disabled is `aria-disabled`.
export const select: ScSelectStyles = {
  trigger:
    "flex w-fit items-center justify-between gap-1.5 rounded-none border border-transparent border-b-input bg-transparent px-0 py-2 text-sm whitespace-nowrap transition-[color,border-color] outline-none focus-visible:border-b-ring aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-b-destructive data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-9 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-b-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  icon: 'pointer-events-none size-3.5 text-muted-foreground',
  popup:
    'relative z-50 overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  popupEnter: 'animate-in fade-in-0 zoom-in-95',
  popupLeave: 'animate-out fade-out-0 zoom-out-95',
  popupPopper:
    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 rtl:data-[side=left]:translate-x-1 data-[side=right]:translate-x-1 rtl:data-[side=right]:-translate-x-1 data-[side=top]:-translate-y-1',
  viewport: 'data-[position=popper]:w-full',
  group: 'scroll-my-1.5 p-1.5',
  groupLabel:
    'px-3 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase',
  item: "relative flex w-full cursor-default items-center gap-2.5 rounded-none py-2 pe-8 ps-3 text-sm outline-hidden select-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground not-data-[variant=destructive]:data-[active=true]:**:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
  itemIndicator:
    'pointer-events-none absolute end-2 flex size-4 items-center justify-center',
  separator: 'pointer-events-none -mx-1.5 my-1.5 h-px bg-border/50',
  scrollUpButton:
    "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-3.5",
  scrollDownButton:
    "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-3.5",
};
