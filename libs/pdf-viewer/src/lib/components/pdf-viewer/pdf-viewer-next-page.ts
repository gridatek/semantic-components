import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Goes to the next page; disabled on the last one. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerNextPage]',
  host: {
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'pdfViewer.goToNextPage()',
  },
})
export class ScPdfViewerNextPage {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name — the button usually shows only an icon. */
  readonly ariaLabel = input('Next page', { alias: 'aria-label' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.canGoNext()),
    );
  }
}
