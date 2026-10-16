import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScColorPicker } from './color-picker';

/** A checkerboard: what shows through a transparent colour. */
export const CHECKERBOARD =
  'repeating-conic-gradient(#d4d4d8 0% 25%, #fff 0% 50%) 0 0 / 10px 10px';

/**
 * One channel of the colour — `scColorPickerSlider="hue"` (0–360) or
 * `"alpha"` (0–1) — on your `input`, a native range on its track: the hue's
 * rainbow, or the colour fading out. Name it.
 */
@Directive({
  selector: 'input[scColorPickerSlider]',
  host: {
    'data-slot': 'color-picker-slider',
    type: 'range',
    min: '0',
    '[max]': 'channel() === "hue" ? 360 : 1',
    '[step]': 'channel() === "hue" ? 1 : 0.01',
    '[value]': 'current()',
    '[disabled]': 'picker.disabled()',
    '[style.--track]': 'track()',
    '[style.--thumb]': 'thumb()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(blur)': 'picker.touch.emit()',
  },
})
export class ScColorPickerSlider {
  protected readonly picker = inject(ScColorPicker);

  readonly channel = input.required<'hue' | 'alpha'>({
    alias: 'scColorPickerSlider',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly current = computed(() => {
    const { h, a } = this.picker.hsva();
    return this.channel() === 'hue' ? Math.round(h) : a;
  });

  protected readonly track = computed(() => {
    if (this.channel() === 'hue') {
      return 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)';
    }
    const { r, g, b } = this.picker.rgba();
    return `linear-gradient(to right, rgb(${r} ${g} ${b} / 0), rgb(${r} ${g} ${b})), ${CHECKERBOARD}`;
  });

  /** The thumb: the hue, or the colour as it is. */
  protected readonly thumb = computed(() =>
    this.channel() === 'hue'
      ? `hsl(${this.picker.hsva().h} 100% 50%)`
      : this.picker.css(),
  );

  protected readonly class = computed(() =>
    cn(
      'h-3 w-full cursor-pointer appearance-none rounded-full [background:var(--track)] outline-none disabled:pointer-events-none disabled:opacity-50',
      '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-(--thumb) [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]',
      '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-(--thumb) [&::-moz-range-thumb]:shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerSlider');
  }

  protected onInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.picker.set(this.channel() === 'hue' ? { h: value } : { a: value });
  }
}
