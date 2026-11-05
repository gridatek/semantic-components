import type { ScEmptyStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's empty in mira (shadcn-reference/presets/mira/empty.tsx).
export const empty: ScEmptyStyles = {
  root: 'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance',
  header: 'flex max-w-sm flex-col items-center gap-1',
  media: cva(
    'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: 'bg-transparent',
          icon: 'flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground [&_svg:not([class*=size-])]:size-4',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  title: 'font-heading text-sm font-medium tracking-tight',
  description:
    'text-xs/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  body: 'flex w-full max-w-sm min-w-0 flex-col items-center gap-2 text-xs/relaxed text-balance',
};
