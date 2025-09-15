import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const inputNumberButtonVariants = cva(
  'flex-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      position: {
        top: 'border-b border-input rounded-tr-md',
        bottom: 'rounded-br-md',
        single: 'rounded-r-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'single',
    },
  },
);

export type InputNumberButtonVariants = VariantProps<typeof inputNumberButtonVariants>;

@Component({
  selector: 'button[sc-input-number-button]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    type: 'button',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputNumberButton {
  readonly variant = input<InputNumberButtonVariants['variant']>('default');
  readonly position = input<InputNumberButtonVariants['position']>('single');
  readonly disabled = input<boolean>(false);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      inputNumberButtonVariants({
        variant: this.variant(),
        position: this.position(),
      }),
      this.classInput(),
    ),
  );
}
