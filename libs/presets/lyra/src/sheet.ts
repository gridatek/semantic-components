import type { ScSheetStyles } from '@semantic-components/presets';

// shadcn's sheet in lyra (shadcn-reference/presets/lyra/sheet.tsx). Its
// slide and fade are the panel's animate.enter / animate.leave (tw-animate):
// each side's slide-in-from-*-10 / slide-out-to-*-10.
export const sheet: ScSheetStyles = {
  content:
    'fixed z-50 flex flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-e data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-s data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-[side=top]:slide-in-from-top-10 data-[side=top]:slide-out-to-top-10 data-[side=right]:slide-in-from-right-10 data-[side=right]:slide-out-to-right-10 data-[side=bottom]:slide-in-from-bottom-10 data-[side=bottom]:slide-out-to-bottom-10 data-[side=left]:slide-in-from-left-10 data-[side=left]:slide-out-to-left-10',
  close:
    '[&>[data-slot=sheet-close]]:absolute [&>[data-slot=sheet-close]]:top-3 [&>[data-slot=sheet-close]]:end-3',
  header: 'flex flex-col gap-0.5 p-4',
  footer: 'mt-auto flex flex-col gap-2 p-4',
  title: 'font-heading text-sm font-medium text-foreground',
  description: 'text-xs/relaxed text-muted-foreground',
};
