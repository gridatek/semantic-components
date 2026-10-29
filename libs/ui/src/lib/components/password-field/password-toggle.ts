import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import type { ScButtonVariants } from '../button/button';
import { ScPasswordField } from './password-field';

/**
 * Shows or hides the password: pressed while shown (`aria-pressed`), naming
 * the input it controls. A click leaves the caret in the input. Your icons
 * and its name inside — `#password="scPasswordField"`, then
 * `password.visible()` to switch the icon.
 */
@Directive({
  selector: 'button[scPasswordToggle]',
  host: {
    'data-slot': 'password-toggle',
    type: 'button',
    '[attr.aria-pressed]': 'password.visible()',
    '[attr.aria-controls]': 'password.field.id()',
    '[disabled]': 'password.disabled()',
    '[class]': 'class()',
    '(pointerdown)': 'keepFocus($event)',
    '(click)': 'password.toggle()',
  },
})
export class ScPasswordToggle {
  private readonly buttonStyles = injectPreset().button;
  protected readonly password = inject(ScPasswordField);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scPasswordToggle');
  }

  /** A pointer press doesn't take the focus from the input: typing goes on. */
  protected keepFocus(event: PointerEvent): void {
    if (event.button === 0 && this.password.input()) event.preventDefault();
  }
}
