import type { ScMenuStyles } from '@semantic-components/presets';

// shadcn's dropdown menu in vega (shadcn-reference/presets/vega/dropdown-menu.tsx),
// in our states: focus: → data-highlighted: (a pointer open highlights
// nothing), data-disabled: → aria-disabled:, an open submenu → aria-expanded:.
// Its placement and open/close classes are left out: the CDK places the menu,
// Angular animates it.
export const menu: ScMenuStyles = {
  popup:
    'min-w-32 overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none',
  subPopup:
    'min-w-[96px] rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100',
  label:
    'px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:ps-8',
  item: "group/menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
  subTrigger:
    "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-8 aria-expanded:bg-accent aria-expanded:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  checkboxItem:
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  radioItem:
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  indicator:
    'pointer-events-none absolute end-2 flex items-center justify-center',
  separator: '-mx-1 my-1 h-px bg-border',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/menu-item:text-accent-foreground',
};
