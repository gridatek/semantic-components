import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field/field';
import { inputStyles } from '../input/input';
import { SC_PASSWORD_FIELD } from './password-field';

@Directive({
  selector: 'input[scPasswordFieldInput]',
  host: {
    'data-slot': 'password-field-input',
    '[id]': 'field.id()',
    '[type]': 'passwordField.visible() ? "text" : "password"',
    '[class]': 'class()',
    '[value]': 'passwordField.value()',
    '[disabled]': 'passwordField.disabled()',
    '[attr.aria-invalid]': 'passwordField.invalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[readonly]': 'readonly()',
    '[placeholder]': 'placeholder()',
    '[autocomplete]': 'autocomplete()',
    '(input)': 'onInput($event)',
  },
})
export class ScPasswordFieldInput {
  readonly field = inject(SC_FIELD);
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly placeholder = input<string>('');
  readonly readonly = input<boolean>(false);
  readonly autocomplete = input<string>('current-password');

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field.descriptionIds().join(' ') ||
      null,
  );

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.passwordField.setValue(input.value);
  }
}
