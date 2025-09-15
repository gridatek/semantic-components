import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const inputNumberControlsVariants = cva(
  'absolute right-0 top-0 h-full flex flex-col border-l border-input',
  {
    variants: {
      variant: {
        default: '',
        outlined: 'border border-input rounded-r-md',
      },
      size: {
        default: '',
        sm: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type InputNumberControlsVariants = VariantProps<typeof inputNumberControlsVariants>;

@Component({
  selector: 'div[sc-input-number-controls]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputNumberControls {
  readonly variant = input<InputNumberControlsVariants['variant']>('default');
  readonly size = input<InputNumberControlsVariants['size']>('default');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      inputNumberControlsVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.classInput(),
    ),
  );
}
