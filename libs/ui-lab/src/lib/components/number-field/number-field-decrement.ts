import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_NUMBER_FIELD } from './number-field';

@Directive({
  selector: 'button[scNumberFieldDecrement]',
  host: {
    'data-slot': 'number-field-decrement',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!numberField.canDecrement()',
    '[attr.aria-label]': '"Decrease value"',
    '(click)': 'onClick()',
  },
})
export class ScNumberFieldDecrement {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.numberField.decrement();
  }
}
