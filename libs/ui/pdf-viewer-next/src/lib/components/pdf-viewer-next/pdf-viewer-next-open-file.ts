import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/** Asks for a PDF and opens it in the viewer. Write its text. */
@Directive({
  selector: 'button[scPdfViewerNextOpenFile]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.openFile()',
  },
})
export class ScPdfViewerNextOpenFile {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
