import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Goes to a page (e.g. a thumbnail). `aria-current="page"` and
 * `data-current` on the current page's. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerNextGoToPage]',
  host: {
    '[attr.aria-current]': 'current() ? "page" : null',
    '[attr.data-current]': 'current() || null',
    '[class]': 'class()',
    '(click)': 'pdfViewer.jumpToPage(page())',
  },
})
export class ScPdfViewerNextGoToPage {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly page = input.required<number>({ alias: 'scPdfViewerNextGoToPage' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly current = computed(
    () => this.pdfViewer.currentPage() === this.page(),
  );
  private readonly class = computed(() =>
    cn('data-current:bg-accent', this.classInput()),
  );
}
