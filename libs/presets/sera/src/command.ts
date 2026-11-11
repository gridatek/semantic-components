import type { ScCommandStyles } from '@semantic-components/presets';

// shadcn's command in sera (shadcn-reference/presets/sera/command.tsx), adapted: the group
// heading's classes are the label's own; the dialog's placement is the CDK's (its top-1/3 left
// out), the rest important over scDialog's; the item's in-data-[slot=dialog-content]: reads our
// command-dialog; the search icon's classes reach your SVG through the addon.
export const command: ScCommandStyles = {
  root: 'flex size-full flex-col overflow-hidden bg-popover text-popover-foreground',
  dialog: 'overflow-hidden! p-0!',
  inputWrapper: 'p-1',
  inputGroup: 'border-transparent border-b-input bg-transparent px-3',
  inputIcon:
    "[&>svg:not([class*='size-'])]:size-3.5 [&>svg]:shrink-0 [&>svg]:opacity-50",
  input:
    'w-full px-2 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  list: 'no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
  empty: 'py-6 text-center text-sm',
  group: 'overflow-hidden p-1.5 text-foreground',
  groupLabel:
    'px-3 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase',
  item: "group/command-item relative flex cursor-default items-center gap-2 rounded-none px-3 py-2 text-sm outline-hidden select-none in-data-[slot=command-dialog]:rounded-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 data-selected:*:[svg]:text-foreground",
  separator: '-mx-1.5 my-1.5 h-px bg-border/50',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground',
};
