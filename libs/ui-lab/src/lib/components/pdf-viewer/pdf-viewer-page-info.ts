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
  selector: '[sc-pdf-viewer-page-info]',
  template: `
    <input
      type="number"
      [value]="pdfViewer.currentPage()"
      (change)="onPageInput($event)"
      (keydown.enter)="onPageInput($event)"
      class="w-12 px-2 py-1 text-sm text-center border rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
      [attr.min]="1"
      [attr.max]="pdfViewer.totalPages()"
      aria-label="Current page"
    />
    <span class="text-sm text-muted-foreground">
      / {{ pdfViewer.totalPages() }}
    </span>
  `,
  host: {
    'data-slot': 'pdf-viewer-page-info',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerPageInfo {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1 px-2', this.classInput()),
  );

  protected onPageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const page = parseInt(input.value, 10);
    if (!isNaN(page) && page >= 1 && page <= this.pdfViewer.totalPages()) {
      this.pdfViewer.goToPage(page);
    } else {
      input.value = this.pdfViewer.currentPage().toString();
    }
  }
}
