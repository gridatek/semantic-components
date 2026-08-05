import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
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
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[disabled]': 'disabled()',
    '[readonly]': 'readonly()',
    '[placeholder]': 'placeholder()',
    '[autocomplete]': 'autocomplete()',
  },
})
export class ScPasswordInput {
  readonly field = inject(SC_FIELD, { optional: true });
  readonly password = inject(SC_PASSWORD_PROVIDER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly placeholder = input<string>('');
  readonly readonly = input<boolean>(false);
  readonly autocomplete = input<'current-password' | 'new-password' | 'off'>(
    'current-password',
  );

  // Bound automatically by the Field directive (FormUiControl contract).
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  // Do not surface invalid until the control has been touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));
}
