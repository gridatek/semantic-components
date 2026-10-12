import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * The page area. Dropping a file on it opens the file (as pdf.js); it's
 * outlined while a file is dragged over it (`data-dragging`).
 */
@Directive({
  selector: '[scPdfViewerContent]',
  exportAs: 'scPdfViewerContent',
  host: {
    'data-slot': 'pdf-viewer-content',
    '[class]': 'class()',
    '[attr.data-dragging]': 'dragging() || null',
    '(dragenter)': 'onDragOver($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class ScPdfViewerContent {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Open a file dropped on the pages. */
  readonly dropFiles = input(true);

  protected readonly dragging = signal(false);

  protected readonly class = computed(() =>
    cn(
      'flex-1 relative min-h-0 overflow-hidden bg-muted/30',
      'data-dragging:after:border-primary data-dragging:after:bg-primary/5 data-dragging:after:pointer-events-none data-dragging:after:absolute data-dragging:after:inset-0 data-dragging:after:z-30 data-dragging:after:border-2 data-dragging:after:border-dashed',
      this.classInput(),
    ),
  );

  /** Files only — not text or links dragged from the page. */
  private hasFiles(event: DragEvent): boolean {
    return this.dropFiles() && !!event.dataTransfer?.types.includes('Files');
  }

  protected onDragOver(event: DragEvent): void {
    if (!this.hasFiles(event)) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    this.dragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    const host = event.currentTarget as HTMLElement;
    // Leaving for a child isn't leaving.
    if (!host.contains(event.relatedTarget as Node | null)) {
      this.dragging.set(false);
    }
  }

  protected onDrop(event: DragEvent): void {
    this.dragging.set(false);
    if (!this.hasFiles(event)) return;
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.pdfViewer.loadFile(file);
  }
}
