import { Directive, computed, inject, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field/field';
import { inputStyles } from '../input/input';
import { SC_PASSWORD_PROVIDER } from './password-provider';

@Directive({
  selector: 'input[scPasswordInput]',
  host: {
    '[id]': 'field?.id()',
    '[type]': 'password.visible() ? "text" : "password"',
    '[class]': 'class()',
    '[attr.aria-invalid]': 'invalid() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[disabled]': 'disabled()',
    '[readonly]': 'readonly()',
    '[placeholder]': 'placeholder()',
    '[autocomplete]': 'autocomplete()',
  },
})
export class ScPasswordInput {
  readonly field = inject(SC_FIELD, { optional: true });
  private readonly formField = inject(FormField, { optional: true });
  readonly password = inject(SC_PASSWORD_PROVIDER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly placeholder = input<string>('');
  readonly readonly = input<boolean>(false);
  readonly autocomplete = input<'current-password' | 'new-password' | 'off'>(
    'current-password',
  );

  readonly invalid = computed(
    () =>
      (this.formField?.state().touched() &&
        this.formField?.state().invalid()) ??
      false,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  readonly disabled = computed(
    () => this.formField?.state().disabled() ?? false,
  );

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));
}
