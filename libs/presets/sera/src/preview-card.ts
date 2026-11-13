import type { ScPreviewCardStyles } from '@semantic-components/presets';

// shadcn's hover card in sera (shadcn-reference/presets/sera/hover-card.tsx). Its
// open/close animation classes are Angular's animate.enter / animate.leave here.
export const previewCard: ScPreviewCardStyles = {
  popup:
    'z-50 w-72 origin-(--transform-origin) bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
};
