import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScOtpField } from './otp-field';
import { ScOtpFieldSlotCaret } from './otp-field-slot-caret';
import { ScOtpFieldSlotChar } from './otp-field-slot-char';
import { ScOtpFieldSlotInput } from './otp-field-slot-input';

@Component({
  selector: 'div[scOtpFieldSlot]',
  imports: [ScOtpFieldSlotInput, ScOtpFieldSlotCaret, ScOtpFieldSlotChar],
  host: {
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-filled]': 'isFilled() ? "" : null',
    '[attr.data-invalid]': 'otp.showInvalid() || null',
  },
  template: `
    <input
      #input
      scOtpFieldSlotInput
      [value]="char()"
      [disabled]="otp.disabled()"
      [ariaLabel]="ariaLabel()"
      [ariaDescribedBy]="ariaDescribedBy()"
      [attr.aria-invalid]="otp.showInvalid() || null"
      [inputMode]="otp.inputMode()"
      (inputChange)="onInputChange($event)"
      (keydownEvent)="onKeydown($event)"
      (focused)="onFocusChange($event)"
    />
    @if (isActive() && !isFilled()) {
      <div scOtpFieldSlotCaret></div>
    }
    <span scOtpFieldSlotChar [char]="char()"></span>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ScOtpFieldSlot {
  readonly otp = inject(ScOtpField);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly inputComponent = viewChild.required(ScOtpFieldSlotInput);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly index = signal<number>(0);
  private readonly focused = signal<boolean>(false);

  readonly char = computed(() => this.otp.getChar(this.index()));
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });
  readonly ariaDescribedBy = computed(() => {
    const ids = this.field?.descriptionIds() ?? [];
    return ids.length ? ids.join(' ') : null;
  });
  readonly isActive = computed(() => this.focused() && !this.otp.disabled());
  readonly isFilled = computed(() => this.char() !== '');

  protected readonly class = computed(() =>
    cn(
      'relative flex h-10 w-10 items-center justify-center dark:bg-input/30 border-y border-e border-input text-sm transition-all outline-none first:rounded-s-md first:border-s last:rounded-e-md',
      this.isActive() && 'z-10 border-ring ring-ring/50 ring-3',
      'data-invalid:border-destructive data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40',
      this.classInput(),
    ),
  );

  setIndex(idx: number): void {
    this.index.set(idx);
  }

  focus(): void {
    this.inputComponent().focus();
  }

  protected onFocusChange(isFocused: boolean): void {
    if (isFocused) {
      // Redirect focus to the first empty slot to enforce sequential input
      const firstEmptyIndex = this.otp.firstEmptyIndex();
      if (firstEmptyIndex !== -1 && this.index() > firstEmptyIndex) {
        this.otp.focusSlot(firstEmptyIndex);
        return;
      }
    }
    this.focused.set(isFocused);
  }

  protected onInputChange(char: string): void {
    if (this.otp.disabled()) return;

    this.otp.setChar(this.index(), char);
    // Move to next slot
    this.otp.focusSlot(this.index() + 1);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.otp.disabled()) return;

    if (event.key === 'Backspace') {
      if (this.char() === '') {
        // Move to previous slot and clear it
        const prevIndex = this.index() - 1;
        if (prevIndex >= 0) {
          this.otp.setChar(prevIndex, '');
          this.otp.focusSlot(prevIndex);
        }
      } else {
        // Clear current slot
        this.otp.setChar(this.index(), '');
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      this.otp.focusSlot(this.index() - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.otp.focusSlot(this.index() + 1);
      event.preventDefault();
    }
  }
}
