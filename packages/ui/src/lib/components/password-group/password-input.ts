import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScPasswordGroup } from './password-group';

/**
 * The password itself: hidden, or shown as text while the group's `visible`
 * — never spellchecked, capitalised or corrected (shown, it is text a
 * spellchecker could send away). Its label and descriptions are the
 * `scField`'s it is in; its state, your Signal Form's (`[formField]`).
 */
@Directive({
  selector: 'input[scPasswordInput]',
  host: {
    'data-slot': 'control',
    '[id]': 'id()',
    '[type]': 'group.visible() ? "text" : "password"',
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
  },
})
export class ScPasswordInput {
  private readonly inputStyles = injectStyle().input;
  private readonly group = inject(ScPasswordGroup);
  private readonly fallbackId = inject(_IdGenerator).getId('sc-password-');

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

  /** The field's id, so its label names it; its own without a field. */
  private readonly id = computed(
    () => this.group.field?.id() ?? this.fallbackId,
  );
  // Not before it is touched.
  private readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );
  private readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.group.field?.descriptionIds().join(' ') ||
      null,
  );

  private readonly class = computed(() =>
    cn(this.inputStyles, this.classInput()),
  );

  constructor() {
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    this.group.input.set(element);
    inject(DestroyRef).onDestroy(() => this.group.input.set(null));
    // Its buttons follow it, disabled with it.
    effect(() => this.group.disabled.set(this.disabled()));
  }
}
