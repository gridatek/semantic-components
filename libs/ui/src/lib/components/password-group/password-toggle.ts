import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import type { ScButtonVariants } from '../button/button';
import { ScPasswordGroup } from './password-group';

/**
 * Shows or hides the password, naming the input it controls; a click leaves
 * the caret in the input. Your icons and its name inside, both following the
 * state — "Show password", then "Hide password" — with
 * `#password="scPasswordGroup"` and `@if (password.visible())`. Not a
 * toggle button (`aria-pressed`): its name says what a press does.
 */
@Directive({
  selector: 'button[scPasswordToggle]',
  host: {
    'data-slot': 'password-toggle',
    type: 'button',
    '[attr.data-state]': 'password.visible() ? "visible" : "hidden"',
    '[attr.aria-controls]': 'password.input()?.id || null',
    '[disabled]': 'password.disabled()',
    '[class]': 'class()',
    '(pointerdown)': 'keepFocus($event)',
    '(click)': 'password.toggle()',
  },
})
export class ScPasswordToggle {
  private readonly buttonStyles = injectStyle().button;
  private readonly password = inject(ScPasswordGroup);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
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
  private keepFocus(event: PointerEvent): void {
    if (event.button === 0 && this.password.input()) event.preventDefault();
  }
}
