import { Directive, computed, inject, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { buttonVariants } from '../button/button';
import { SC_PASSWORD_PROVIDER } from './password-provider';

@Directive({
  selector: 'button[scPasswordToggle]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'password.visible()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScPasswordToggle {
  readonly password = inject(SC_PASSWORD_PROVIDER);
  private readonly formField = inject(FormField, { optional: true });
  readonly classInput = input<string>('', { alias: 'class' });

  readonly disabled = computed(
    () => this.formField?.state().disabled() ?? false,
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.password.toggle();
  }
}
