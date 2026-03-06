import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scCommandInputGroup]',
  host: {
    'data-slot': 'command-input-group',
    '[class]': 'class()',
  },
})
export class ScCommandInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center border-b px-3', this.classInput()),
  );
}
