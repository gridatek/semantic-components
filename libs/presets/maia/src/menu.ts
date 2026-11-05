import type { ScMenuStyles } from '@semantic-components/presets';

// shadcn's dropdown menu in maia (shadcn-reference/presets/maia/dropdown-menu.tsx),
// in our states: focus: → data-highlighted: (a pointer open highlights
// nothing), data-disabled: → aria-disabled:, an open submenu → aria-expanded:.
// Its placement and open/close classes are left out: the CDK places the menu,
// Angular animates it.
export const menu: ScMenuStyles = {
  popup:
    'min-w-48 overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none dark:ring-foreground/10',
  subPopup:
    'min-w-36 rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100',
  label: 'px-3 py-2.5 text-xs text-muted-foreground data-inset:ps-9.5',
  item: "group/menu-item relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
  subTrigger:
    "flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-9.5 aria-expanded:bg-accent aria-expanded:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  checkboxItem:
    "relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pe-8 ps-3 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  radioItem:
    "relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pe-8 ps-3 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  indicator:
    'pointer-events-none absolute end-2 flex items-center justify-center',
  separator: '-mx-1 my-1 h-px bg-border/50',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/menu-item:text-accent-foreground',
};
