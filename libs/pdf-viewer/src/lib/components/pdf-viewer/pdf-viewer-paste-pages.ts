import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Pastes the copied / cut pages after the current page. Use on a
 * `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerPastePages]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.pastePages()',
  },
})
export class ScPdfViewerPastePages {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(
        () => !this.pdfViewer.pageClipboard() || this.pdfViewer.organizing(),
      ),
    );
  }
}
