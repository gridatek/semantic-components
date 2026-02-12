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
  selector: 'button[sc-pdf-viewer-zoom-in]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-zoom-in',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': '"Zoom in"',
    '(click)': 'pdfViewer.zoomIn()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerZoomIn {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'p-2 rounded-lg hover:bg-muted disabled:opacity-50 transition-colors',
      this.classInput(),
    ),
  );
}
