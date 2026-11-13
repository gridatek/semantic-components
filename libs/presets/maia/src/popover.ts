import type { ScPopoverStyles } from '@semantic-components/presets';

// shadcn's popover in maia (shadcn-reference/presets/maia/popover.tsx). Its
// open/close animation classes are Angular's animate.enter / animate.leave here.
export const popover: ScPopoverStyles = {
  popup:
    'z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-2xl bg-popover p-4 text-sm text-popover-foreground shadow-2xl ring-1 ring-foreground/5 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  header: 'flex flex-col gap-1 text-sm',
  title: 'text-base font-medium',
  description: 'text-muted-foreground',
};
