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
  selector: 'button[sc-pdf-viewer-rotate-right]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-rotate-right',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': '"Rotate right"',
    '(click)': 'pdfViewer.rotateRight()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerRotateRight {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-2 rounded-lg hover:bg-muted transition-colors', this.classInput()),
  );
}
