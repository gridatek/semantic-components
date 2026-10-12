import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * The undo bar: a `role="status"` region, always present so screen readers
 * announce what you write in it. Write its content while `viewer.undoable()`
 * is set — a message from its `kind` and `count`, a `scPdfViewerUndo` and a
 * `scPdfViewerUndoDismiss` button. It only shows as a bar while open
 * (`data-state="open"`).
 */
@Directive({
  selector: '[scPdfViewerUndoBar]',
  host: {
    'data-slot': 'pdf-viewer-undo-bar',
    role: 'status',
    '[attr.data-state]': 'pdfViewer.undoable() ? "open" : "closed"',
    '[class]': 'class()',
  },
})
export class ScPdfViewerUndoBar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-2 rounded-lg text-sm',
      'data-[state=open]:bg-popover data-[state=open]:text-popover-foreground data-[state=open]:pointer-events-auto data-[state=open]:border data-[state=open]:py-1.5 data-[state=open]:ps-4 data-[state=open]:pe-1.5 data-[state=open]:shadow-lg',
      this.classInput(),
    ),
  );
}
