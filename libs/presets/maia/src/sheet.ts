import type { ScSheetStyles } from '@semantic-components/presets';

// shadcn's sheet in maia (shadcn-reference/presets/maia/sheet.tsx). Its
// transitions kept: data-starting-style is `starting:`, data-ending-style
// `[&.sc-leaving]:` (the class the panel's animate.leave adds).
export const sheet: ScSheetStyles = {
  content:
    'fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out [&.sc-leaving]:opacity-0 starting:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:[&.sc-leaving]:translate-y-[2.5rem] data-[side=bottom]:starting:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-e data-[side=left]:[&.sc-leaving]:translate-x-[-2.5rem] rtl:data-[side=left]:[&.sc-leaving]:-translate-x-[-2.5rem] data-[side=left]:starting:translate-x-[-2.5rem] rtl:data-[side=left]:starting:-translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-s data-[side=right]:[&.sc-leaving]:translate-x-[2.5rem] rtl:data-[side=right]:[&.sc-leaving]:-translate-x-[2.5rem] data-[side=right]:starting:translate-x-[2.5rem] rtl:data-[side=right]:starting:-translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:[&.sc-leaving]:translate-y-[-2.5rem] data-[side=top]:starting:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
  close:
    '[&>[data-slot=sheet-close]]:absolute [&>[data-slot=sheet-close]]:top-4 [&>[data-slot=sheet-close]]:end-4',
  header: 'flex flex-col gap-1.5 p-6',
  footer: 'mt-auto flex flex-col gap-2 p-6',
  title: 'font-heading text-base font-medium text-foreground',
  description: 'text-sm text-muted-foreground',
};
