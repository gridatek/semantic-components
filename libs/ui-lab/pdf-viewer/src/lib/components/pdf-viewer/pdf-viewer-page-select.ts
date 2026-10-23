import { Directive, computed, effect, inject, input } from '@angular/core';
import { ScCheckbox, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Selects a page for page organisation (`viewer.pageSelection()`). Use on a
 * `scCheckbox` and name it (e.g. "Select page 3").
 */
@Directive({
  selector: 'input[scCheckbox][scPdfViewerPageSelect]',
  host: {
    'data-slot': 'pdf-viewer-page-select',
    '[class]': 'class()',
  },
})
export class ScPdfViewerPageSelect {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly page = input.required<number>({ alias: 'scPdfViewerPageSelect' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const checkbox = inject(ScCheckbox);
    const selected = computed(() =>
      this.pdfViewer.pageSelection().includes(this.page()),
    );
    effect(() => checkbox.checked.set(selected()));
    checkbox.checked.subscribe((checked) => {
      if (checked !== selected()) {
        this.pdfViewer.selectPage(this.page(), checked);
      }
    });
  }
}
