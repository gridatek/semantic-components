import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

export const itemMediaVariants = cva(
  'gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start flex shrink-0 items-center justify-center [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ScItemMediaVariants = VariantProps<typeof itemMediaVariants>;

@Directive({
  selector: 'div[scItemMedia]',
  host: {
    'data-slot': 'item-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScItemMedia {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScItemMediaVariants['variant']>('default');

  protected readonly class = computed(() =>
    cn(itemMediaVariants({ variant: this.variant() }), this.classInput()),
  );
}
