import type { ScMenuStyles } from '@semantic-components/presets';

// shadcn's context menu in sera (shadcn-reference/presets/sera/context-menu.tsx):
// the Menu's parts in a context menu. In our states, as the menu key:
// focus: → data-highlighted:, data-disabled: → aria-disabled:. Placement and
// open/close classes left out: the CDK places the menu, Angular animates it.
export const contextMenu: ScMenuStyles = {
  popup:
    'min-w-48 overflow-x-hidden overflow-y-auto rounded-none bg-popover p-1.5 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none',
  subPopup:
    'min-w-48 overflow-x-hidden overflow-y-auto rounded-none bg-popover p-1.5 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none shadow-md',
  label:
    'px-3 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase data-inset:ps-9.5',
  item: "group/menu-item relative flex cursor-default items-center gap-2.5 rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 data-highlighted:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
  subTrigger:
    "flex cursor-default items-center rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  checkboxItem:
    "relative flex cursor-default items-center gap-2.5 rounded-none py-2 pe-8 ps-3 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  radioItem:
    "relative flex cursor-default items-center gap-2.5 rounded-none py-2 pe-8 ps-3 text-xs font-medium tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  indicator: 'pointer-events-none absolute end-2',
  separator: '-mx-1.5 my-1.5 h-px bg-border/50',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/menu-item:text-accent-foreground',
};
