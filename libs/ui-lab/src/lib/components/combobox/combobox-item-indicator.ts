import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-combobox-item-indicator]',
  host: {
    'data-slot': 'combobox-item-indicator',
    '[class]': 'class()',
  },
})
export class ScComboboxItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute right-2 size-4 opacity-0 [[aria-selected=true]>&]:opacity-100',
      this.classInput(),
    ),
  );
}
