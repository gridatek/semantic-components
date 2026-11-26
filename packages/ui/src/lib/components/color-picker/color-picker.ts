import {
  DOCUMENT,
  Directive,
  HostAttributeToken,
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
import { cn } from 'cn';
import { SC_FIELD } from '../field';
import {
  SC_COLOR_CHANNELS,
  SC_COLOR_SPACE_FORMAT,
  type ScColorChannel,
  type ScColorFormat,
  type ScColorGamut,
  type ScColorSpace,
  type ScColorValues,
  scColorCss,
  scColorFormat,
  scColorFromRgb,
  scColorInGamut,
  scColorIntoGamut,
  scColorToRgb,
  scParseHsl,
  scParseOklch,
} from './color-space';

/** The EyeDropper API, where the browser has it. */
interface ScEyeDropper {
  open(): Promise<{ sRGBHex: string }>;
}

const BLACK: ScColorValues = {
  hue: 0,
  saturation: 0,
  brightness: 0,
  lightness: 0,
  chroma: 0,
  red: 0,
  green: 0,
  blue: 0,
  alpha: 100,
};

/**
 * A colour, picked: on an area, sliders, fields, presets, the screen. Its
 * value is a CSS colour — any goes in — written in `format` (by default as
 * its `space` writes it); a `[formField]`. `space` decides the channels the
 * parts edit (HSV, HSL, sRGB, OKLCH); `gamut` the colours it holds. A group:
 * name it (its field's label, or `aria-label`). `#picker="scColorPicker"`:
 * `channel()`, `set()`, `setColor()`, `css()`, `pickFromScreen()`.
 */
@Directive({
  selector: '[scColorPicker]',
  exportAs: 'scColorPicker',
  host: {
    'data-slot': 'color-picker',
    role: 'group',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-out-of-gamut]': 'outOfGamut() || null',
    '[style.--sc-color-picker-color]': 'css()',
    '[class]': 'class()',
  },
})
export class ScColorPicker implements FormValueControl<string> {
  private readonly document = inject(DOCUMENT);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The colour, as CSS: two-way, or `[formField]`. Empty: none. */
  readonly value = model('');
  /** The channels the parts edit. */
  readonly space = input<ScColorSpace>('hsv');
  /** How the value is written; by default as the space writes it (hsv: hex). */
  readonly format = input<ScColorFormat | null>(null);
  /** The colours it holds: sRGB, Display P3, or any (OKLCH can leave sRGB). */
  readonly gamut = input<ScColorGamut>('srgb');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left (Signal Forms marks it touched). */
  readonly touch = output<void>();
  /** A change finished — a drag let go, a key, a pick, a field committed: the value, to save. */
  readonly valueCommit = output<string>();

  /** Its channels, in their units — as asked (during a drag, maybe out of the gamut). */
  readonly values = signal<ScColorValues>(BLACK);
  /** What was asked is out of the gamut: the value is the nearest it holds. */
  readonly outOfGamut = signal(false);
  /** The colour as it is: in the gamut. */
  readonly shown = computed(() =>
    scColorIntoGamut(this.space(), this.values(), this.gamut()),
  );
  /** The colour as CSS (also `--sc-color-picker-color`). */
  readonly css = computed(() => scColorCss(this.space(), this.shown()));
  /** The browser can pick a colour from the screen. */
  readonly canPickFromScreen = signal(
    'EyeDropper' in (this.document.defaultView ?? {}),
  );
  readonly writes = computed(
    () => this.format() ?? SC_COLOR_SPACE_FORMAT[this.space()],
  );

  private readonly labelledBy = computed(() =>
    this.field && !this.ariaLabel ? `${this.field.id()}-label` : null,
  );
  private readonly class = computed(() => cn('block', this.classInput()));

