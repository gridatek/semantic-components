import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScOtpField } from './otp-field';
import { ScOtpFieldSlotCaret } from './otp-field-slot-caret';
import { ScOtpFieldSlotChar } from './otp-field-slot-char';
import { ScOtpFieldSlotInput } from './otp-field-slot-input';

@Component({
  selector: 'div[scOtpFieldSlot]',
  imports: [ScOtpFieldSlotInput, ScOtpFieldSlotCaret, ScOtpFieldSlotChar],
  host: {
    'data-slot': 'otp-field-slot',
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-filled]': 'isFilled() ? "" : null',
  },
  template: `
    <input
      #input
      scOtpFieldSlotInput
      [value]="char()"
      [disabled]="otpField.disabled()"
      [ariaLabel]="ariaLabel()"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOtpFieldSlot {
  readonly otpField = inject(ScOtpField);
  private readonly inputComponent = viewChild.required(ScOtpFieldSlotInput);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly index = signal<number>(0);
  private readonly focused = signal<boolean>(false);

  readonly char = computed(() => this.otpField.getChar(this.index()));
  readonly ariaLabel = computed(
    () => `Digit ${this.index() + 1} of ${this.otpField.slotCount()}`,
  );
  readonly isActive = computed(
    () => this.focused() && !this.otpField.disabled(),
  );
  readonly isFilled = computed(() => this.char() !== '');

  protected readonly class = computed(() =>
    cn(
      'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      this.isActive() && 'z-10 ring-2 ring-ring ring-offset-background',
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
      const firstEmptyIndex = this.otpField.firstEmptyIndex();
      if (firstEmptyIndex !== -1 && this.index() > firstEmptyIndex) {
        this.otpField.focusSlot(firstEmptyIndex);
        return;
      }
    }
    this.focused.set(isFocused);
  }

  protected onInputChange(char: string): void {
    if (this.otpField.disabled()) return;

    this.otpField.setChar(this.index(), char);
    // Move to next slot
    this.otpField.focusSlot(this.index() + 1);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.otpField.disabled()) return;

    if (event.key === 'Backspace') {
      if (this.char() === '') {
        // Move to previous slot and clear it
        const prevIndex = this.index() - 1;
        if (prevIndex >= 0) {
          this.otpField.setChar(prevIndex, '');
          this.otpField.focusSlot(prevIndex);
        }
      } else {
        // Clear current slot
        this.otpField.setChar(this.index(), '');
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      this.otpField.focusSlot(this.index() - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.otpField.focusSlot(this.index() + 1);
      event.preventDefault();
    }
  }
}
