import { Directive, computed, input, model } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scComboboxSearchInput]',
  host: {
    '[class]': 'class()',
    '[value]': 'value()',
    '(input)': 'onInput($event)',
  },
})
export class ScComboboxSearchInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<string>('');

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected readonly class = computed(() => cn('', this.classInput()));
}
