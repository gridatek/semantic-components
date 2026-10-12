import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScProgress, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * A thin bar along the top of the content while the document downloads —
 * also after the first pages show, since pdf.js renders before the whole
 * file has arrived. Hidden when the size isn't known (the loading state
 * covers that). Place it inside `scPdfViewerContent`.
 */
@Component({
  selector: 'sc-pdf-viewer-loading-bar',
  imports: [ScProgress],
  template: `
    @if (percent() !== null) {
      <div
        scProgress
        class="h-1 rounded-none bg-transparent"
        [value]="percent()"
        [aria-label]="ariaLabel()"
      ></div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-loading-bar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerLoadingBar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name of the progress bar. */
  readonly ariaLabel = input('Loading document', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 top-0 z-20 block',
      this.classInput(),
    ),
  );

  /** Download progress in percent, while it's known and not complete. */
  protected readonly percent = computed(() => {
    const progress = this.pdfViewer.loadProgress();
    return progress !== null && progress < 1 && !this.pdfViewer.error()
      ? Math.round(progress * 100)
      : null;
  });
}
