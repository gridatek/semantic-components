import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-field-separator]',
  host: {
    'data-slot': 'field-separator',
    '[class]': 'class()',
  },
})
export class ScFieldSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      '-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative',
      this.classInput(),
    ),
  );
}
