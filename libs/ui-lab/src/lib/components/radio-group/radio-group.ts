import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scRadioGroup]',
  host: {
    'data-slot': 'radio-group',
    role: 'radiogroup',
    '[class]': 'class()',
  },
})
export class ScRadioGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-2', this.classInput()),
  );
}
