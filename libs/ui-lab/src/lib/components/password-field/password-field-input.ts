import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { SC_PASSWORD_FIELD } from './password-field';

@Component({
  selector: 'input[sc-password-field-input]',
  template: ``,
  host: {
    'data-slot': 'password-field-input',
    '[id]': 'field.id()',
    '[type]': 'passwordField.visible() ? "text" : "password"',
    '[class]': 'class()',
    '[value]': 'passwordField.value()',
    '[disabled]': 'passwordField.disabled()',
    '[attr.aria-invalid]': 'passwordField.invalid()',
    '[readonly]': 'readonly()',
    '[placeholder]': 'placeholder()',
    '[autocomplete]': 'autocomplete()',
    '(input)': 'onInput($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordFieldInput {
  readonly field = inject(SC_FIELD);
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('');
  readonly readonly = input<boolean>(false);
  readonly autocomplete = input<string>('current-password');

  protected readonly class = computed(() =>
    cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.passwordField.setValue(input.value);
  }
}
