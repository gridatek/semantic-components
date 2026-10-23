import {
  DOCUMENT,
  Directive,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Asks for a PDF and inserts its pages after the current page (merging
 * files). `insertFailed` fires when the file isn't a readable PDF — say so.
 *
 */
@Directive({
  selector: 'button[scPdfViewerInsertPages]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'choose()',
  },
})
export class ScPdfViewerInsertPages {
  private readonly buttonStyles = injectPreset().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly disabled = computed(
    () => !this.pdfViewer.pdfDocument() || this.pdfViewer.organizing(),
  );
  /** The chosen file couldn't be read as a PDF. */
  readonly insertFailed = output<File>();

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected choose(): void {
    const field = this.document.createElement('input');
    field.type = 'file';
    field.accept = '.pdf,application/pdf';
    field.addEventListener('change', async () => {
      const file = field.files?.[0];
      if (!file) return;
      const inserted = await this.pdfViewer.insertFile(
        file,
        this.pdfViewer.currentPage(),
      );
      if (!inserted) this.insertFailed.emit(file);
    });
    field.click();
  }
}
