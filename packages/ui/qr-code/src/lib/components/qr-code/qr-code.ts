import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { cn } from 'cn';
import {
  type ScQrCodeErrorCorrection,
  qrModules,
  qrPath,
} from './qr-code-encode';

/**
 * A QR code, drawn as one SVG path. Dark on white in both themes — many
 * scanners can't read an inverted code; recolour with classes
 * (`bg-blue-100 text-blue-700`), keeping strong contrast, and size it with
 * `size-*`. Name it (`aria-label`): say where it leads. A value too long to
 * encode draws nothing — its place kept, hidden — and sets `error()`.
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
    role: 'img',
    xmlns: 'http://www.w3.org/2000/svg',
    '[attr.viewBox]': 'viewBox()',
    '[attr.data-invalid]': 'error() ? "" : null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScQrCode {
  readonly classInput = input<string>('', { alias: 'class' });
  /** What it encodes: a URL, `mailto:`, `WIFI:`… */
  readonly value = input.required<string>();
  /** How much can be damaged and still read: L 7 %, M 15 %, Q 25 %, H 30 %. */
  readonly errorCorrection = input<ScQrCodeErrorCorrection>('M');
  /** The quiet zone round it, in modules (the spec asks for 4). */
  readonly margin = input(4);

  private readonly encoded = computed(() => {
    const value = this.value();
    if (!value) return { modules: [] as boolean[][], error: null };
    try {
      const modules = qrModules(value, {
        errorCorrection: this.errorCorrection(),
        margin: this.margin(),
      });
      return { modules, error: null };
    } catch (error) {
      return {
        modules: [] as boolean[][],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

  /** Why the value can't be encoded (`'Data too long'`), or null. */
  readonly error = computed(() => this.encoded().error);

  private readonly path = computed(() => qrPath(this.encoded().modules));

  private readonly viewBox = computed(() => {
    const n = this.encoded().modules.length;
    return n ? `0 0 ${n} ${n}` : null;
  });

  private readonly class = computed(() =>
    cn(
      'inline-block size-52 bg-white text-black',
      // Nothing to draw: its place kept, no empty white box.
      !this.path() && 'invisible',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scQrCode');
  }
}
