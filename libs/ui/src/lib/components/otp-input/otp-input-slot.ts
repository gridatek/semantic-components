import { Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { SC_FIELD } from '../field';
import { ScOtpInput } from './otp-input';

/**
 * One character of the code, on your `<input>`. The first input takes the
 * field's id (a `scLabel` names it) and offers the code from an SMS
 * (`autocomplete="one-time-code"`). Named from the root's `slotLabel`
 * (its place and the count), or by its own `aria-label`.
 * Typing overwrites, Backspace / Delete clear, ← → Home End move (← → as
 * they look: mirrored right to left); focus always goes to the first empty
 * input, so the code is entered in order.
 */
@Directive({
  selector: 'input[scOtpInputSlot]',
  host: {
    'data-slot': 'otp-input-slot',
    '[attr.type]': 'otp.mask() ? "password" : "text"',
    '[readOnly]': 'otp.readOnly()',
    autocapitalize: 'off',
    spellcheck: 'false',
    '[attr.id]': 'id()',
    '[attr.aria-label]': 'label()',
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
export class ScOtpInputSlot {
  private readonly directionality = inject(Directionality);
  private readonly styles = injectStyle().otpInput;
  private readonly otp = inject(ScOtpInput);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  /** Its own name: an exception to the root's `slotLabel`. */
  readonly ariaLabelInput = input('', { alias: 'aria-label' });

  private readonly index = computed(() => this.otp.indexOf(this));
  private readonly first = computed(() => this.index() === 0);
  private readonly char = computed(() => this.otp.charAt(this.index()));
  /** Its own aria-label, or the root's slotLabel with its place and the count. */
  private readonly label = computed(
    () =>
      this.ariaLabelInput() ||
      this.otp
        .slotLabel()
        .split('{index}')
        .join(String(this.index() + 1))
        .split('{length}')
        .join(String(this.otp.length())) ||
      null,
  );

  /** The first input takes the field's id, so its label names it. */
  private readonly id = computed(
    () => this.idInput() || (this.first() ? this.field?.id() : null) || null,
  );
  private readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  private readonly class = computed(() =>
    cn(
      this.styles.input,
      // A real input, where shadcn's slot is a div: its text centred, no
      // selection shown (one character), its own caret.
      'text-center selection:bg-transparent disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }

  /** In order: focus goes to the first empty input, if it is before this one. */

  constructor() {
    ɵwarnIfUnnamed('scOtpInputSlot');
  }

  private onFocus(): void {
    const firstEmpty = this.otp.firstEmptyIndex();
    if (firstEmpty !== -1 && this.index() > firstEmpty) {
      this.otp.focusInput(firstEmpty);
    }
  }

  private onInput(event: Event): void {
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

  private onKeydown(event: KeyboardEvent): void {
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
      case 'ArrowRight': {
        // The input on that side: right to left, the next one is on the left.
        const forward =
          (event.key === 'ArrowRight') !==
          (this.directionality.value === 'rtl');
        otp.focusInput(index + (forward ? 1 : -1));
        break;
      }
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
