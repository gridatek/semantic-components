import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scComboboxItemLabel]',
  host: {
    'data-slot': 'combobox-item-label',
    '[class]': 'class()',
  },
})
export class ScComboboxItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
