import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * A list of the pages (`viewer.pageNumbers()`), e.g. thumbnails, organised as
 * pdf.js's: put a `scPdfViewerPageItem` per page in it. Drag items to reorder
 * pages (the selected ones together); Delete, Ctrl+C / X / V delete, copy,
 * cut and paste the selected pages while focus is in the list. Give it an
 * `aria-label`.
 */
@Directive({
  selector: '[scPdfViewerPages]',
  host: {
    'data-slot': 'pdf-viewer-pages',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScPdfViewerPages {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  /** The pages being dragged. */
  readonly dragged = signal<readonly number[]>([]);
  /** Where they'd land: next to a page, before or after it. */
  readonly dropTarget = signal<{ page: number; after: boolean } | null>(null);

  /** Starts dragging a page — the selection when it's selected. */
  startDrag(page: number): void {
    const selection = this.pdfViewer.pageSelection();
    this.dragged.set(selection.includes(page) ? selection : [page]);
  }

  async drop(): Promise<void> {
    const target = this.dropTarget();
    const pages = this.dragged();
    this.endDrag();
    if (!target || !pages.length) return;
    const moved = await this.pdfViewer.movePages(
      [...pages],
      target.after ? target.page + 1 : target.page,
    );
    this.pdfViewer.selectedPages.set(new Set(moved));
  }

  endDrag(): void {
    this.dragged.set([]);
    this.dropTarget.set(null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const viewer = this.pdfViewer;
    const selection = viewer.pageSelection();
    const mod = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();
    if (event.key === 'Delete' && selection.length) {
      viewer.deletePages(selection);
    } else if (mod && key === 'c' && selection.length) {
      viewer.copyPages(selection);
    } else if (mod && key === 'x' && selection.length) {
      viewer.cutPages(selection);
    } else if (mod && key === 'v' && viewer.pageClipboard()) {
      viewer.pastePages();
    } else {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }
}
