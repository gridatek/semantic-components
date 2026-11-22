import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { SC_FIELD } from '../field';
import { ScColorPicker } from './color-picker';

/**
 * The colour as text: type any CSS colour — hex, `rgb()`, `hsl()`,
 * `oklch()`, a name. Taken on Enter or when left; text that is no colour goes
 * back to the value (`aria-invalid` while typed); Escape puts it back. Label it.
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
    '[readOnly]': 'picker.readonly()',
    '[attr.aria-invalid]': 'wrong() || null',
    '[attr.id]': 'field?.id() ?? null',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'take()',
    '(keydown.escape)': 'restore($event)',
    '(blur)': 'onBlur()',
  },
})
export class ScColorPickerInput {
  private readonly picker = inject(ScColorPicker);
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  /** In a field: its id — the label names it. */
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly inputStyles = injectStyle().input;

  readonly classInput = input<string>('', { alias: 'class' });

  /** What is typed, until taken. */
  private readonly draft = signal<string | null>(null);
  private readonly wrong = computed(() => {
    const draft = this.draft();
    return draft !== null && !this.picker.parse(draft);
  });

  private readonly class = computed(() =>
    cn(this.inputStyles, 'font-mono', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerInput');
  }

  private onInput(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  /** The text taken — or, no colour, the value back. */
  private take(): void {
    const draft = this.draft();
    if (draft !== null) this.picker.setColor(draft);
    this.draft.set(null);
    // The value back on the page (unchanged, the binding wouldn't write it).
    this.element.value = this.picker.value();
  }

  private restore(event: Event): void {
    if (this.draft() === null) return;
    event.stopPropagation();
    this.draft.set(null);
    this.element.value = this.picker.value();
  }

  private onBlur(): void {
    this.take();
    this.picker.touch.emit();
  }
}
