import type { ScComboboxStyles } from '@semantic-components/presets';

// shadcn's combobox in luma (shadcn-reference/presets/luma/combobox.tsx), adapted: Base UI's
// states as Angular Aria shows them (data-highlighted: is data-[active=true]:, data-disabled: is
// aria-disabled:); its positioner variables and data-open: / data-closed: classes left out — the
// CDK sizes and places the popup, Angular animates it (popupEnter, popupLeave).
export const combobox: ScComboboxStyles = {
  trigger: "[&_svg:not([class*='size-'])]:size-4",
  triggerIcon:
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:text-muted-foreground',
  popup:
    'group/combobox-content relative overflow-hidden rounded-3xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1.5 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/50 *:data-[slot=input-group]:shadow-none dark:ring-foreground/10',
  popupEnter: 'animate-in fade-in-0 zoom-in-95',
  popupLeave: 'animate-out fade-out-0 zoom-out-95',
  list: 'no-scrollbar max-h-[calc(--spacing(72)---spacing(9))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0',
  item: "relative flex w-full cursor-default items-center gap-2.5 rounded-2xl py-2 pe-8 ps-3 text-sm font-medium outline-hidden select-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground not-data-[variant=destructive]:data-[active=true]:**:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  itemIndicator:
    'pointer-events-none absolute end-2 flex size-4 items-center justify-center',
  groupLabel: 'px-3 py-2.5 text-xs text-muted-foreground',
  empty:
    'hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex',
  separator: '-mx-1.5 my-1.5 h-px bg-border',
  chips:
    'flex min-h-9 flex-wrap items-center gap-1.5 rounded-3xl border border-transparent bg-input/50 bg-clip-padding px-3 py-1.5 text-sm transition-[color,box-shadow,background-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
  chip: 'flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-3xl bg-input px-2 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0 dark:bg-input/60',
  chipRemove: '-ms-1 opacity-50 hover:opacity-100',
  chipsInput: 'min-w-16 flex-1 outline-none',
};
