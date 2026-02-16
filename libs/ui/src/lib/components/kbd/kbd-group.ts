import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'kbd[sc-kbd-group]',
  host: {
    'data-slot': 'kbd-group',
    '[class]': 'class()',
  },
})
export class ScKbdGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-1 inline-flex items-center', this.classInput()),
  );
}
