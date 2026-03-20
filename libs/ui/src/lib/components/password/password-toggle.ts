import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button/button';
import { SC_PASSWORD } from './password';

@Directive({
  selector: 'button[scPasswordToggle]',
  host: {
    'data-slot': 'password-toggle',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]':
      'password.visible() ? "Hide password" : "Show password"',
    '[attr.aria-pressed]': 'password.visible()',
    '(click)': 'onClick()',
  },
})
export class ScPasswordToggle {
  readonly password = inject(SC_PASSWORD);
  readonly classInput = input<string>('', { alias: 'class' });

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
