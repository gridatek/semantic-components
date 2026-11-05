import type { ScDialogStyles } from '@semantic-components/presets';

// shadcn's dialog in sera (shadcn-reference/presets/sera/dialog.tsx). Its
// placement and open/close classes are left out: the CDK centres the dialog,
// Angular animates it. Its overlay is the shared backdrop key.
export const dialog: ScDialogStyles = {
  content:
    'grid w-full max-w-[calc(100%-2rem)] gap-6 rounded-none bg-popover p-6 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md',
  close:
    '[&>[data-slot=dialog-close]]:absolute [&>[data-slot=dialog-close]]:top-5 [&>[data-slot=dialog-close]]:end-5 [&>[data-slot=dialog-close]]:bg-secondary',
  header: 'flex flex-col gap-2',
  footer: 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
  title:
    'font-heading text-lg leading-none font-semibold tracking-wider uppercase',
  description:
    'mt-0.5 text-sm leading-relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
};
