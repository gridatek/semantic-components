import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scOtpFieldSlotInput]',
  host: {
    'data-slot': 'otp-field-slot-input',
    type: 'text',
    inputmode: 'numeric',
    autocomplete: 'one-time-code',
    maxlength: '1',
    '[value]': 'value()',
    '[disabled]': 'disabled()',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(keydown)': 'keydownEvent.emit($event)',
    '(focus)': 'focused.emit(true)',
    '(blur)': 'focused.emit(false)',
  },
})
export class ScOtpFieldSlotInput {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly inputChange = output<string>();
  readonly keydownEvent = output<KeyboardEvent>();
  readonly focused = output<boolean>();

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 size-full bg-transparent text-center text-sm outline-none caret-transparent selection:bg-transparent disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 0) {
      const char = value.slice(-1);
      input.value = char;
      this.inputChange.emit(char);
    }
  }
}
