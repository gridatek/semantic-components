import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfZoomLevel } from './pdf-viewer-types';

const NAMED: readonly string[] = [
  'auto',
  'page-actual',
  'page-fit',
  'page-width',
];

/**
 * Binds a `select` to the zoom (`#zoom="scPdfViewerZoomSelect"`). Write its
 * options: `auto`, `page-actual`, `page-fit`, `page-width`, and one per
 * `zoom.scales()` (`1.5` for 150%). A zoom between them (wheel, pinch) is
 * `zoom.customZoom()` — add an option for it while it's set
 * (`zoom.customPercent()`). Give the select an `aria-label`.
 */
@Directive({
  selector: 'select[scPdfViewerZoomSelect]',
  exportAs: 'scPdfViewerZoomSelect',
  host: {
    'data-slot': 'pdf-viewer-zoom-select',
    '[class]': 'class()',
    '(change)': 'onChange($event)',
  },
})
export class ScPdfViewerZoomSelect {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  /** The preset scales to offer (as pdf.js's viewer does). */
  readonly scales = input<readonly number[]>([
    0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4,
  ]);

  protected readonly class = computed(() => cn(this.classInput()));

  /** The zoom as an option value. */
  readonly value = computed(() => String(this.pdfViewer.zoom()));

  /** A scale that isn't a preset (as an option value), or null. */
  readonly customZoom = computed(() => {
    const zoom = this.pdfViewer.zoom();
    return typeof zoom === 'number' && !this.scales().includes(zoom)
      ? String(zoom)
      : null;
  });

  /** `customZoom()` in percent, rounded. */
  readonly customPercent = computed(() =>
    Math.round(Number(this.customZoom() ?? 0) * 100),
  );

  constructor() {
    const select =
      inject<ElementRef<HTMLSelectElement>>(ElementRef).nativeElement;
    // After the options render — the custom one appears in the same pass —
    // select the zoom's.
    afterRenderEffect(() => {
      select.value = this.value();
    });
  }

  protected onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (NAMED.includes(value)) {
      this.pdfViewer.setZoom(value as ScPdfZoomLevel);
      return;
    }
    const scale = parseFloat(value);
    if (!isNaN(scale)) this.pdfViewer.setZoom(scale);
  }
}
