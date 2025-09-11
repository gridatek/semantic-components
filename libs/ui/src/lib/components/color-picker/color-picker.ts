import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScColorPickerArea } from './color-picker-area';
import { ScColorPickerInput } from './color-picker-input';
import { ScColorPickerSlider } from './color-picker-slider';
import { ScColorPickerSwatch } from './color-picker-swatch';

@Component({
  selector: 'div[sc-color-picker]',
  imports: [ScColorPickerSwatch, ScColorPickerArea, ScColorPickerInput, ScColorPickerSlider],
  template: `
    <!-- Color preview swatch -->
    <div class="w-full h-10" [color]="color()" sc-color-picker-swatch></div>

    <!-- Saturation/Lightness area -->
    <div
      class="relative w-full h-40"
      [hue]="hue()"
      [saturation]="saturation()"
      [lightness]="lightness()"
      (colorChange)="onAreaChange($event)"
      sc-color-picker-area
    ></div>

    <!-- Hue slider -->
    <div
      class="w-full h-3"
      [value]="hue()"
      [min]="0"
      [max]="360"
      (valueChange)="onHueChange($event)"
      sc-color-picker-slider
      type="hue"
    ></div>

    <!-- Hex input -->
    <input
      class="w-full"
      [value]="color()"
      (valueChange)="onHexChange($event)"
      sc-color-picker-input
      placeholder="#000000"
    />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPicker {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('space-y-3', this.classInput()));

  readonly color = model<string>('#000000');

  protected readonly hue = signal(0);
  protected readonly saturation = signal(0);
  protected readonly lightness = signal(0);

  constructor() {
    // Initialize HSL values from initial color
    this.updateHSLFromHex(this.color());
  }

  protected onAreaChange(event: { saturation: number; lightness: number }): void {
    this.saturation.set(event.saturation);
    this.lightness.set(event.lightness);
    this.updateHexFromHSL();
  }

  protected onHueChange(hue: number): void {
    this.hue.set(hue);
    this.updateHexFromHSL();
  }

  protected onHexChange(hex: string): void {
    this.color.set(hex);
    this.updateHSLFromHex(hex);
  }

  private updateHexFromHSL(): void {
    const hex = this.hslToHex(this.hue(), this.saturation(), this.lightness());
    this.color.set(hex);
  }

  private updateHSLFromHex(hex: string): void {
    const hsl = this.hexToHsl(hex);
    if (hsl) {
      this.hue.set(hsl.h);
      this.saturation.set(hsl.s);
      this.lightness.set(hsl.l);
    }
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  private hslToHex(h: number, s: number, l: number): string {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}
