import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonGroupVariants } from '../button-group';
import { SC_NUMBER_FIELD } from './number-field';

@Directive({
  selector: '[scNumberFieldGroup]',
  host: {
    'data-slot': 'number-field-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'numberField.disabled() || null',
  },
})
export class ScNumberFieldInputGroup {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonGroupVariants({ orientation: 'horizontal' }),
      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
