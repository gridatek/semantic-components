import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

export const itemVariants = cva(
  '[a]:hover:bg-muted rounded-lg border text-sm w-full group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50 border-transparent',
      },
      size: {
        default: 'gap-2.5 px-3 py-2.5',
        sm: 'gap-2.5 px-3 py-2.5',
        xs: 'gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ScItemVariants = VariantProps<typeof itemVariants>;

@Directive({
  selector: 'div[sc-item]',
  host: {
    'data-slot': 'item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScItemVariants['variant']>('default');
  readonly size = input<ScItemVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      itemVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
