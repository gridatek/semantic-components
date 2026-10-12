import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Goes to a page (e.g. a thumbnail). `aria-current="page"` and
 * `data-current` on the current page's. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerGoToPage]',
  host: {
    '[attr.aria-current]': 'current() ? "page" : null',
    '[attr.data-current]': 'current() || null',
    '[class]': 'class()',
    '(click)': 'pdfViewer.goToPage(page())',
  },
})
export class ScPdfViewerGoToPage {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly page = input.required<number>({ alias: 'scPdfViewerGoToPage' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly current = computed(
    () => this.pdfViewer.currentPage() === this.page(),
  );
  protected readonly class = computed(() =>
    cn('data-current:bg-accent', this.classInput()),
  );
}
