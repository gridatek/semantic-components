import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { inputStyles } from '../input/input';

@Directive({
  selector: '[scMultiselectDisplayValue]',
  host: {
    'data-slot': 'control',
    '[class]': 'class()',
  },
})
export class ScMultiselectDisplayValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      inputStyles,
      'pointer-events-none flex items-center gap-1.5 truncate [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
