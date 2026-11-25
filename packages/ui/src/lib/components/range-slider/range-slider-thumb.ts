import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { rtlArrowStep } from '../slider/rtl-arrow-step';
import { ScRangeSlider } from './range-slider';

/**
 * One end of the range: a native range on the slider's track — the first
 * from, the second to (page order). The keyboard and screen readers are the
 * browser's; it stops at the other thumb. Name it (`aria-label`).
 */
@Directive({
  selector: 'input[scRangeSliderThumb]',
  host: {
    type: 'range',
    'data-slot': 'range-slider-thumb',
    '[id]': 'id()',
    '[min]': 'slider.lowest()',
    '[max]': 'slider.highest()',
    '[step]': 'slider.step()',
    '[value]': 'current()',
    '[disabled]': 'slider.disabled()',
    '[attr.aria-orientation]':
      "slider.orientation() === 'vertical' ? 'vertical' : null",
    '[attr.aria-valuetext]': 'slider.formatted()[index()] ?? null',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[class]': 'class()',
    '(input)': 'onInput()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScRangeSliderThumb {
  private readonly styles = injectStyle().slider;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly slider = inject(ScRangeSlider);
  private readonly direction = inject(Directionality);
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-range-slider-thumb-',
  );

  readonly idInput = input('', { alias: 'id' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** 0: from; 1: to. */
  private readonly index = computed(() => this.slider.indexOf(this.element));
  private readonly current = computed(
    () => this.slider.value()[this.index()] ?? this.slider.lowest(),
  );

  // The first takes the field's id: its label points to it.
  private readonly id = computed(
    () =>
      this.idInput() ||
      (this.index() === 0 ? this.slider.field?.id() : null) ||
      this.fallbackId,
  );

  private readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.slider.field?.descriptionIds().join(' ') ||
      null,
  );

  // Invalid once touched, as the other controls.
  private readonly ariaInvalid = computed(
    () => (this.slider.touched() && this.slider.invalid()) || null,
  );

  private readonly class = computed(() => {
    const vertical = this.slider.orientation() === 'vertical';
    const from = this.index() === 0;
    return cn(
      // Both in one cell, one over the other; only the thumbs take the
      // pointer (for their hover: the slider drives the drag). Never raised
      // on focus: the first draws the range on its track, which would cover
      // the second thumb.
      'pointer-events-none col-start-1 row-start-1 m-0 appearance-none bg-transparent focus-visible:outline-hidden disabled:opacity-100',
      '[&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:cursor-pointer',
      vertical
        ? 'h-full min-h-40 [direction:rtl] [writing-mode:vertical-lr]'
        : 'w-full',
      this.styles.root,
      this.styles.track,
      // No range of Firefox's own (up to one thumb).
      '[&::-moz-range-progress]:bg-transparent',
      from
        ? [
            // The first draws the range between the thumbs' centres.
            '[--sc-range-slider-from:calc(var(--sc-slider-thumb)/2_+_(100%_-_var(--sc-slider-thumb))_*_var(--sc-range-slider-from-value))]',
            '[--sc-range-slider-to:calc(var(--sc-slider-thumb)/2_+_(100%_-_var(--sc-slider-thumb))_*_var(--sc-range-slider-to-value))]',
            vertical
              ? '[--sc-range-slider-fill:linear-gradient(to_top,transparent_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-to),transparent_var(--sc-range-slider-to))]'
              : '[--sc-range-slider-fill:linear-gradient(to_right,transparent_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-to),transparent_var(--sc-range-slider-to))] rtl:[--sc-range-slider-fill:linear-gradient(to_left,transparent_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-from),var(--primary)_var(--sc-range-slider-to),transparent_var(--sc-range-slider-to))]',
            '[&::-webkit-slider-runnable-track]:bg-(image:--sc-range-slider-fill) [&::-moz-range-track]:bg-(image:--sc-range-slider-fill)',
          ]
        : // The second's track is the first's: none of its own.
          '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
      // The browsers' own thumb off; the style's over it.
      '[&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none',
      this.styles.thumb,
      this.classInput(),
    );
  });

  constructor() {
    const leave = this.slider.register(this.element);
    inject(DestroyRef).onDestroy(leave);
  }

  // The browser's step: kept on this side of the other thumb.
  private onInput(): void {
    const raw = this.element.valueAsNumber;
    const kept = this.slider.setThumb(this.index(), raw);
    // At the other thumb, the value stays: the range shows it back.
    if (kept !== raw) this.element.value = String(kept);
  }

  /** Right to left, across: Safari's arrows mirrored (rtlArrowStep). */
  private onKeydown(event: KeyboardEvent): void {
    const sign = rtlArrowStep(
      event,
      this.slider.orientation(),
      this.direction.value,
    );
    if (!sign) return;
    event.preventDefault();
    this.slider.setThumb(
      this.index(),
      this.current() + sign * this.slider.step(),
    );
  }
}
