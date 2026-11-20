import {
  Directive,
  ElementRef,
  LOCALE_ID,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { bindInput } from '../../utils';
import { ScField } from '../field';

/**
 * A rating: a slider over your stars (WAI-ARIA's rating slider) — one value,
 * `null` while not rated, up to the number of `scRatingNextItem`s. Whole or
 * part stars (`step`), read out by your `valueText` ("3.5 out of 5 stars").
 * Read-only, it is an image named by that text, for any score (4.2).
 */
@Directive({
  selector: 'div[scRatingNext]',
  exportAs: 'scRatingNext',
  host: {
    'data-slot': 'rating',
    '[attr.role]': "readonly() ? 'img' : 'slider'",
    '[attr.tabindex]': 'readonly() ? null : disabled() ? -1 : 0',
    // Named by the label of the field it is in (`<field id>-label`); read-only,
    // by its value text.
    '[attr.aria-labelledby]':
      '!readonly() && field ? field.id() + "-label" : null',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-valuemin]': 'readonly() ? null : 0',
    '[attr.aria-valuemax]': 'readonly() ? null : count()',
    '[attr.aria-valuenow]': 'readonly() ? null : (value() ?? 0)',
    '[attr.aria-valuetext]': 'readonly() ? null : text() || null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-required]': 'required() || null',
    '[attr.aria-invalid]': '(touched() && invalid()) || null',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'preview.set(null)',
    '(click)': 'onClick($event)',
    '(focusout)': 'touch.emit()',
  },
})
export class ScRatingNext implements FormValueControl<number | null> {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The field it is in: its label names it, its description describes it. */
  readonly field = inject(ScField, { optional: true });
  private readonly locale = inject(LOCALE_ID);

  /** The score: `null` while not rated. Two-way, or a [formField]. */
  readonly value = model<number | null>(null);
  /** The smallest change, as a part of a star: 1 (whole stars) or 0.5 (halves). */
  readonly step = input(1);
  /** A press on the score given, or Delete, takes it back (`null`). */
  readonly deselectable = input(false, { transform: booleanAttribute });
  /** Shows the score, any one (4.2), as an image named by `valueText`. */
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /**
   * What it reads: `{value}` and `{max}` replaced ("{value} out of {max}
   * stars"), the value in `LOCALE_ID`. Yours: no default words.
   */
  readonly valueText = input('');
  readonly ariaLabelInput = input('', { alias: 'aria-label' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** Focus left it (Signal Forms marks the field touched). */
  readonly touch = output<void>();

  private readonly items = signal<readonly HTMLElement[]>([]);
  /** The stars in page order: the first is 1. */
  private readonly ordered = computed(() =>
    [...this.items()].sort((a, b) =>
      // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, no Node global on the server).
      a.compareDocumentPosition(b) & 4 ? -1 : 1,
    ),
  );
  /** The highest score: one per star (not `max`: a Signal Forms control's is an input). */
  readonly count = computed(() => this.items().length);

  /** Under the pointer, before a press (not on touch). */
  readonly preview = signal<number | null>(null);
  /** What the stars show: the preview, else the score. */
  readonly shown = computed(() => this.preview() ?? this.value() ?? 0);

  /** The value text, filled in. */
  readonly text = computed(() => {
    const template = this.valueText();
    if (!template) return '';
    const number = new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 2,
    });
    return template
      .split('{value}')
      .join(number.format(this.value() ?? 0))
      .split('{max}')
      .join(number.format(this.count()));
  });

  // Read-only: named by its value text (an image's name is what it shows).
  private readonly ariaLabel = computed(
    () => (this.readonly() ? this.text() : '') || this.ariaLabelInput() || null,
  );

  private readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  private readonly interactive = computed(
    () => !this.readonly() && !this.disabled(),
  );

  private readonly class = computed(() =>
    cn(
      'inline-flex w-fit items-center gap-0.5 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      this.interactive() && 'cursor-pointer touch-manipulation',
      this.disabled() && 'opacity-50',
      this.classInput(),
    ),
  );

  /** A star joins (it registers itself): its place, from its order. */
  register(item: HTMLElement): () => void {
    this.items.update((all) => [...all, item]);
    return () => this.items.update((all) => all.filter((i) => i !== item));
  }

  /** 1 for the first star; 0 before it is known. */
  indexOf(item: HTMLElement): number {
    return this.ordered().indexOf(item) + 1;
  }

  /** Focuses it — Signal Forms does, to show an invalid field. */
  focus(options?: FocusOptions): void {
    this.element.focus(options);
  }

  private set(score: number | null): void {
    if (score === null) {
      this.value.set(null);
      return;
    }
    const step = this.step();
    const decimals = (String(step).split('.')[1] ?? '').length;
    const clamped = Math.min(this.count(), Math.max(step, score));
    this.value.set(Number(clamped.toFixed(decimals)));
  }

  private onKeydown(event: KeyboardEvent): void {
    if (!this.interactive()) return;
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const current = this.value() ?? 0;
    const step = this.step();
    const up = rtl ? 'ArrowLeft' : 'ArrowRight';
    const down = rtl ? 'ArrowRight' : 'ArrowLeft';
    switch (event.key) {
      case up:
      case 'ArrowUp':
        this.set(current + step);
        break;
      case down:
      case 'ArrowDown':
        // Down from the lowest score: none, if it can be taken back.
        if (current <= step && this.deselectable()) this.set(null);
        else this.set(current - step);
        break;
      case 'Home':
        this.set(step);
        break;
      case 'End':
        this.set(this.count());
        break;
      case 'Delete':
      case 'Backspace':
        if (!this.deselectable()) return;
        this.set(null);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  // Hover previews (a mouse or a pen: on touch, a tap picks at once).
  private onPointerMove(event: PointerEvent): void {
    if (!this.interactive() || event.pointerType === 'touch') return;
    this.preview.set(this.scoreAt(event));
  }

  private onClick(event: MouseEvent): void {
    if (!this.interactive()) return;
    const score = this.scoreAt(event);
    if (score === null) return;
    this.preview.set(null);
    this.set(this.deselectable() && score === this.value() ? null : score);
    this.element.focus({ preventScroll: true });
  }

  /** The score under the pointer: its star, and how far across it (by the step). */
  private scoreAt(event: MouseEvent): number | null {
    const item = (event.target as Element | null)?.closest?.(
      '[data-slot=rating-item]',
    ) as HTMLElement | null;
    const index = item ? this.ordered().indexOf(item) : -1;
    if (!item || index < 0) return null;
    const box = item.getBoundingClientRect();
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const across =
      box.width > 0
        ? (rtl ? box.right - event.clientX : event.clientX - box.left) /
          box.width
        : 1;
    const step = this.step();
    const part = Math.max(step, Math.ceil(Math.min(1, across) / step) * step);
    return index + Math.min(1, part);
  }

  constructor() {
    // The field it is in follows it (`data-disabled`, `data-invalid`).
    const field = this.field;
    if (field) {
      bindInput(field.disabledInput, this.disabled);
      bindInput(
        field.invalidInput,
        computed(() => this.invalid() && this.touched()),
      );
    }
  }
}
