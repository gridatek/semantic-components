import type { ScCommandStyles } from '@semantic-components/presets';

// shadcn's command in lyra (shadcn-reference/presets/lyra/command.tsx), adapted: the group
// heading's classes are the label's own; the dialog's placement is the CDK's (its top-1/3 left
// out), the rest important over scDialog's; the item's in-data-[slot=dialog-content]: reads our
// command-dialog; the search icon's classes reach your SVG through the addon.
export const command: ScCommandStyles = {
  root: 'flex size-full flex-col overflow-hidden rounded-none bg-popover text-popover-foreground',
  dialog: 'overflow-hidden! rounded-none! p-0!',
  inputWrapper: 'border-b pb-0',
  inputGroup:
    'h-8 border-none border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:ps-2!',
  inputIcon:
    "[&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:opacity-50",
  input:
    'w-full text-xs outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  list: 'no-scrollbar max-h-72 scroll-py-0 overflow-x-hidden overflow-y-auto outline-none',
  empty: 'py-6 text-center text-xs',
  group: 'overflow-hidden text-foreground',
  groupLabel: 'px-2 py-1.5 text-xs text-muted-foreground',
  item: "group/command-item relative flex cursor-default items-center gap-2 rounded-none px-2 py-2 text-xs outline-hidden select-none in-data-[slot=command-dialog]:rounded-none! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
  separator: '-mx-1 h-px bg-border',
  shortcut:
    'ms-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground',
};
