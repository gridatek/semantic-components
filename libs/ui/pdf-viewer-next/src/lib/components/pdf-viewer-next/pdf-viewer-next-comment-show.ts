import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfComment } from './pdf-viewer-next-types';

/**
 * Selects a comment and shows its annotation on the page.
 */
@Directive({
  selector: 'button[scPdfViewerNextCommentShow]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.showComment(comment().id)',
  },
})
export class ScPdfViewerNextCommentShow {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerNextCommentShow',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('link');
  readonly size = input<ScButtonVariants['size']>('xs');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
