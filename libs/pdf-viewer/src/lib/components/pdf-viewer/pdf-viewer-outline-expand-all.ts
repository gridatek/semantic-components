import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens every bookmark of the outline. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineExpandAll]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.setOutlineExpanded(true)',
  },
})
export class ScPdfViewerOutlineExpandAll {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
