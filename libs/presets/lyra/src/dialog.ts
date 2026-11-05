import type { ScDialogStyles } from '@semantic-components/presets';

// shadcn's dialog in lyra (shadcn-reference/presets/lyra/dialog.tsx). Its
// placement and open/close classes are left out: the CDK centres the dialog,
// Angular animates it. Its overlay is the shared backdrop key.
export const dialog: ScDialogStyles = {
  content:
    'grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-none bg-popover p-4 text-xs/relaxed text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm',
  close:
    '[&>[data-slot=dialog-close]]:absolute [&>[data-slot=dialog-close]]:top-2 [&>[data-slot=dialog-close]]:end-2',
  header: 'flex flex-col gap-1 text-start',
  footer: 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
  title: 'font-heading text-sm font-medium',
  description:
    'text-xs/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
};
