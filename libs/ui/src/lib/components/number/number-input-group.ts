import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonGroupVariants } from '../button-group';
import { SC_NUMBER } from './number';

@Directive({
  selector: '[scNumberGroup]',
  host: {
    'data-slot': 'number-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'number.disabled() || null',
  },
})
export class ScNumberInputGroup {
  readonly number = inject(SC_NUMBER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonGroupVariants({ orientation: 'horizontal' }),
      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
