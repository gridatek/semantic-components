import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScOtpField } from './otp-field';

/**
 * One character of the code, on your `<input>`. The first input takes the
 * field's id (a `scLabel` names it) and offers the code from an SMS
 * (`autocomplete="one-time-code"`); name the others with `aria-label`.
 * Typing overwrites, Backspace / Delete clear, ← → Home End move; focus
 * always goes to the first empty input, so the code is entered in order.
 */
@Directive({
  selector: 'input[scOtpFieldInput]',
  host: {
    'data-slot': 'otp-field-input',
    type: 'text',
    autocapitalize: 'off',
    spellcheck: 'false',
    '[attr.id]': 'id()',
    '[attr.autocomplete]': 'first() ? "one-time-code" : "off"',
    '[attr.inputmode]': 'otp.inputMode()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'otp.showInvalid() || null',
    '[attr.data-filled]': 'char() ? "" : null',
    '[value]': 'char()',
    '[disabled]': 'otp.disabled()',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScOtpFieldInput {
  protected readonly otp = inject(ScOtpField);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  protected readonly index = computed(() => this.otp.indexOf(this));
  protected readonly first = computed(() => this.index() === 0);
  protected readonly char = computed(() => this.otp.charAt(this.index()));

  /** The first input takes the field's id, so its label names it. */
  protected readonly id = computed(
    () => this.idInput() || (this.first() ? this.field?.id() : null) || null,
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 relative size-10 rounded-md border bg-transparent text-center text-sm shadow-xs outline-none transition-[color,box-shadow]',
      'selection:bg-transparent disabled:cursor-not-allowed',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:z-10 focus-visible:ring-3',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }

  /** In order: focus goes to the first empty input, if it is before this one. */
  protected onFocus(): void {
    const firstEmpty = this.otp.firstEmptyIndex();
    if (firstEmpty !== -1 && this.index() > firstEmpty) {
      this.otp.focusInput(firstEmpty);
    }
  }

  protected onInput(event: Event): void {
    const { inputType, data } = event as InputEvent;
    const text = this.element.value;
    if (inputType === 'insertText' && data) {
      // Typed: the new character, over what was there.
      this.otp.write(this.index(), data);
    } else if (text) {
      // Autofilled, dropped, composed: maybe the whole code.
      this.otp.write(this.index(), text);
    } else {
      // Emptied (cut, a phone keyboard's delete).
      this.otp.clear(this.index());
    }
    // What's shown is the code's character, whatever was typed.
    this.element.value = this.otp.charAt(this.index());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const otp = this.otp;
    const index = this.index();
    switch (event.key) {
      case 'Backspace':
        if (this.char()) {
          otp.clear(index);
        } else if (index > 0) {
          otp.clear(index - 1);
          otp.focusInput(index - 1);
        }
        break;
      case 'Delete':
        otp.clear(index);
        break;
      case 'ArrowLeft':
        otp.focusInput(index - 1);
        break;
      case 'ArrowRight':
        otp.focusInput(index + 1);
        break;
      case 'Home':
        otp.focusInput(0);
        break;
      case 'End':
        otp.focusInput(
          otp.firstEmptyIndex() === -1
            ? otp.length() - 1
            : otp.firstEmptyIndex(),
        );
        break;
      default:
        return;
    }
    event.preventDefault();
  }
}
