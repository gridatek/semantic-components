import { Directive, computed, effect, inject, input } from '@angular/core';
import { ScCheckbox } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfLayer } from './pdf-viewer-next-types';

/**
 * Shows or hides a layer of `viewer.layers()` (optional content); the pages
 * redraw. Use on a `scCheckbox`, labelled with the layer's name.
 */
@Directive({
  selector: 'input[scCheckbox][scPdfViewerNextLayer]',
  host: {
    'data-slot': 'pdf-viewer-layer',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextLayer {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly layer = input.required<ScPdfLayer>({
    alias: 'scPdfViewerNextLayer',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

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
