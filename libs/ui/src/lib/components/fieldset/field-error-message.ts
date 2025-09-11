import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { cva } from 'class-variance-authority';

const fieldErrorMessageVariants = cva('text-sm text-destructive mt-1', {
  variants: {
    variant: {
      default: '',
      subtle: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

@Component({
  selector: 'div[sc-field-error-message]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'error-message',
    '[class]': 'class()',
    role: 'alert',
    'aria-live': 'polite',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFieldErrorMessage {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly variant = input<'default' | 'subtle'>('default');

  protected readonly class = computed(() =>
    cn(
      fieldErrorMessageVariants({
        variant: this.variant(),
      }),
      this.classInput(),
    ),
  );
}
