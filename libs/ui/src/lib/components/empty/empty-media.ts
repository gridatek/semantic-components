import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

export const emptyMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ScEmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;

@Directive({
  selector: 'div[scEmptyMedia]',
  host: {
    'data-slot': 'empty-icon',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScEmptyMedia {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScEmptyMediaVariants['variant']>('default');

  protected readonly class = computed(() =>
    cn(emptyMediaVariants({ variant: this.variant() }), this.classInput()),
  );
}
