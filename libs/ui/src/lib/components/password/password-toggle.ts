import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
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
  readonly classInput = input<string>('', { alias: 'class' });

  // The toggle is a sibling of the input, so a FormField on the input was
  // never in its injector chain and this always resolved to false. Take it
  // as an input until the provider can publish the password field state.
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

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
