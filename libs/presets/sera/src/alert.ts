import type { ScAlertStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's alert in sera (shadcn-reference/presets/sera/alert.tsx).
export const alert: ScAlertStyles = {
  alert: cva(
    "group/alert relative grid w-full gap-1 border bg-background px-4 py-3 text-start text-sm after:absolute after:-inset-y-px after:-start-px after:w-0.5 has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
    {
      variants: {
        variant: {
          default: 'bg-card text-card-foreground after:bg-foreground',
          destructive:
            'bg-card text-destructive after:bg-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  ),
  title:
    'text-sm font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
  description:
    'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
  action: 'absolute top-2.5 end-3',
};
