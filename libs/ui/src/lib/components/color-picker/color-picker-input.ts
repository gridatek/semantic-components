import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { ScColorPicker } from './color-picker';

/**
 * The colour as text: type any CSS colour — hex, `rgb()`, `hsl()`,
 * `oklch()`, a name. A valid one is taken as you type; an invalid one is
 * `aria-invalid`, and left, the input shows the colour again. Label it.
 */
@Directive({
  selector: 'input[scColorPickerInput]',
  host: {
    'data-slot': 'color-picker-input',
    type: 'text',
    autocomplete: 'off',
    spellcheck: 'false',
    '[value]': 'draft() ?? picker.value()',
    '[disabled]': 'picker.disabled()',
    '[attr.aria-invalid]': 'wrong() || null',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown.enter)': 'onBlur()',
  },
})
export class ScColorPickerInput {
  private readonly picker = inject(ScColorPicker);

  private readonly inputStyles = injectStyle().input;
  readonly classInput = input<string>('', { alias: 'class' });

  /** What is typed, while typing. */
  private readonly draft = signal<string | null>(null);
  private readonly wrong = signal(false);

  private readonly class = computed(() =>
    cn(this.inputStyles, 'font-mono', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerInput');
  }

  private onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.draft.set(text);
    this.wrong.set(!this.picker.setColor(text));
  }

  private onBlur(): void {
    this.draft.set(null);
    this.wrong.set(false);
    this.picker.touch.emit();
  }
}
