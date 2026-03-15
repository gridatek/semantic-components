import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER_FIELD } from './number-field';

@Directive({
  selector: 'button[scNumberFieldIncrement]',
  host: {
    'data-slot': 'number-field-increment',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!numberField.canIncrement()',
    '[attr.aria-label]': '"Increase value"',
    '(click)': 'onClick()',
  },
})
export class ScNumberFieldIncrement {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.numberField.increment();
  }
}
