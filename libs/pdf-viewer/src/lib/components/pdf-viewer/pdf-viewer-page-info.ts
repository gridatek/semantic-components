import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { ScInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/** The current page (editable — Enter or leaving the field goes there) and the page count. */
@Component({
  selector: '[scPdfViewerPageInfo]',
  imports: [ScInput],
  template: `
    <input
      #pageInput
      scInput
      type="number"
      inputmode="numeric"
      class="w-14 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      min="1"
      [attr.max]="pdfViewer.totalPages()"
      [value]="pdfViewer.currentPage()"
      [attr.aria-label]="ariaLabel()"
      (change)="onPageInput($event)"
      (keydown.enter)="onPageInput($event)"
    />
    <span class="text-muted-foreground text-sm whitespace-nowrap">
      / {{ pdfViewer.totalPages() }}
    </span>
  `,
  host: {
    'data-slot': 'pdf-viewer-page-info',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerPageInfo {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name of the page field. */
  readonly ariaLabel = input('Page', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1.5', this.classInput()),
  );

  private readonly pageInput =
    viewChild.required<ElementRef<HTMLInputElement>>('pageInput');

  constructor() {
    // Ctrl+Alt+G moves focus here.
    effect(() => {
      if (!this.pdfViewer.pageFocusRequest()) return;
      untracked(() => {
        const input = this.pageInput().nativeElement;
        input.focus();
        input.select();
      });
    });
  }

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
