import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[sc-opt-field-slot-char]',
  host: {
    'data-slot': 'opt-field-slot-char',
    '[class]': 'class()',
    '[textContent]': 'char()',
  },
})
export class ScOptFieldSlotChar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly char = input<string>('');

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}
