import type { ScAlertStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's alert in luma (shadcn-reference/presets/luma/alert.tsx).
export const alert: ScAlertStyles = {
  alert: cva(
    "group/alert relative grid w-full gap-0.5 rounded-2xl border px-4 py-3 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
    {
      variants: {
        variant: {
          default: 'bg-card text-card-foreground',
          destructive:
            'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current',
          // Not shadcn's: the toast's colours (the theme's --success, --warning).
          success:
            'bg-card text-success *:data-[slot=alert-description]:text-success *:[svg]:text-current',
          warning:
            'bg-card text-warning *:data-[slot=alert-description]:text-warning *:[svg]:text-current',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  ),
  title:
    'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
  description:
    'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
  action: 'absolute top-2.5 end-3',
};
