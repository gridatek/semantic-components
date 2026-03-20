import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ul[scPasswordRequirements]',
  host: {
    'data-slot': 'password-requirements',
    '[class]': 'class()',
  },
})
export class ScPasswordRequirements {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-2 space-y-1 text-xs', this.classInput()),
  );
}
