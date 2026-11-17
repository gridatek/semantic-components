import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'kbd[scKbdGroup]',
  host: {
    'data-slot': 'kbd-group',
    '[class]': 'class()',
  },
})
export class ScKbdGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('gap-1 inline-flex items-center', this.classInput()),
  );
}
