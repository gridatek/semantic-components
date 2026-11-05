import type { ScMenuStyles } from '@semantic-components/presets';

// shadcn's context menu in mira (shadcn-reference/presets/mira/context-menu.tsx):
// the Menu's parts in a context menu. In our states, as the menu key:
// focus: → data-highlighted:, data-disabled: → aria-disabled:. Placement and
// open/close classes left out: the CDK places the menu, Angular animates it.
export const contextMenu: ScMenuStyles = {
  popup:
    'min-w-32 overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none',
  subPopup:
    'min-w-32 overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none shadow-lg',
  label: 'px-2 py-1.5 text-xs text-muted-foreground data-inset:ps-7.5',
  item: "group/menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-md px-2 py-1 text-xs/relaxed outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 data-[variant=destructive]:*:[svg]:text-destructive",
  subTrigger:
    "flex min-h-7 cursor-default items-center gap-2 rounded-md px-2 py-1 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  checkboxItem:
    "relative flex min-h-7 cursor-default items-center gap-2 rounded-md py-1.5 pe-8 ps-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  radioItem:
    "relative flex min-h-7 cursor-default items-center gap-2 rounded-md py-1.5 pe-8 ps-2 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  indicator:
    'pointer-events-none absolute end-2 flex items-center justify-center',
  separator: '-mx-1 my-1 h-px bg-border/50',
  shortcut:
    'ms-auto text-[0.625rem] tracking-widest text-muted-foreground group-data-highlighted/menu-item:text-accent-foreground',
};
