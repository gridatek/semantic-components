import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Where the find results are announced (`role="status"`). Write its text
 * from `viewer.findState()`, `findCurrentMatchIndex()` and
 * `findTotalMatches()` — e.g. "3 of 12", "Phrase not found".
 * `data-state` is the find state (`not-found` is styled destructive).
 */
@Directive({
  selector: '[scPdfViewerFindResultsInfo]',
  host: {
    'data-slot': 'pdf-viewer-find-results-info',
    role: 'status',
    '[attr.data-state]': 'pdfViewer.findState()',
    '[class]': 'class()',
  },
})
export class ScPdfViewerFindResultsInfo {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-sm tabular-nums whitespace-nowrap data-[state=not-found]:text-destructive',
      this.classInput(),
    ),
  );
}
