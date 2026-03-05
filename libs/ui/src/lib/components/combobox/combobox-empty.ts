import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxEmpty]',
  host: {
    'data-slot': 'combobox-empty',
    '[class]': 'class()',
  },
})
export class ScComboboxEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground p-4 text-center text-sm', this.classInput()),
  );
}
