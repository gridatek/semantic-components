import { Directionality } from '@angular/cdk/bidi';
import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScColorPickerNext } from './color-picker-next';
import {
  SC_COLOR_CHANNELS,
  type ScColorChannel,
  scColorCss,
  scFormatChannel,
} from './color-space';

/** A checkerboard: what shows through a transparent colour. */
export const SC_COLOR_CHECKERBOARD =
  'repeating-conic-gradient(#d4d4d8 0% 25%, #fff 0% 50%) 0 0 / 10px 10px';

/** Stops sampled along a track. */
const STOPS = 12;

/**
 * One channel — `scColorPickerNextSlider="hue"` (any of the space's, and
 * alpha) — on your `input`: a native range on a track painted through the
 * channel; horizontal (as the text reads) or vertical. The arrows step one,
 * Shift ten, Page Up / Down a tenth, Home / End its ends; it reads its value
 * ("120°"). Name it.
 */
@Directive({
  selector: 'input[scColorPickerNextSlider]',
  host: {
    'data-slot': 'color-picker-slider',
    type: 'range',
    '[attr.data-channel]': 'channel()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-valuetext]': 'valueText()',
    '[min]': 'info().min',
    '[max]': 'info().max',
    '[step]': 'channel() === "chroma" ? 0.001 : info().step',
    '[value]': 'picker.channel(channel())',
    '[disabled]': 'picker.disabled()',
    '[attr.aria-readonly]': 'picker.readonly() || null',
    '[style.--sc-color-slider-background]': 'track()',
    '[style.--sc-color-picker-thumb]': 'picker.css()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(change)': 'onChange()',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'picker.touch.emit()',
  },
})
export class ScColorPickerNextSlider {
  private readonly picker = inject(ScColorPickerNext);
  private readonly directionality = inject(Directionality);
  private readonly locale = inject(LOCALE_ID);
  private readonly styles = injectStyle().colorPicker;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly channel = input.required<ScColorChannel>({
    alias: 'scColorPickerNextSlider',
  });
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** Your words for its value; by default its value ("120°"). */
  readonly ariaValueText = input<string | null>(null, {
    alias: 'aria-valuetext',
  });

  private readonly info = computed(() => SC_COLOR_CHANNELS[this.channel()]);
  private readonly valueText = computed(
    () =>
      this.ariaValueText() ??
      scFormatChannel(
        this.channel(),
        this.picker.channel(this.channel()),
        this.locale,
      ),
  );

  /** The channel's colours, from its start to its end: the way the range runs. */
  private readonly track = computed(() => {
    const channel = this.channel();
    const { min, max } = this.info();
    const space = this.picker.space();
    const values = this.picker.shown();
    const direction =
      this.orientation() === 'vertical'
        ? 'to top'
        : this.directionality.value === 'rtl'
          ? 'to left'
          : 'to right';
    if (channel === 'alpha') {
      const opaque = scColorCss(space, { ...values, alpha: 100 });
      const clear = scColorCss(space, { ...values, alpha: 0 });
      return `linear-gradient(${direction}, ${clear}, ${opaque}), ${SC_COLOR_CHECKERBOARD}`;
    }
    const stops = Array.from({ length: STOPS + 1 }, (_, i) =>
      scColorCss(space, {
        ...values,
        [channel]: min + ((max - min) * i) / STOPS,
        alpha: 100,
      }),
    );
    return `linear-gradient(${direction}, ${stops.join(', ')})`;
  });

  private readonly class = computed(() =>
    cn(
      'cursor-pointer appearance-none [background:var(--sc-color-slider-background)] outline-none disabled:pointer-events-none disabled:opacity-50',
      this.orientation() === 'vertical'
        ? 'h-full w-3 [direction:rtl] [writing-mode:vertical-lr]'
        : 'h-3 w-full',
      '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-(--sc-color-picker-thumb) [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]',
      '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-(--sc-color-picker-thumb) [&::-moz-range-thumb]:shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.styles.slider,
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerNextSlider');
  }

  private onInput(event: Event): void {
    if (this.picker.readonly()) {
      // Read-only: back where it was.
      (event.target as HTMLInputElement).value = String(
        this.picker.channel(this.channel()),
      );
      return;
    }
    this.picker.set(
      { [this.channel()]: Number((event.target as HTMLInputElement).value) },
      false,
    );
  }

  private onChange(): void {
    if (!this.picker.readonly() && !this.picker.disabled())
      this.picker.commit();
  }

  /** Shift + arrow: ten steps; Page Up / Down: a tenth of the range. */
  private onKeydown(event: KeyboardEvent): void {
    const { min, max, step } = this.info();
    const value = this.picker.channel(this.channel());
    const tenth = (max - min) / 10;
    const rtl =
      this.orientation() === 'horizontal' &&
      this.directionality.value === 'rtl';
    const moves: Record<string, number> = event.shiftKey
      ? {
          ArrowUp: step * 10,
          ArrowRight: (rtl ? -step : step) * 10,
          ArrowDown: -step * 10,
          ArrowLeft: (rtl ? step : -step) * 10,
        }
      : { PageUp: tenth, PageDown: -tenth };
    const move = moves[event.key];
    if (move === undefined) return;
    event.preventDefault();
    this.picker.set({ [this.channel()]: value + move });
  }
}
