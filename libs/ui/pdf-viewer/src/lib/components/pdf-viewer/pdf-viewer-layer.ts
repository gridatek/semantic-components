import { Directive, computed, effect, inject, input } from '@angular/core';
import { ScCheckbox, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfLayer } from './pdf-viewer-types';

/**
 * Shows or hides a layer of `viewer.layers()` (optional content); the pages
 * redraw. Use on a `scCheckbox`, labelled with the layer's name.
 */
@Directive({
  selector: 'input[scCheckbox][scPdfViewerLayer]',
  host: {
    'data-slot': 'pdf-viewer-layer',
    '[class]': 'class()',
  },
})
export class ScPdfViewerLayer {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly layer = input.required<ScPdfLayer>({ alias: 'scPdfViewerLayer' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const checkbox = inject(ScCheckbox);
    effect(() => checkbox.checked.set(this.layer().visible));
    checkbox.checked.subscribe((visible) => {
      if (visible !== this.layer().visible) {
        this.pdfViewer.setLayerVisible(this.layer().id, visible);
      }
    });
  }
}
