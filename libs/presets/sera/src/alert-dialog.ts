import type { ScAlertDialogStyles } from '@semantic-components/presets';

// shadcn's alert dialog in sera (shadcn-reference/presets/sera/alert-dialog.tsx),
// without its placement and animation classes: the CDK overlay centers it,
// Angular animates it (animate.enter / animate.leave).
export const alertDialog: ScAlertDialogStyles = {
  content:
    'group/alert-dialog-content grid w-full gap-6 rounded-none bg-popover p-6 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md',
  header:
    'grid grid-rows-[auto_1fr] place-items-center gap-2 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
  footer:
    'flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
  media:
    "mb-2 inline-flex size-16 items-center justify-center rounded-none bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
  title:
    'font-heading text-lg font-semibold tracking-wider uppercase sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
  description:
    'mt-0.5 text-sm leading-relaxed text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
};
