import type { ScMenubarStyles } from '@semantic-components/presets';

// shadcn's menubar in sera (shadcn-reference/presets/sera/menubar.tsx):
// the bar, its triggers, and the menus in it — where a menubar part wraps a
// dropdown menu part, its classes merged over that part's. In our states, as
// the menu key: focus: → data-highlighted:, data-disabled: → aria-disabled:,
// data-open: / data-popup-open: → aria-expanded:. Placement and open/close
// classes left out.
export const menubar: ScMenubarStyles = {
  bar: 'flex h-10 items-center rounded-none border p-1',
  trigger:
    'flex items-center rounded-none px-2 py-0.75 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted',
  menu: {
    popup:
      'overflow-x-hidden overflow-y-auto outline-none min-w-48 rounded-none bg-popover p-1.5 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100',
    subPopup:
      'min-w-32 rounded-none bg-popover p-1.5 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100',
    label:
      'px-3.5 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase data-inset:ps-9.5',
    item: "group/menu-item relative flex cursor-default items-center font-medium tracking-wider uppercase outline-hidden select-none aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive gap-2.5 rounded-none px-3 py-2 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 data-[variant=destructive]:*:[svg]:text-destructive!",
    subTrigger:
      "flex cursor-default items-center outline-hidden select-none not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-2 rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 [&_svg:not([class*='size-'])]:size-3.5",
    checkboxItem:
      'relative flex cursor-default items-center gap-2.5 rounded-none py-2 pe-3 ps-9.5 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    radioItem:
      "relative flex cursor-default items-center gap-2.5 rounded-none py-2 pe-3 ps-9.5 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    indicator:
      "pointer-events-none absolute start-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
    separator: '-mx-1 my-1 h-px bg-border/50',
    shortcut:
      'group-data-highlighted/menu-item:text-accent-foreground ms-auto text-xs tracking-widest text-muted-foreground',
  },
};
