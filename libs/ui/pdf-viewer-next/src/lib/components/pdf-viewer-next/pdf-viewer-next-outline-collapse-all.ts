import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Closes every bookmark of the outline.
 */
@Directive({
  selector: 'button[scPdfViewerNextOutlineCollapseAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.setOutlineExpanded(false)',
  },
})
export class ScPdfViewerNextOutlineCollapseAll {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
