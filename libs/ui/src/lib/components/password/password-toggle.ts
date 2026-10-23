import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
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
  private readonly buttonStyles = injectPreset().button;

  readonly password = inject(SC_PASSWORD_PROVIDER);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  // The field lives on the input, a sibling, so the provider reads it for us.
  readonly disabled = computed(
    () => this.disabledInput() || this.password.disabled(),
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: 'ghost', size: 'icon-sm' }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.password.toggle();
  }
}
