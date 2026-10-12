import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Downloads the selected pages as a new PDF, with their annotations,
 * comments and form data. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerExportPages]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.exportPages(pdfViewer.pageSelection())',
  },
})
export class ScPdfViewerExportPages {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.pageSelection().length),
    );
  }
}
