import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[scPdfViewerDownload]',
  template: `
    <ng-content />
  `,
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': '"Download PDF"',
    '(click)': 'pdfViewer.download()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerDownload {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );
}
