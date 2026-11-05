import type { ScMenubarStyles } from '@semantic-components/presets';

// shadcn's menubar in vega (shadcn-reference/presets/vega/menubar.tsx):
// the bar, its triggers, and the menus in it — where a menubar part wraps a
// dropdown menu part, its classes merged over that part's. In our states, as
// the menu key: focus: → data-highlighted:, data-disabled: → aria-disabled:,
// data-open: / data-popup-open: → aria-expanded:. Placement and open/close
// classes left out.
export const menubar: ScMenubarStyles = {
  bar: 'flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
  trigger:
    'flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted',
  menu: {
    popup:
      'overflow-x-hidden overflow-y-auto outline-none min-w-36 rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100',
    subPopup:
      'min-w-32 rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100',
    label:
      'text-muted-foreground px-2 py-1.5 text-sm font-medium data-inset:ps-8',
    item: "group/menu-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive gap-2 rounded-sm px-2 py-1.5 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!",
    subTrigger:
      "flex cursor-default items-center outline-hidden select-none not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-2 rounded-sm px-2 py-1.5 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4",
    checkboxItem:
      'relative flex cursor-default items-center gap-2 rounded-md py-1.5 pe-2 ps-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    radioItem:
      "relative flex cursor-default items-center gap-2 rounded-md py-1.5 pe-2 ps-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    indicator:
      "pointer-events-none absolute start-2 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
    separator: '-mx-1 my-1 h-px bg-border',
    shortcut:
      'group-data-highlighted/menu-item:text-accent-foreground ms-auto text-xs tracking-widest text-muted-foreground',
  },
};
