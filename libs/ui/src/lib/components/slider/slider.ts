import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

/** A slider's orientation. */
export type ScSliderOrientation = 'horizontal' | 'vertical';

/**
 * A slider: a native range in the preset's look — its track, the range up to
 * the thumb, and the thumb. Horizontal, or vertical (its value growing
 * upward). The keyboard, screen readers and right to left are the browser's.
 */
@Directive({
  selector: 'input[scSlider]',
  host: {
    // Its own type: the markup needs none (and a host directive on any input works).
    type: 'range',
    'data-slot': 'slider',
    '[id]': 'id()',
    '[min]': 'resolvedMin()',
    '[max]': 'resolvedMax()',
    '[step]': 'step()',
    '[value]': 'value()',
    '[disabled]': 'disabled()',
    '[attr.aria-orientation]':
      "orientation() === 'vertical' ? 'vertical' : null",
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[style.--sc-slider-value]': 'fraction()',
    '[class]': 'class()',
    '(input)': 'onInput()',
  },
})
export class ScSlider implements FormValueControl<number> {
  private readonly styles = injectPreset().slider;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-slider-');

  /** The value: two-way, or a [formField]. */
  readonly value = model(0);
  // input<number | undefined>: the Field directive binds the schema's min and max.
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input(1);
  readonly orientation = input<ScSliderOrientation>('horizontal');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );
  protected readonly resolvedMin = computed(() => this.min() ?? 0);
  protected readonly resolvedMax = computed(() => this.max() ?? 100);

  protected readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Invalid once touched, as the other controls.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  /** How far along the value is, 0 to 1: Chrome's range is drawn from it. */
  protected readonly fraction = computed(() => {
    const range = this.resolvedMax() - this.resolvedMin();
    return range > 0 ? (this.value() - this.resolvedMin()) / range : 0;
  });

  protected readonly class = computed(() =>
    cn(
      'm-0 cursor-pointer appearance-none bg-transparent focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
      // Vertical: the native range turned, its value growing upward.
      this.orientation() === 'vertical'
        ? 'h-full min-h-40 [direction:rtl] [writing-mode:vertical-lr]'
        : 'w-full',
      this.styles.root,
      this.styles.track,
      // The range: Firefox draws it; on Chrome's track, a fill up to the
      // thumb's centre (the thumb stays inside the track at both ends).
      '[&::-moz-range-progress]:bg-primary',
      this.orientation() === 'vertical'
        ? '[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_top,var(--primary)_var(--sc-slider-fill),transparent_var(--sc-slider-fill))]'
        : '[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--primary)_var(--sc-slider-fill),transparent_var(--sc-slider-fill))] rtl:[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_left,var(--primary)_var(--sc-slider-fill),transparent_var(--sc-slider-fill))]',
      '[--sc-slider-fill:calc(var(--sc-slider-thumb)/2_+_(100%_-_var(--sc-slider-thumb))_*_var(--sc-slider-value))]',
      // The browsers' own thumb off (Firefox's border); the preset's over it.
      '[&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:border-0',
      this.styles.thumb,
      this.classInput(),
    ),
  );

  protected onInput(): void {
    this.value.set(this.element.valueAsNumber);
  }
}
