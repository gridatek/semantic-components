import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scComboboxTriggerIcon]',
  host: {
    'data-slot': 'combobox-trigger-icon',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScComboboxTriggerIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute right-2 size-4 shrink-0 opacity-50',
      this.classInput(),
    ),
  );
}
