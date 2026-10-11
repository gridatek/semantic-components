import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/** "3 of 12" / "Phrase not found", announced to screen readers as it changes. */
@Component({
  selector: '[scPdfViewerFindResultsInfo]',
  template: ` {{ pdfViewer.findResultsMessage() }} `,
  host: {
    role: 'status',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerFindResultsInfo {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-sm tabular-nums whitespace-nowrap',
      this.pdfViewer.findState() === 'not-found' && 'text-destructive',
      this.classInput(),
    ),
  );
}
