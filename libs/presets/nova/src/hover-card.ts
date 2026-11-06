import type { ScHoverCardStyles } from '@semantic-components/presets';

// shadcn's hover card in nova (shadcn-reference/presets/nova/hover-card.tsx). Its
// open/close animation classes are Angular's animate.enter / animate.leave here.
export const hoverCard: ScHoverCardStyles = {
  popup:
    'z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
};
