import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[scPdfViewerRotateLeft]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-rotate-left',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': '"Rotate left"',
    '(click)': 'pdfViewer.rotateLeft()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerRotateLeft {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );
}
