import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMultiselectDisplayValue]',
  host: {
    'data-slot': 'multiselect-display-value',
    '[class]': 'class()',
  },
})
export class ScMultiselectDisplayValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none flex flex-1 items-center gap-1.5 truncate [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
