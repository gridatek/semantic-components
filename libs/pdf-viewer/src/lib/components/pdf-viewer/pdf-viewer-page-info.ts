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

/**
 * The current page (editable — Enter or leaving the field goes there) and the
 * page count. With page labels ("iv", "A-1"), the field shows the label and
 * the count "(4 of 120)", as pdf.js; it accepts a label or a page number.
 */
@Component({
  selector: '[scPdfViewerPageInfo]',
  imports: [ScInput],
  template: `
    @if (pdfViewer.pageLabels()) {
      <input
        #pageInput
        scInput
        type="text"
        class="w-20 text-center"
        [value]="pdfViewer.pageLabel(pdfViewer.currentPage())"
        [attr.aria-label]="ariaLabel()"
        (change)="onPageInput($event)"
        (keydown.enter)="onPageInput($event)"
      />
      <span class="text-muted-foreground text-sm whitespace-nowrap">
        ({{ pdfViewer.currentPage() }} of {{ pdfViewer.totalPages() }})
      </span>
    } @else {
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
    }
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
    const page = this.pdfViewer.pageForLabel(input.value);
    if (page) this.pdfViewer.goToPage(page);
    // Normalise what was typed ("04" → "4", a number → its label).
    input.value = this.pdfViewer.pageLabel(
      page ?? this.pdfViewer.currentPage(),
    );
  }
}
