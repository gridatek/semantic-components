import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { encode } from 'uqr';

/** Error correction: how much of the code can be damaged and still read. */
export type ScQrCodeEcc = 'L' | 'M' | 'Q' | 'H';

interface ScQrCodeEncoded {
  modules: boolean[][];
  error: string | null;
}

const EMPTY: ScQrCodeEncoded = { modules: [], error: null };

/**
 * The dark modules as one SVG path: each run of dark modules in a row is one
 * rectangle. One element at any size, with no seams between modules.
 */
function modulesPath(modules: readonly (readonly boolean[])[]): string {
  let path = '';
  modules.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (!row[x]) {
        x++;
        continue;
      }
      const start = x;
      while (x < row.length && row[x]) x++;
      path += `M${start} ${y}h${x - start}v1h${start - x}z`;
    }
  });
  return path;
}

/**
 * A QR code, drawn as SVG (encoded with `uqr`). Dark modules use the text
 * color and the quiet zone the background — dark on white by default, in
 * both themes, since many scanners can't read inverted codes. Recolor with
 * classes (`bg-blue-100 text-blue-700`), keeping strong contrast.
 *
 * A value too long to encode renders nothing and sets `error()`.
 */
@Component({
  selector: 'svg[scQrCode]',
  exportAs: 'scQrCode',
  template: `
    @if (path(); as path) {
      <svg:path
        [attr.d]="path"
        fill="currentColor"
        shape-rendering="crispEdges"
      />
    }
  `,
  host: {
    'data-slot': 'qr-code',
    role: 'img',
    xmlns: 'http://www.w3.org/2000/svg',
    '[attr.viewBox]': 'viewBox()',
    '[attr.data-invalid]': 'error() ? "" : null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScQrCode {
  constructor() {
    ɵwarnIfUnnamed('scQrCode');
  }

  readonly nativeElement =
    inject<ElementRef<SVGSVGElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The text to encode (a URL, `mailto:`, `WIFI:`…). */
  readonly value = input.required<string>();
  readonly ecc = input<ScQrCodeEcc>('M');
  /** Light margin around the code, in modules. The QR spec asks for 4. */
  readonly quietZone = input(4);
  /**
   * Smallest QR version (1–40) to use. Raise it to keep the code the same
   * size while the value changes length.
   */
  readonly minVersion = input(1);
  /** Use a higher error correction when it fits without a larger code. */
  readonly boostEcc = input(false, { transform: booleanAttribute });
  /** Mask pattern (0–7); chosen automatically by default. */
  readonly mask = input<number | undefined>(undefined);

  private readonly encoded = computed((): ScQrCodeEncoded => {
    const value = this.value();
    if (!value) return EMPTY;
    try {
      const { data } = encode(value, {
        ecc: this.ecc(),
        border: this.quietZone(),
        minVersion: this.minVersion(),
        boostEcc: this.boostEcc(),
        maskPattern: this.mask() ?? -1,
      });
      return { modules: data, error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { modules: [], error: message };
    }
  });

  /** The modules (`true` = dark), quiet zone included. */
  readonly modules = computed(() => this.encoded().modules);
  /** Why the value can't be encoded (e.g. `'Data too long'`), or `null`. */
  readonly error = computed(() => this.encoded().error);
  /** Whether there's a code to show. */
  readonly valid = computed(() => this.modules().length > 0);
  /** The dark modules as an SVG path, in a `modules × modules` box. */
  readonly path = computed(() => modulesPath(this.modules()));

  protected readonly viewBox = computed(() => {
    const size = this.modules().length;
    return `0 0 ${size} ${size}`;
  });

  protected readonly class = computed(() =>
    cn('inline-block size-52 bg-white text-black', this.classInput()),
  );
}
