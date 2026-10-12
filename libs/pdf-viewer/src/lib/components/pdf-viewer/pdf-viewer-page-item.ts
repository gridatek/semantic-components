import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { ScPdfViewerPages } from './pdf-viewer-pages';

/**
 * A page in a `scPdfViewerPages` list: drag it to reorder (a line shows where
 * it'd land: `data-drop="before|after"`). `data-selected` and `data-current`
 * mark the selected pages and the current one.
 */
@Directive({
  selector: '[scPdfViewerPageItem]',
  host: {
    'data-slot': 'pdf-viewer-page-item',
    draggable: 'true',
    '[attr.data-selected]': 'selected() || null',
    '[attr.data-current]': 'current() || null',
    '[attr.data-drop]': 'drop()',
    '[class]': 'class()',
    '(dragstart)': 'onDragStart($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave()',
    '(drop)': 'onDrop($event)',
    '(dragend)': 'pages.endDrag()',
  },
})
export class ScPdfViewerPageItem {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  protected readonly pages = inject(ScPdfViewerPages);

  readonly page = input.required<number>({ alias: 'scPdfViewerPageItem' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly selected = computed(() =>
    this.pdfViewer.pageSelection().includes(this.page()),
  );
  protected readonly current = computed(
    () => this.pdfViewer.currentPage() === this.page(),
  );
  protected readonly drop = computed(() => {
    const target = this.pages.dropTarget();
    if (target?.page !== this.page()) return null;
    return target.after ? 'after' : 'before';
  });

  protected readonly class = computed(() =>
    cn(
      'relative rounded-md',
      'data-[drop=before]:shadow-[0_-3px_0_var(--color-primary)] data-[drop=after]:shadow-[0_3px_0_var(--color-primary)]',
      this.classInput(),
    ),
  );

  protected onDragStart(event: DragEvent): void {
    this.pages.startDrag(this.page());
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.pages.dragged().join(','));
    }
  }

  protected onDragOver(event: DragEvent): void {
    if (!this.pages.dragged().length) return;
    event.preventDefault();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.pages.dropTarget.set({
      page: this.page(),
      after: event.clientY - rect.top > rect.height / 2,
    });
  }

  protected onDragLeave(): void {
    if (this.pages.dropTarget()?.page === this.page()) {
      this.pages.dropTarget.set(null);
    }
  }

  protected onDrop(event: DragEvent): void {
    if (!this.pages.dragged().length) return;
    event.preventDefault();
    this.pages.drop();
  }
}
