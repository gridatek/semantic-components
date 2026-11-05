import type { ScMenuStyles } from '@semantic-components/presets';

// shadcn's context menu in lyra (shadcn-reference/presets/lyra/context-menu.tsx):
// the Menu's parts in a context menu. In our states, as the menu key:
// focus: → data-highlighted:, data-disabled: → aria-disabled:. Placement and
// open/close classes left out: the CDK places the menu, Angular animates it.
export const contextMenu: ScMenuStyles = {
  popup:
    'min-w-36 overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none',
  subPopup:
    'min-w-36 overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none shadow-lg',
  label: 'px-2 py-2 text-xs text-muted-foreground data-inset:ps-7',
  item: "group/menu-item relative flex cursor-default items-center gap-2 rounded-none px-2 py-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-highlighted:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
  subTrigger:
    "flex cursor-default items-center gap-2 rounded-none px-2 py-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  checkboxItem:
    "relative flex cursor-default items-center gap-2 rounded-none py-2 pe-8 ps-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  radioItem:
    "relative flex cursor-default items-center gap-2 rounded-none py-2 pe-8 ps-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  indicator: 'pointer-events-none absolute end-2',
  separator: '-mx-1 h-px bg-border',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/menu-item:text-accent-foreground',
};
