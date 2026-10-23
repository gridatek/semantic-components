import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Closes every bookmark of the outline.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineCollapseAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.setOutlineExpanded(false)',
  },
})
export class ScPdfViewerOutlineCollapseAll {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
