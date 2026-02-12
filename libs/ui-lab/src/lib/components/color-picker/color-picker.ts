import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

export interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

// Token for color picker context
export const SC_COLOR_PICKER = new InjectionToken<ScColorPicker>(
  'SC_COLOR_PICKER',
);

// Color conversion utilities
function hsvToRgb(h: number, s: number, v: number): RGB {
  s = s / 100;
  v = v / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

@Directive({
  selector: '[sc-color-picker]',
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

  // Internal HSV state for smooth picking
  private readonly _hsv = signal<HSV>({ h: 0, s: 0, v: 0 });

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

  constructor() {
    // Initialize HSV from value
    const rgb = hexToRgb(this.value());
    if (rgb) {
      this._hsv.set(rgbToHsv(rgb.r, rgb.g, rgb.b));
    }
  }

  setHsv(hsv: Partial<HSV>): void {
    const current = this._hsv();
    const newHsv = { ...current, ...hsv };
    this._hsv.set(newHsv);
    const { r, g, b } = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    this.value.set(rgbToHex(r, g, b));
  }

  setRgb(rgb: Partial<RGB>): void {
    const current = this.rgb();
    const newRgb = { ...current, ...rgb };
    this._hsv.set(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
    this.value.set(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  setHex(hex: string): void {
    const rgb = hexToRgb(hex);
    if (rgb) {
      this._hsv.set(rgbToHsv(rgb.r, rgb.g, rgb.b));
      this.value.set(hex.startsWith('#') ? hex : `#${hex}`);
    }
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
