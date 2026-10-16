import { DOCUMENT } from '@angular/common';
import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '@semantic-components/ui';
import {
  type ScColorFormat,
  type ScHsva,
  type ScRgba,
  formatColor,
  hsvaToRgba,
  rgbaToHsva,
} from './color';

/** The EyeDropper API, where the browser has it. */
interface EyeDropperApi {
  open(): Promise<{ sRGBHex: string }>;
}

/**
 * A colour, picked: on an area, sliders, a field, swatches, the screen. Its
 * value is a CSS colour, written in `format`; a `[formField]`. Any CSS
 * colour goes in.
 */
@Directive({
  selector: '[scColorPickerNext]',
  exportAs: 'scColorPickerNext',
  host: {
    'data-slot': 'color-picker',
    '[attr.data-disabled]': 'disabled() || null',
    '[style.--color]': 'css()',
    '[class]': 'class()',
  },
})
export class ScColorPickerNext implements FormValueControl<string> {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model('');
  /** How the value is written: `#rrggbb(aa)`, `rgb()`, `hsl()` or `oklch()`. */
  readonly format = input<ScColorFormat>('hex');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The colour: hue, saturation, value, alpha. */
  readonly hsva = signal<ScHsva>({ h: 0, s: 0, v: 0, a: 1 });
  readonly rgba = computed(() => hsvaToRgba(this.hsva()));
  /** The colour, as CSS (also `--color` on the picker). */
  readonly css = computed(() => formatColor(this.hsva(), 'rgb'));

  /** The browser can pick a colour from the screen. */
  readonly canPickFromScreen = signal(
    'EyeDropper' in (this.document.defaultView ?? {}),
  );

  protected readonly class = computed(() => cn('block', this.classInput()));

  /** The value last written: one from outside differs. */
  private written: string | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    // From outside: read in.
    effect(() => {
      const value = this.value();
      if (value === this.written) return;
      untracked(() => {
        const rgba = this.parse(value);
        if (rgba) this.hsva.set(rgbaToHsva(rgba, this.hsva()));
      });
    });
    // A new format: the value, written again.
    effect(() => {
      const format = this.format();
      untracked(() => {
        if (this.value()) this.write(this.hsva(), format);
      });
    });
  }

  /** Changes part of the colour. */
  set(change: Partial<ScHsva>): void {
    if (this.disabled()) return;
    const next = { ...this.hsva(), ...change };
    this.hsva.set(next);
    this.write(next, this.format());
  }

  /** Takes any CSS colour; false (and nothing changes) if it is none. */
  setColor(css: string): boolean {
    const rgba = this.parse(css);
    if (!rgba) return false;
    this.set(rgbaToHsva(rgba, this.hsva()));
    return true;
  }

  /** Any CSS colour, in sRGB — or null if it is not one. */
  parse(css: string): ScRgba | null {
    const text = css.trim();
    if (!text || !CSS.supports('color', text)) return null;
    const context = this.canvas();
    if (!context) return null;
    // The browser reads it: an sRGB colour comes back as #rrggbb or rgba().
    context.fillStyle = '#000';
    context.fillStyle = text;
    const read = String(context.fillStyle);
    const hex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(read);
    if (hex) {
      const [r, g, b] = hex.slice(1).map((part) => parseInt(part, 16));
      return { r, g, b, a: 1 };
    }
    const rgba = /^rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)$/.exec(
      read,
    );
    if (rgba) {
      const [r, g, b, a = '1'] = rgba.slice(1);
      return { r: +r, g: +g, b: +b, a: Math.round(+a * 100) / 100 };
    }
    // Another space (oklch(), lab()…): drawn, one pixel read back.
    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: Math.round((a / 255) * 100) / 100 };
  }

  /** Picks a colour from the screen (where the browser can). */
  async pickFromScreen(): Promise<void> {
    const view = this.document.defaultView as
      (Window & { EyeDropper?: new () => EyeDropperApi }) | null;
    if (!view?.EyeDropper || this.disabled()) return;
    try {
      const { sRGBHex } = await new view.EyeDropper().open();
      this.setColor(sRGBHex);
    } catch {
      // Cancelled (Escape).
    }
  }

  private write(hsva: ScHsva, format: ScColorFormat): void {
    this.written = formatColor(hsva, format);
    this.value.set(this.written);
  }

  private canvas(): CanvasRenderingContext2D | null {
    if (!this.context) {
      const canvas = this.document.createElement('canvas');
      canvas.width = canvas.height = 1;
      this.context = canvas.getContext('2d', { willReadFrequently: true });
    }
    return this.context;
  }
}
