import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Back to where the user was before the last jump (a link, a bookmark, a
 * thumbnail, the page input…); disabled when there's none. Use on a
 * `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerBack]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.goBack()',
  },
})
export class ScPdfViewerBack {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.canGoBack()),
    );
  }
}
