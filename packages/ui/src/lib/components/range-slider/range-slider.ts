import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  type FieldTree,
  FormField,
  type FormValueControl,
} from '@angular/forms/signals';
import { cn } from 'cn';
import { bindInput, injectDisplayLocale } from '../../utils';
import { ScField } from '../field';

/** A range slider's orientation. */
export type ScRangeSliderOrientation = 'horizontal' | 'vertical';

/** A range: from, to. */
export type ScRangeSliderValue = readonly [number, number];

/**
 * A bound as written: a number (`[min]="0"`, or `min="0"`). With a
 * [formField], Angular binds the field's `min` / `max` here too — typed as
 * the pair, and not a number: nothing (the schema's are read instead).
 */
function toBound(value: unknown): number | undefined {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string' && value.trim() !== ''
        ? Number(value)
        : NaN;
  return Number.isFinite(n) ? n : undefined;
}

/**
 * A range on one track: two native ranges (`scRangeSliderThumb`, from and
 * to, in page order) that never cross, the track and the range between them
 * in the style's Slider look. The value is the pair, one Signal Forms field.
 * A group, named by its field's label; each thumb named by the consumer.
 */
@Directive({
  selector: 'div[scRangeSlider]',
  exportAs: 'scRangeSlider',
  host: {
    role: 'group',
    'data-slot': 'range-slider',
    // Named by the label of the field it is in (`<field id>-label`).
    '[attr.aria-labelledby]': 'field ? field.id() + "-label" : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.--sc-range-slider-from-value]': 'fractions()[0]',
    '[style.--sc-range-slider-to-value]': 'fractions()[1]',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerEnd()',
    '(pointercancel)': 'onPointerEnd()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScRangeSlider implements FormValueControl<ScRangeSliderValue> {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The field it is in: its label names the group, its state follows it. */
  readonly field = inject(ScField, { optional: true });
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();

  /** The range, from and to: two-way, or a [formField]. */
  readonly value = model<ScRangeSliderValue>([0, 100]);
  /** The [formField] on it: its schema gives the ends. */
  private readonly formField = inject(FormField, {
    self: true,
    optional: true,
  });
  // `minInput`, written `[min]`: a Signal Forms control's `min` property is
  // typed as its value (here a pair), as `classInput` is written `[class]`.
  /** The track's lowest value, without a form: `[min]="0"`, as a Slider's. */
  readonly minInput = input<number | undefined, unknown>(undefined, {
    alias: 'min',
    transform: toBound,
  });
  /** The track's highest value, without a form: `[max]="1000"`. */
  readonly maxInput = input<number | undefined, unknown>(undefined, {
    alias: 'max',
    transform: toBound,
  });
  /**
   * The track's ends. With a [formField], the schema's: `min` of the first
   * value and `max` of the second (`applyEach(path, (value) => { min(value, 0);
   * max(value, 1000); })`). Without, [min] and [max]. Else 0 and 100.
   */
  readonly lowest = computed(
    () => this.itemState(0)?.min?.() ?? this.minInput() ?? 0,
  );
  readonly highest = computed(
    () => this.itemState(1)?.max?.() ?? this.maxInput() ?? 100,
  );
  readonly step = input(1);
  /** The steps the thumbs keep between them (0: they may meet). */
  readonly minStepsBetweenValues = input(0);
  readonly orientation = input<ScRangeSliderOrientation>('horizontal');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** How the values read (`Intl.NumberFormat`, in `LOCALE_ID`): each thumb's `aria-valuetext`, and `formatted()`. */
  readonly format = input<Intl.NumberFormatOptions>({});
  readonly classInput = input<string>('', { alias: 'class' });

  /** Focus left the slider (Signal Forms marks the field touched). */
  readonly touch = output<void>();

  /** The values as they read: for the text you write round it. */
  readonly formatted = computed(() => {
    const format = new Intl.NumberFormat(this.displayLocale(), this.format());
    return this.value().map((v) => format.format(v)) as [string, string];
  });

  /** Where each value is along the track, 0 to 1: the range is drawn from them. */
  readonly fractions = computed(() => {
    const span = this.highest() - this.lowest();
    return this.value().map((v) =>
      span > 0 ? (v - this.lowest()) / span : 0,
    ) as [number, number];
  });

  private readonly thumbs = signal<readonly HTMLInputElement[]>([]);
  /** The thumbs in page order: the first is from, the second to. */
  private readonly ordered = computed(() =>
    [...this.thumbs()].sort((a, b) =>
      // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, no Node global on the server).
      a.compareDocumentPosition(b) & 4 ? -1 : 1,
    ),
  );

  private readonly class = computed(() =>
    cn(
      'relative grid touch-none select-none',
      !this.disabled() && 'cursor-pointer',
      this.orientation() === 'vertical' ? 'h-full justify-center' : 'w-full',
      this.disabled() && 'opacity-50',
      this.classInput(),
    ),
  );

  /** A thumb joins (it registers itself): its place, from its order. */
  register(thumb: HTMLInputElement): () => void {
    this.thumbs.update((all) => [...all, thumb]);
    return () => this.thumbs.update((all) => all.filter((t) => t !== thumb));
  }

  /** 0 (from) or 1 (to); −1 before it is known. */
  indexOf(thumb: HTMLInputElement): number {
    return this.ordered().indexOf(thumb);
  }

  /**
   * Sets a thumb's value, kept on its side of the other (and the steps
   * between them), within min and max: what it became.
   */
  setThumb(index: number, raw: number): number {
    const [from, to] = this.value();
    const gap = this.minStepsBetweenValues() * this.step();
    const next =
      index === 0
        ? this.round(Math.min(Math.max(raw, this.lowest()), to - gap))
        : this.round(Math.max(Math.min(raw, this.highest()), from + gap));
    const value: ScRangeSliderValue = index === 0 ? [next, to] : [from, next];
    if (value[0] !== from || value[1] !== to) this.value.set(value);
    return next;
  }

  /**
   * Drags a thumb (the pointer): into the other, it pushes it along — the
   * steps between them kept, both within min and max (Base UI's `push`).
   */
  private pushThumb(index: number, raw: number): void {
    const [from, to] = this.value();
    const gap = this.minStepsBetweenValues() * this.step();
    let value: ScRangeSliderValue;
    if (index === 0) {
      const next = this.round(
        Math.min(Math.max(raw, this.lowest()), this.highest() - gap),
      );
      value = [next, Math.max(to, this.round(next + gap))];
    } else {
      const next = this.round(
        Math.max(Math.min(raw, this.highest()), this.lowest() + gap),
      );
      value = [Math.min(from, this.round(next - gap)), next];
    }
    if (value[0] !== from || value[1] !== to) this.value.set(value);
  }

  /** The state of a value of the bound pair (its schema's min and max). */
  private itemState(index: number) {
    const pair = this.formField?.field() as
      FieldTree<readonly number[]> | undefined;
    return pair?.[index]?.();
  }

  /** Focuses the first thumb — Signal Forms does, to show an invalid field. */
  focus(options?: FocusOptions): void {
    this.ordered()[0]?.focus(options);
  }

  /** The thumb a pointer drags, or null while both sit on one spot and it hasn't moved yet. */
  private dragged: number | null = null;
  private dragging = false;
  private pressedAt = 0;

  // A press anywhere on it: the nearer thumb comes and follows the pointer.
  // The browser's own drag is off (pointer-events on the thumbs only for
  // their hover): two stacked ranges can't choose the thumb that can move.
  private onPointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0) return;
    event.preventDefault();
    const at = this.valueAt(event);
    const [from, to] = this.value();
    this.pressedAt = at;
    this.dragged =
      at < from
        ? 0
        : at > to
          ? 1
          : from === to
            ? null
            : at - from < to - at
              ? 0
              : 1;
    this.dragging = true;
    this.element.setPointerCapture?.(event.pointerId);
    if (this.dragged !== null) this.move(this.dragged, at);
    else this.ordered()[1]?.focus({ preventScroll: true });
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    const at = this.valueAt(event);
    // Both on one spot: the direction of the move chooses.
    if (this.dragged === null) {
      if (at === this.pressedAt) return;
      this.dragged = at < this.pressedAt ? 0 : 1;
    }
    this.move(this.dragged, at);
  }

  private onPointerEnd(): void {
    this.dragging = false;
    this.dragged = null;
  }

  private move(index: number, at: number): void {
    this.pushThumb(index, at);
    this.ordered()[index]?.focus({ preventScroll: true });
  }

  private onFocusOut(event: FocusEvent): void {
    if (!this.element.contains(event.relatedTarget as Node | null))
      this.touch.emit();
  }

  /** The value under the pointer: along the track, less half a thumb at each end. */
  private valueAt(event: PointerEvent): number {
    const box = this.element.getBoundingClientRect();
    const first = this.ordered()[0];
    const thumb = first
      ? parseFloat(
          getComputedStyle(first).getPropertyValue('--sc-slider-thumb'),
        ) || 0
      : 0;
    const vertical = this.orientation() === 'vertical';
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const length = (vertical ? box.height : box.width) - thumb;
    const offset = vertical
      ? box.bottom - event.clientY
      : rtl
        ? box.right - event.clientX
        : event.clientX - box.left;
    const fraction =
      length > 0 ? Math.min(1, Math.max(0, (offset - thumb / 2) / length)) : 0;
    const steps = Math.round(
      (fraction * (this.highest() - this.lowest())) / this.step(),
    );
    return this.round(this.lowest() + steps * this.step());
  }

  /** Rid of float noise (0.1 + 0.2): to the step's decimals. */
  private round(value: number): number {
    const decimals = (String(this.step()).split('.')[1] ?? '').length;
    return Number(value.toFixed(decimals));
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
