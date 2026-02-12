import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[sc-pdf-viewer-next-page]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-next-page',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!pdfViewer.canGoNext()',
    '[attr.aria-label]': '"Next page"',
    '(click)': 'pdfViewer.goToNextPage()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerNextPage {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      this.classInput(),
    ),
  );
}
