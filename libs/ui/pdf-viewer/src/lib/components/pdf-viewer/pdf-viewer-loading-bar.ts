import { Directive, computed, inject, input } from '@angular/core';
import { ScProgress, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * A thin bar along the top of the content while the document downloads —
 * also after the first pages show, since pdf.js renders before the whole
 * file has arrived; hidden when the size isn't known. Use on a `scProgress`
 * inside `scPdfViewerContent`, with its track and range, and give it an
 * `aria-label`.
 */
@Directive({
  selector: '[scProgress][scPdfViewerLoadingBar]',
  host: {
    'data-slot': 'pdf-viewer-loading-bar',
    '[hidden]': 'percent() === null',
  },
})
export class ScPdfViewerLoadingBar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  /** Download progress in percent, while it's known and not complete. */
  protected readonly percent = computed(() => {
    const progress = this.pdfViewer.loadProgress();
    return progress !== null && progress < 1 && !this.pdfViewer.error()
      ? Math.round(progress * 100)
      : null;
  });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 top-0 z-20 [&>[data-slot=progress-track]]:rounded-none [&>[data-slot=progress-track]]:bg-transparent',
      this.classInput(),
    ),
  );

  constructor() {
    // Into the progress bar's own inputs, so its classes merge with ours.
    const progress = inject(ScProgress);
    bindInput(progress.classInput, this.class);
    bindInput(progress.value, this.percent);
  }
}
