import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { bindInput, injectDisplayLocale } from '../../utils';
import { ScField } from '../field';
import { ScRatingIcon } from './rating-icon';

/**
 * A rating: WAI-ARIA's rating slider — one value, `null` while not rated,
 * up to `count` stars. The slider is a native range input, visually hidden
 * (in a field, the field's id: its label ties to it by `for`); the stars are
 * drawn beside it, pressed with a pointer. Whole or part stars (`step`), read out by your
 * `valueText` ("3.5 out of 5 stars"). Read-only, it is an image named by
 * that text, for any score (4.2). It draws the stars: your icon
 * (`<ng-template scRatingIcon>`), twice each — empty, and full over it up to the
 * star's fill (`--sc-rating-fill`, 0 to 1).
 */
@Component({
  selector: 'div[scRating]',
  exportAs: 'scRating',
  imports: [NgTemplateOutlet],
  template: `
    @if (!readonly()) {
      <input
        #slider
        type="range"
        class="sr-only"
        [attr.id]="field?.id() ?? null"
        min="0"
        [max]="count()"
        [step]="step()"
        [value]="value() ?? 0"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabelInput() || null"
        [attr.aria-valuetext]="text() || null"
        [attr.aria-required]="required() || null"
        [attr.aria-invalid]="(touched() && invalid()) || null"
        [attr.aria-describedby]="ariaDescribedBy()"
        (keydown)="onKeydown($event)"
        (input)="onInput($event)"
      />
    }
    @for (star of stars(); track star) {
      <span
        data-slot="rating-item"
        aria-hidden="true"
        [attr.data-star]="star"
        [style.--sc-rating-fill]="fill(star)"
        [class]="itemClass"
      >
        @if (icon(); as icon) {
          <ng-container
            [ngTemplateOutlet]="icon.template"
            [ngTemplateOutletContext]="{ $implicit: star, full: false }"
          />
          <ng-container
            [ngTemplateOutlet]="icon.template"
            [ngTemplateOutletContext]="{ $implicit: star, full: true }"
          />
        }
      </span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'rating',
    // Read-only: an image named by its value text. Else the slider inside.
    '[attr.role]': "readonly() ? 'img' : null",
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'preview.set(null)',
    '(click)': 'onClick($event)',
    '(focusout)': 'touch.emit()',
  },
})
export class ScRating implements FormValueControl<number | null> {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The field it is in: its label names it, its description describes it. */
  readonly field = inject(ScField, { optional: true });
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();

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

  /** How many stars: the highest score (not `max`: a Signal Forms control's is the value's). */
  readonly count = input(5);
  /** Your icon (`<ng-template scRatingIcon>`), drawn for each star. */
  private readonly icon = contentChild(ScRatingIcon);
  private readonly stars = computed(() =>
    Array.from({ length: this.count() }, (_, i) => i + 1),
  );

  /** Under the pointer, before a press (not on touch). */
  readonly preview = signal<number | null>(null);
  /** What the stars show: the preview, else the score. */
  readonly shown = computed(() => this.preview() ?? this.value() ?? 0);

  /** The value text, filled in. */
  readonly text = computed(() => {
    const template = this.valueText();
    if (!template) return '';
    const number = new Intl.NumberFormat(this.displayLocale(), {
      maximumFractionDigits: 2,
    });
    return template
      .split('{value}')
      .join(number.format(this.value() ?? 0))
      .split('{max}')
      .join(number.format(this.count()));
  });

  // Read-only: named by its value text (an image's name is what it shows).
  private readonly ariaLabel = computed(() =>
    this.readonly() ? this.text() || this.ariaLabelInput() || null : null,
  );
  /** The slider: a native range input, out of sight. */
  private readonly slider = viewChild<ElementRef<HTMLInputElement>>('slider');

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
      // The slider's focus ring, on the stars.
      'text-primary relative inline-flex w-fit items-center gap-0.5 rounded-sm outline-none has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
      this.interactive() && 'cursor-pointer touch-manipulation',
      this.disabled() && 'opacity-50',
      this.classInput(),
    ),
  );

  /** How much of a star is filled, 0 to 1 (1 for the first star). */
  private fill(star: number): number {
    return Math.min(1, Math.max(0, this.shown() - (star - 1)));
  }

  /** A star: both layers in one cell; the full one cut at the fill. */
  private readonly itemClass = cn(
    'grid shrink-0 place-items-center',
    "[&>svg]:col-start-1 [&>svg]:row-start-1 [&>svg:not([class*='size-'])]:size-5",
    // The empty layer: quieter; the full one: filled, in the rating's colour,
    // cut at the fill (from the right; right to left, from the left).
    '[&>svg:first-of-type]:text-muted-foreground',
    '[&>svg:last-of-type:not(:first-of-type)]:fill-current [&>svg:last-of-type:not(:first-of-type)]:[clip-path:inset(0_calc((1_-_var(--sc-rating-fill))_*_100%)_0_0)] rtl:[&>svg:last-of-type:not(:first-of-type)]:[clip-path:inset(0_0_0_calc((1_-_var(--sc-rating-fill))_*_100%))]',
  );

  /** Focuses it — Signal Forms does, to show an invalid field. */
  focus(options?: FocusOptions): void {
    this.slider()?.nativeElement.focus(options);
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

  /**
   * A change the keys above don't make (Page Up and Down, a screen reader's
   * increment): the slider's value, as a score — 0 is none, if it can be taken
   * back, else the lowest. The slider then shows the score.
   */
  private onInput(event: Event): void {
    const slider = event.target as HTMLInputElement;
    const value = slider.valueAsNumber;
    if (value > 0) this.set(value);
    else this.set(this.deselectable() ? null : this.step());
    slider.value = String(this.value() ?? 0);
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
    this.focus({ preventScroll: true });
  }

  /** The score under the pointer: its star, and how far across it (by the step). */
  private scoreAt(event: MouseEvent): number | null {
    const item = (event.target as Element | null)?.closest?.(
      '[data-slot=rating-item]',
    ) as HTMLElement | null;
    const star = Number(item?.dataset['star']);
    if (!item || !star) return null;
    const index = star - 1;
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
