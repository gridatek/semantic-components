import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScBarcodeScannerNext } from './barcode-scanner-next';

/**
 * Each code in the camera's frame, outlined where it is — over a video that
 * fills the scanner (`object-cover`). Decorative.
 */
@Component({
  selector: 'svg[scBarcodeScannerNextOverlay]',
  template: `
    @for (shape of shapes(); track $index) {
      <svg:polygon
        [attr.points]="shape"
        fill="currentColor"
        fill-opacity="0.2"
        stroke="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    }
  `,
  host: {
    'data-slot': 'barcode-scanner-overlay',
    'aria-hidden': 'true',
    // As the video: its picture, fitted the same way.
    '[attr.viewBox]': 'viewBox()',
    preserveAspectRatio: 'xMidYMid slice',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScBarcodeScannerNextOverlay {
  private readonly scanner = inject(ScBarcodeScannerNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly viewBox = computed(() => {
    const { width, height } = this.scanner.ɵsize();
    return `0 0 ${width || 1} ${height || 1}`;
  });

  protected readonly shapes = computed(() =>
    this.scanner
      .codes()
      .map((code) =>
        code.cornerPoints.map(({ x, y }) => `${x},${y}`).join(' '),
      ),
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 size-full text-emerald-400',
      this.scanner.camera() === 'user' && '-scale-x-100',
      this.classInput(),
    ),
  );
}
