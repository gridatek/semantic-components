import type { ScComboboxStyles } from '@semantic-components/presets';

// shadcn's combobox in rhea (shadcn-reference/presets/rhea/combobox.tsx), adapted: Base UI's
// states as Angular Aria shows them (data-highlighted: is data-[active=true]:, data-disabled: is
// aria-disabled:); its positioner variables and data-open: / data-closed: classes left out — the
// CDK sizes and places the popup, Angular animates it (popupEnter, popupLeave).
export const combobox: ScComboboxStyles = {
  trigger: "[&_svg:not([class*='size-'])]:size-4",
  triggerIcon:
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:text-muted-foreground',
  popup:
    'group/combobox-content relative overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/50 *:data-[slot=input-group]:shadow-none dark:ring-foreground/10',
  popupEnter: 'animate-in fade-in-0 zoom-in-95',
  popupLeave: 'animate-out fade-out-0 zoom-out-95',
  list: 'max-h-[calc(--spacing(72)---spacing(9))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
  item: "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground not-data-[variant=destructive]:data-[active=true]:**:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  itemIndicator:
    'pointer-events-none absolute end-2 flex size-4 items-center justify-center',
  groupLabel: 'px-2 py-1.5 text-xs text-muted-foreground',
  empty:
    'hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex',
  separator: '-mx-1 my-1 h-px bg-border',
  chips:
    'flex min-h-8 flex-wrap items-center gap-1 rounded-2xl border border-transparent bg-input/50 bg-clip-padding px-2.5 py-1 text-sm transition-[color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
  chip: 'flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-2xl bg-input px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0.5 dark:bg-input/60',
  chipRemove:
    '-ms-0.5 size-4.5 opacity-50 hover:opacity-100 aria-disabled:pointer-events-none',
  chipsInput: 'min-w-16 flex-1 outline-none',
};
