import { Directive, computed, inject, input, signal } from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { ScColorPicker } from './color-picker';

/**
 * The colour as text: type any CSS colour — hex, `rgb()`, `hsl()`,
 * `oklch()`, a name. A valid one is taken as you type; an invalid one is
 * `aria-invalid`, and left, the field shows the colour again. Label it.
 */
@Directive({
  selector: 'input[scColorPickerField]',
  host: {
    'data-slot': 'color-picker-field',
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
export class ScColorPickerField {
  protected readonly picker = inject(ScColorPicker);

  readonly classInput = input<string>('', { alias: 'class' });

  /** What is typed, while typing. */
  protected readonly draft = signal<string | null>(null);
  protected readonly wrong = signal(false);

  protected readonly class = computed(() =>
    cn(
      'border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 font-mono text-sm shadow-xs outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerField');
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.draft.set(text);
    this.wrong.set(!this.picker.setColor(text));
  }

  protected onBlur(): void {
    this.draft.set(null);
    this.wrong.set(false);
    this.picker.touch.emit();
  }
}
