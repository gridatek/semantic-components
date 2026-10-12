import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens and closes the find bar. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerFindToggle]',
  host: {
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.findOpen()',
    '(click)': 'pdfViewer.toggleFind()',
  },
})
export class ScPdfViewerFindToggle {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