  /** The value last written: one from outside differs. */
  private written: string | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    // A new space: the colour's channels in it.
    let space = this.space();
    effect(() => {
      const next = this.space();
      untracked(() => {
        if (next === space) return;
        const values = this.values();
        this.values.set(
          scColorFromRgb(
            next,
            scColorToRgb(space, values),
            values.alpha ?? 100,
            values,
          ),
        );
        space = next;
      });
    });
    // From outside: read in.
    effect(() => {
      const value = this.value();
      untracked(() => {
        if (value === this.written) return;
        const read = this.parse(value);
        if (read) {
          this.values.set(read);
          this.outOfGamut.set(false);
        }
      });
    });
    // A new space or format: the value, written again.
    effect(() => {
      this.writes();
      this.space();
      untracked(() => {
        if (this.value()) this.write();
      });
    });
  }

  /** A channel's value, in its units. */
  channel(name: ScColorChannel): number {
    return this.values()[name] ?? 0;
  }

  /**
   * Changes some channels (held to their ranges). A drag passes `commit`
   * false: out of the gamut, the thumb follows while the value is the
   * nearest colour; `commit()` then moves it there.
   */
  set(change: ScColorValues, commit = true): void {
    if (this.disabled() || this.readonly()) return;
    const next: Record<string, number> = { ...this.values() };
    for (const [name, value] of Object.entries(change)) {
      const info = SC_COLOR_CHANNELS[name as ScColorChannel];
      next[name] = Math.min(info.max, Math.max(info.min, value ?? 0));
    }
    this.values.set(next);
    this.outOfGamut.set(!scColorInGamut(this.space(), next, this.gamut()));
    this.write();
    if (commit) this.commit();
  }

  /** The change finished: into the gamut, the value told (`valueCommit`). */
  commit(): void {
    if (this.outOfGamut()) {
      this.values.set(this.shown());
      this.outOfGamut.set(false);
    }
    this.valueCommit.emit(this.value());
  }

  /** Takes any CSS colour; false (and nothing changes) if it is none. */
  setColor(css: string): boolean {
    if (this.disabled() || this.readonly()) return false;
    const read = this.parse(css);
    if (!read) return false;
    this.values.set(read);
    this.outOfGamut.set(false);
    this.write();
    this.commit();
    return true;
  }

  /** Any CSS colour, as this space's channels — or null if it is none. */
  parse(css: string): ScColorValues | null {
    const keep = this.values();
    const space = this.space();
    // oklch() as itself: its wide colours kept.
    const oklch = scParseOklch(css);
    if (oklch) {
      return space === 'oklch'
        ? { ...oklch, hue: (oklch.chroma ?? 0) < 0.0005 ? keep.hue : oklch.hue }
        : scColorFromRgb(
            space,
            scColorToRgb('oklch', oklch),
            oklch.alpha ?? 100,
            keep,
          );
    }
    // hsl() as itself: exact, the same in every browser.
    const hsl = scParseHsl(css);
    if (hsl) {
      return space === 'hsl'
        ? hsl
        : scColorFromRgb(
            space,
            scColorToRgb('hsl', hsl),
            hsl.alpha ?? 100,
            keep,
          );
    }
    const rgba = this.read(css);
    return rgba ? scColorFromRgb(space, rgba, rgba.a * 100, keep) : null;
  }

  /** Picks a colour from the screen (where the browser can). */
  async pickFromScreen(): Promise<void> {
    const view = this.document.defaultView as
      (Window & { EyeDropper?: new () => ScEyeDropper }) | null;
    if (!view?.EyeDropper || this.disabled() || this.readonly()) return;
    try {
      const { sRGBHex } = await new view.EyeDropper().open();
      this.setColor(sRGBHex);
    } catch {
      // Cancelled (Escape).
    }
  }

  private write(): void {
    this.written = scColorFormat(this.space(), this.shown(), this.writes());
    this.value.set(this.written);
  }

  /** Any CSS colour, read by the browser into sRGB (0–1) — or null. */
  private read(
    css: string,
  ): { r: number; g: number; b: number; a: number } | null {
    const text = css.trim();
    // On the server there is no CSS (nor canvas): read once the browser takes over.
    if (!text || !globalThis.CSS?.supports('color', text)) return null;
    const context = this.canvas();
    if (!context) return null;
    context.fillStyle = '#000';
    context.fillStyle = text;
    const read = String(context.fillStyle);
    const hex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(read);
    if (hex) {
      const [r, g, b] = hex.slice(1).map((part) => parseInt(part, 16) / 255);
      return { r, g, b, a: 1 };
    }
    const rgba = /^rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)$/.exec(
      read,
    );
    if (rgba) {
      const [r, g, b, a = '1'] = rgba.slice(1);
      return { r: +r / 255, g: +g / 255, b: +b / 255, a: +a };
    }
    // Another space (lab(), color()…): drawn, one pixel read back.
    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    return { r: r / 255, g: g / 255, b: b / 255, a: a / 255 };
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
