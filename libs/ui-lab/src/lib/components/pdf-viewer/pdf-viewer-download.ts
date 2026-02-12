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
  selector: 'button[sc-pdf-viewer-download]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-download',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': '"Download PDF"',
    '(click)': 'pdfViewer.download()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerDownload {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-2 rounded-lg hover:bg-muted transition-colors', this.classInput()),
  );
}
