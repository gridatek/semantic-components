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
  selector: 'button[sc-pdf-viewer-retry]',
  template: `
    <ng-content>Retry</ng-content>
  `,
  host: {
    'data-slot': 'pdf-viewer-retry',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.retry()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerRetry {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mt-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors',
      this.classInput(),
    ),
  );
}
