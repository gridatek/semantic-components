import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'input[sc-input-password-field]',
  imports: [],
  template: ``,
  host: {
    '[id]': 'id',
    '[type]': 'isVisible() ? "text" : "password"',
    '[attr.aria-invalid]': 'strengthScore() < 4',
    placeholder: 'Password',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordField {
  protected readonly id = inject(_IdGenerator).getId('sc-input-password-field-');

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly ariaDescribedby = input<string>('');
  readonly isVisible = input<boolean>(false);
  readonly strengthScore = input<number>(0);

  readonly passwordChange = output<string>();

  protected readonly class = computed(() =>
    cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pe-9',
      this.classInput(),
    ),
  );

  readonly password = signal<string>('');

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.password.set(value);
    this.passwordChange.emit(value);
  }
}
