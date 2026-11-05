import type { ScDialogStyles } from '@semantic-components/presets';

// shadcn's dialog in rhea (shadcn-reference/presets/rhea/dialog.tsx). Its
// placement and open/close classes are left out: the CDK centres the dialog,
// Angular animates it. Its overlay is the shared backdrop key.
export const dialog: ScDialogStyles = {
  content:
    'grid w-full max-w-[calc(100%-2rem)] gap-6 rounded-[min(var(--radius-4xl),24px)] bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none sm:max-w-md dark:ring-foreground/10',
  close:
    '[&>[data-slot=dialog-close]]:absolute [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:end-4 [&>[data-slot=dialog-close]]:bg-secondary',
  header: 'flex flex-col gap-1.5',
  footer: 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
  title: 'font-heading text-base leading-none font-medium',
  description:
    'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
};
