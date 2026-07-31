import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-editor-undo-bar',
  template: `
    @if (pdfViewer.undoBarVisible()) {
      <div
        class="absolute inset-x-0 bottom-4 z-50 flex items-center justify-center"
      >
        <div
          class="flex items-center gap-3 rounded-lg border border-[#555] bg-[#333] px-4 py-2.5 text-sm text-[#d1d5db] shadow-lg"
        >
          <span>{{ pdfViewer.undoBarMessage() }}</span>
          <button
            type="button"
            class="font-medium text-[#6b9edd] hover:text-[#8bb4ee]"
            (click)="pdfViewer.undoLastAction()"
          >
            Undo
          </button>
          <button
            type="button"
            class="text-[#999] hover:text-white"
            aria-label="Dismiss"
            (click)="pdfViewer.closeUndoBar()"
          >
            &times;
          </button>
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorUndoBar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
