import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { inputStyles } from '../input';
import { SC_NUMBER } from './number';
import { isNumberCharacter } from './number-format';

/**
 * The number's text field (a spin button): what you type is kept as typed
 * and read in the locale; leaving it or Enter writes it formatted, within
 * the bounds. ↑ / ↓ step (Shift: `largeStep`, Alt: `smallStep`), Page Up /
 * Page Down step by `largeStep`, Home / End go to the min / max. Name it
 * (a `scLabel`, or `aria-label`).
 */
@Directive({
  selector: 'input[scNumberInput]',
  host: {
    'data-slot': 'number-input',
    type: 'text',
    role: 'spinbutton',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    '[attr.id]': 'id()',
    '[attr.inputmode]': 'inputMode()',
    '[class]': 'class()',
    '[value]': 'text()',
    '[disabled]': 'number.disabled()',
    '[readOnly]': 'number.readonly()',
    '[attr.name]': 'number.name() || null',
    '[attr.aria-valuenow]': 'number.value()',
    '[attr.aria-valuetext]': 'number.formattedValue() || null',
    '[attr.aria-valuemin]': 'number.min() ?? null',
    '[attr.aria-valuemax]': 'number.max() ?? null',
    '[attr.aria-required]': 'number.required() || null',
    '[attr.aria-invalid]': '(number.invalid() && number.touched()) || null',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '(focus)': 'focused.set(true)',
    '(beforeinput)': 'onBeforeInput($event)',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(wheel)': 'onWheel($event)',
  },
})
export class ScNumberInput {
  protected readonly number = inject(SC_NUMBER);
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-number-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  /** What's shown: the value formatted, or what's being typed. */
  protected readonly text = signal('');
  protected readonly focused = signal(false);
  /** Typed since the last commit. */
  private editing = false;

  /** Whole numbers from 0: a numeric keypad; otherwise one with a separator. */
  protected readonly inputMode = computed(() =>
    Number.isInteger(this.number.step()) && (this.number.min() ?? -1) >= 0
      ? 'numeric'
      : 'decimal',
  );

  protected readonly class = computed(() =>
    cn(inputStyles, 'text-center tabular-nums', this.classInput()),
  );

  constructor() {
    // The value formatted — unless it's being typed.
    effect(() => {
      const formatted = this.number.formattedValue();
      untracked(() => {
        if (!this.editing) this.text.set(formatted);
      });
    });
    effect(() => this.number.inputId.set(this.id()));
    this.number.flushInput = () => this.commit(false);
  }

  /** Only what can be part of a number gets typed or pasted. */
  protected onBeforeInput(event: InputEvent): void {
    const data = event.data;
    if (!data || !event.inputType.startsWith('insert')) return;
    const formatter = this.number.formatter();
    if (![...data].every((char) => isNumberCharacter(char, formatter))) {
      event.preventDefault();
    }
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.editing = true;
    this.text.set(text);
    // The value follows what's typed (bounds are applied on commit).
    const parsed = this.number.parse(text);
    if (parsed === null) this.number.value.set(null);
    else if (!Number.isNaN(parsed)) this.number.value.set(parsed);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.commit();
    this.number.touch.emit();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) return;
    const number = this.number;
    switch (event.key) {
      case 'ArrowUp':
        this.commit(false);
        number.increment(number.stepSize(event));
        break;
      case 'ArrowDown':
        this.commit(false);
        number.decrement(number.stepSize(event));
        break;
      case 'PageUp':
        this.commit(false);
        number.increment(number.largeStep());
        break;
      case 'PageDown':
        this.commit(false);
        number.decrement(number.largeStep());
        break;
      case 'Home':
        if (number.min() === undefined) return;
        number.toMin();
        break;
      case 'End':
        if (number.max() === undefined) return;
        number.toMax();
        break;
      case 'Enter':
        this.commit();
        return;
      default:
        return;
    }
    event.preventDefault();
    this.showValue();
  }

  /** The wheel steps the value — while focused, and if allowed. */
  protected onWheel(event: WheelEvent): void {
    if (!this.number.allowWheelScrub() || !this.focused() || !event.deltaY) {
      return;
    }
    event.preventDefault();
    this.commit(false);
    const size = this.number.stepSize(event);
    if (event.deltaY < 0) this.number.increment(size);
    else this.number.decrement(size);
    this.showValue();
  }

  /**
   * What was typed, as the value: within the bounds; not a number, the
   * previous value back. Written formatted.
   */
  private commit(emit = true): void {
    if (!this.editing) return;
    const parsed = this.number.parse(this.text());
    if (!Number.isNaN(parsed)) this.number.setValue(parsed);
    this.showValue();
    if (emit) this.number.valueCommitted.emit(this.number.value());
  }

  private showValue(): void {
    this.editing = false;
    this.text.set(this.number.formattedValue());
  }
}
