import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[scPdfViewerPageInfo]',
  template: `
    <input
      type="number"
      [value]="pdfViewer.currentPage()"
      (change)="onPageInput($event)"
      (keydown.enter)="onPageInput($event)"
      class="bg-background focus:ring-ring w-12 rounded border px-2 py-1 text-center text-sm focus:ring-2 focus:outline-none"
      [attr.min]="1"
      [attr.max]="pdfViewer.totalPages()"
      aria-label="Current page"
    />
    <span class="text-muted-foreground text-sm">
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
