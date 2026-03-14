import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_PASSWORD_FIELD } from './password-field';

@Directive({
  selector: 'button[scPasswordFieldToggle]',
  host: {
    'data-slot': 'password-field-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'passwordField.disabled()',
    '[attr.aria-label]':
      'passwordField.visible() ? "Hide password" : "Show password"',
    '[attr.aria-pressed]': 'passwordField.visible()',
    '(click)': 'onClick()',
  },
})
export class ScPasswordFieldToggle {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.passwordField.toggle();
  }
}
