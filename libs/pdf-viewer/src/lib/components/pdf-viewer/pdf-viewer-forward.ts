import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Forward again after going back; disabled when there's nothing to go
 * forward to. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerForward]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.goForward()',
  },
})
export class ScPdfViewerForward {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.canGoForward()),
    );
  }
}
