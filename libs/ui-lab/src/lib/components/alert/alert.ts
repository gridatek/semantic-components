import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  "grid gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 w-full relative group/alert",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ScAlertVariants = VariantProps<typeof alertVariants>;

@Directive({
  selector: '[sc-alert]',
  host: {
    'data-slot': 'alert',
    role: 'alert',
    '[class]': 'class()',
  },
})
export class ScAlert {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScAlertVariants['variant']>('default');

  protected readonly class = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.classInput()),
  );
}
