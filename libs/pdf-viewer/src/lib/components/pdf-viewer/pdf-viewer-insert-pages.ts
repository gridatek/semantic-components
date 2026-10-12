import {
  DOCUMENT,
  Directive,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Asks for a PDF and inserts its pages after the current page (merging
 * files). `insertFailed` fires when the file isn't a readable PDF — say so.
 * Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerInsertPages]',
  host: {
    '[class]': 'class()',
    '(click)': 'choose()',
  },
})
export class ScPdfViewerInsertPages {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The chosen file couldn't be read as a PDF. */
  readonly insertFailed = output<File>();

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(
        () => !this.pdfViewer.pdfDocument() || this.pdfViewer.organizing(),
      ),
    );
  }

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
