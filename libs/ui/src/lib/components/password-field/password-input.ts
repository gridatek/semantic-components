import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScPasswordField } from './password-field';

/**
 * The password itself: hidden, or shown as text while the field's `visible`
 * — never spellchecked, capitalised or corrected (shown, it is text a
 * spellchecker could send away). Its label and descriptions are the field's;
 * its state, your Signal Form's (`[formField]`).
 */
@Directive({
  selector: 'input[scPasswordInput]',
  host: {
    'data-slot': 'control',
    '[id]': 'password.field.id()',
    '[type]': 'password.visible() ? "text" : "password"',
    '[autocomplete]': 'autocomplete()',
    spellcheck: 'false',
    autocapitalize: 'off',
    autocorrect: 'off',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.disabled]': 'disabled() || null',
    // Password managers leave it alone: a code, a key — not a login.
    '[attr.data-1p-ignore]': 'ignorePasswordManagers() ? "" : null',
    '[attr.data-lpignore]': 'ignorePasswordManagers() ? "true" : null',
    '[attr.data-bwignore]': 'ignorePasswordManagers() ? "true" : null',
    '[attr.data-form-type]': 'ignorePasswordManagers() ? "other" : null',
    '[attr.data-protonpass-ignore]': 'ignorePasswordManagers() ? "true" : null',
    '[class]': 'class()',
    '(keydown)': 'readCapsLock($event)',
    '(keyup)': 'readCapsLock($event)',
    '(blur)': 'password.capsLock.set(false)',
  },
})
export class ScPasswordInput {
  private readonly inputStyles = injectPreset().input;
  protected readonly password = inject(ScPasswordField);

  readonly classInput = input<string>('', { alias: 'class' });
  /** A password the browser knows (`current-password`), or a new one. */
  readonly autocomplete = input<'current-password' | 'new-password' | 'off'>(
    'current-password',
  );
  /** For a key or a code, not a login: password managers don't offer to fill or save it. */
  readonly ignorePasswordManagers = input(false, {
    transform: booleanAttribute,
  });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });

  // Bound by Signal Forms (FormUiControl).
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly disabled = input(false, { transform: booleanAttribute });

  // Not before it is touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );
  protected readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.password.field.descriptionIds().join(' ') ||
      null,
  );

  protected readonly class = computed(() =>
    cn(this.inputStyles, this.classInput()),
  );

  constructor() {
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    this.password.input.set(element);
    inject(DestroyRef).onDestroy(() => this.password.input.set(null));
  }

  protected readCapsLock(event: KeyboardEvent): void {
    // Synthetic events (autofill) have no modifier state.
    if (typeof event.getModifierState === 'function')
      this.password.capsLock.set(event.getModifierState('CapsLock'));
  }
}
