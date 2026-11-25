import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens and closes the sidebar (`viewer.sidebarOpen()`). Name it: one name,
 * its state is `aria-pressed`.
 */
@Directive({
  selector: 'button[scPdfViewerSidebarToggle]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.sidebarOpen()',
    '(click)': 'pdfViewer.sidebarOpen.set(!pdfViewer.sidebarOpen())',
  },
})
export class ScPdfViewerSidebarToggle {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
