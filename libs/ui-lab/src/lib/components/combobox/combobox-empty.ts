import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-combobox-empty]',
  host: {
    'data-slot': 'combobox-empty',
    '[class]': 'class()',
  },
})
export class ScComboboxEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('py-6 text-center text-sm text-muted-foreground', this.classInput()),
  );
}
