import type { ScEmptyStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's empty in sera (shadcn-reference/presets/sera/empty.tsx).
export const empty: ScEmptyStyles = {
  root: 'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 border-dashed p-12 text-center text-balance',
  header: 'flex max-w-sm flex-col items-center gap-2',
  media: cva(
    'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: 'bg-transparent',
          icon: 'flex size-10 shrink-0 items-center justify-center rounded-none bg-muted text-foreground [&_svg:not([class*=size-])]:size-5',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  title: 'font-heading text-lg font-semibold tracking-wider uppercase',
  description:
    'mt-0.5 text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  body: 'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
};
