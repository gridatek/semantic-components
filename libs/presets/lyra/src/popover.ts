import type { ScPopoverStyles } from '@semantic-components/presets';

// shadcn's popover in lyra (shadcn-reference/presets/lyra/popover.tsx). Its
// open/close animation classes are Angular's animate.enter / animate.leave here.
export const popover: ScPopoverStyles = {
  popup:
    'z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-none bg-popover p-2.5 text-xs text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  header: 'flex flex-col gap-1 text-xs',
  title: 'text-sm font-medium',
  description: 'text-xs/relaxed text-muted-foreground',
};
