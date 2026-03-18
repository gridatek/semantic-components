import {
  Directive,
  InjectionToken,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  type HSL,
  type HSV,
  type OKLCH,
  type RGB,
  hexToRgb,
  hsvToRgb,
  oklchToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToOklch,
} from './color-utils';

export { type HSV, type RGB, type HSL, type OKLCH } from './color-utils';

export const SC_COLOR_PICKER = new InjectionToken<ScColorPicker>(
  'SC_COLOR_PICKER',
);

@Directive({
  selector: '[scColorPicker]',
  exportAs: 'scColorPicker',
  providers: [{ provide: SC_COLOR_PICKER, useExisting: ScColorPicker }],
  host: {
    'data-slot': 'color-picker',
    '[class]': 'class()',
  },
})
export class ScColorPicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<string>('#000000');
  readonly disabled = input<boolean>(false);

  private readonly _hsv = signal<HSV>({ h: 0, s: 0, v: 0 });
  private _lastInternalHex = '';

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  readonly hsv = computed(() => this._hsv());
  readonly rgb = computed(() => {
    const { h, s, v } = this._hsv();
    return hsvToRgb(h, s, v);
  });
  readonly hsl = computed(() => {
    const { r, g, b } = this.rgb();
    return rgbToHsl(r, g, b);
  });
  readonly hex = computed(() => {
    const { r, g, b } = this.rgb();
    return rgbToHex(r, g, b);
  });
  readonly oklch = computed(() => {
    const { r, g, b } = this.rgb();
    return rgbToOklch(r, g, b);
  });

  constructor() {
    const rgb = hexToRgb(this.value());
    if (rgb) {
      this._hsv.set(rgbToHsv(rgb.r, rgb.g, rgb.b));
    }
    this._lastInternalHex = this.value();

    effect(() => {
      const hex = this.value();
      if (hex.toLowerCase() === this._lastInternalHex.toLowerCase()) return;
      const rgb = hexToRgb(hex);
      if (rgb) {
        this._hsv.set(rgbToHsv(rgb.r, rgb.g, rgb.b));
        this._lastInternalHex = hex;
      }
    });
  }

  setHsv(hsv: Partial<HSV>): void {
    const current = this._hsv();
    const newHsv = { ...current, ...hsv };
    this._hsv.set(newHsv);
    const { r, g, b } = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    const hex = rgbToHex(r, g, b);
    this._lastInternalHex = hex;
    this.value.set(hex);
  }

  setRgb(rgb: Partial<RGB>): void {
    const current = this.rgb();
    const newRgb = { ...current, ...rgb };
    const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
    this.setHsv(hsv);
  }

  setHex(hex: string): void {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      this.setHsv(hsv);
    }
  }

  setOklch(oklch: OKLCH): void {
    const rgb = oklchToRgb(oklch.l, oklch.c, oklch.h);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    this.setHsv(hsv);
  }

  setHue(h: number): void {
    this.setHsv({ h: Math.max(0, Math.min(360, h)) });
  }

  setSaturation(s: number): void {
    this.setHsv({ s: Math.max(0, Math.min(100, s)) });
  }

  setValue(v: number): void {
    this.setHsv({ v: Math.max(0, Math.min(100, v)) });
  }
}
