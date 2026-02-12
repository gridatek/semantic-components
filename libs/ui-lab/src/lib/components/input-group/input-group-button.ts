import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { buttonVariants, type ScButtonVariants } from '../button/button';

const inputGroupButtonVariants = cva(
  'gap-2 text-sm shadow-none flex items-center',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

export type ScInputGroupButtonVariants = VariantProps<
  typeof inputGroupButtonVariants
>;

@Directive({
  selector: 'button[sc-input-group-button]',
  host: {
    'data-slot': 'input-group-button',
    type: 'button',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScInputGroupButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScInputGroupButtonVariants['size']>('xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: null }),
      inputGroupButtonVariants({ size: this.size() }),
      this.classInput(),
    ),
  );
}
