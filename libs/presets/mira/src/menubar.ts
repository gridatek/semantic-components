import type { ScMenubarStyles } from '@semantic-components/presets';

// shadcn's menubar in mira (shadcn-reference/presets/mira/menubar.tsx):
// the bar, its triggers, and the menus in it — where a menubar part wraps a
// dropdown menu part, its classes merged over that part's. In our states, as
// the menu key: focus: → data-highlighted:, data-disabled: → aria-disabled:,
// data-open: / data-popup-open: → aria-expanded:. Placement and open/close
// classes left out.
export const menubar: ScMenubarStyles = {
  bar: 'flex h-9 items-center rounded-lg border p-1',
  trigger:
    'flex items-center rounded-[calc(var(--radius-md)-2px)] px-2 py-[calc(--spacing(0.85))] text-xs/relaxed font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted',
  menu: {
    popup:
      'overflow-x-hidden overflow-y-auto outline-none min-w-32 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100',
    subPopup:
      'min-w-32 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100',
    label: 'px-2 py-1.5 text-xs text-muted-foreground data-inset:ps-7.5',
    item: "group/menu-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive min-h-7 gap-2 rounded-md px-2 py-1 text-xs/relaxed data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 data-[variant=destructive]:*:[svg]:text-destructive!",
    subTrigger:
      "flex cursor-default items-center outline-hidden select-none aria-expanded:bg-accent aria-expanded:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-7 gap-2 rounded-md px-2 py-1 text-xs data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7.5 [&_svg:not([class*='size-'])]:size-3.5",
    checkboxItem:
      'relative flex min-h-7 cursor-default items-center gap-2 rounded-md py-1.5 pe-2 ps-7.5 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    radioItem:
      "relative flex min-h-7 cursor-default items-center gap-2 rounded-md py-1.5 pe-2 ps-7.5 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    indicator:
      "pointer-events-none absolute start-2 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
    separator: '-mx-1 my-1 h-px bg-border/50',
    shortcut:
      'group-data-highlighted/menu-item:text-accent-foreground ms-auto text-[0.625rem] tracking-widest text-muted-foreground',
  },
};
