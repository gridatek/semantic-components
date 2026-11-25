import { Directive, computed, effect, inject, input } from '@angular/core';
import { ScCheckbox } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Selects a page for page organisation (`viewer.pageSelection()`). Use on a
 * `scCheckbox` and name it (e.g. "Select page 3").
 */
@Directive({
  selector: 'input[scCheckbox][scPdfViewerNextPageSelect]',
  host: {
    'data-slot': 'pdf-viewer-page-select',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextPageSelect {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly page = input.required<number>({
    alias: 'scPdfViewerNextPageSelect',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

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
