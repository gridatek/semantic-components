import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[scPdfViewerFindPrevious]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    'aria-label': 'Find Previous',
    '(click)': 'pdfViewer.findPrevious()',
    '[disabled]': 'pdfViewer.findTotalMatches() === 0',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerFindPrevious {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('', this.classInput()));
}
