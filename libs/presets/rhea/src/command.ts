import type { ScCommandStyles } from '@semantic-components/presets';

// shadcn's command in rhea (shadcn-reference/presets/rhea/command.tsx), adapted: the group
// heading's classes are the label's own; the dialog's placement is the CDK's (its top-1/3 left
// out), the rest important over scDialog's; the item's in-data-[slot=dialog-content]: reads our
// command-dialog; the search icon's classes reach your SVG through the addon.
export const command: ScCommandStyles = {
  root: 'flex size-full flex-col overflow-hidden rounded-3xl bg-popover p-1 text-popover-foreground',
  dialog: 'overflow-hidden! rounded-3xl! p-0!',
  inputWrapper: 'p-1 pb-0',
  inputGroup: 'h-8! bg-input/50',
  inputIcon:
    "[&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:opacity-50",
  input:
    'w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  list: 'max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
  empty: 'py-6 text-center text-sm',
  group: 'overflow-hidden p-1 text-foreground',
  groupLabel: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
  item: "group/command-item relative flex min-h-7 cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=command-dialog]:rounded-2xl data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
  separator: 'my-1 h-px bg-border/50',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground',
};
