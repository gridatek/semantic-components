import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_FIELD } from './password-field';

@Directive({
  selector: '[scPasswordFieldInputGroup]',
  host: {
    'data-slot': 'password-field-input-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'passwordField.disabled() || null',
  },
})
export class ScPasswordFieldInputGroup {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative', 'data-disabled:opacity-50', this.classInput()),
  );
}
