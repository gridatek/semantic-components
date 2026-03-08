import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scRadioGroup]',
  host: {
    'data-slot': 'radio-group',
    role: 'radiogroup',
    '[attr.aria-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScRadioGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn('grid gap-2', this.classInput()),
  );
}
