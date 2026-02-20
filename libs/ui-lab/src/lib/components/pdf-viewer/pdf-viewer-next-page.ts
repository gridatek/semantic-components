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
  selector: 'button[scPdfViewerNextPage]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-next-page',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!pdfViewer.canGoNext()',
    '[attr.aria-disabled]': '!pdfViewer.canGoNext() || null',
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
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );
}
