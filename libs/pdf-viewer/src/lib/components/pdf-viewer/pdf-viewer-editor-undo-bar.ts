import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScButton, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * "Annotation deleted — Undo", shown for a few seconds after a deletion and
 * announced to screen readers.
 */
@Component({
  selector: 'sc-pdf-viewer-editor-undo-bar',
  imports: [ScButton],
  template: `
    <div role="status" class="pointer-events-none flex justify-center">
      @if (pdfViewer.undoBarVisible()) {
        <div
          class="bg-popover text-popover-foreground pointer-events-auto flex items-center gap-2 rounded-lg border py-1.5 ps-4 pe-1.5 text-sm shadow-lg"
        >
          <span>{{ pdfViewer.undoBarMessage() }}</span>
          <button
            scButton
            size="sm"
            variant="ghost"
            (click)="pdfViewer.undoLastAction()"
          >
            Undo
          </button>
          <button
            scButton
            size="sm"
            variant="ghost"
            (click)="pdfViewer.closeUndoBar()"
          >
            Dismiss
          </button>
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-undo-bar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorUndoBar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('absolute inset-x-0 bottom-4 z-50 block', this.classInput()),
  );
}
