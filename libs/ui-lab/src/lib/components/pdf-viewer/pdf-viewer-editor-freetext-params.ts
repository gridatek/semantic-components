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
  selector: 'sc-pdf-viewer-editor-freetext-params',
  template: `
    <div class="flex flex-col gap-2 p-2">
      <label class="text-xs text-[#bbb]">Font Color</label>
      <input
        type="color"
        class="h-7 w-12 cursor-pointer rounded border border-[#5a5a5a] bg-transparent p-0"
        [value]="pdfViewer.freetextColor()"
        (input)="pdfViewer.freetextColor.set($any($event.target).value)"
      />

      <label class="text-xs text-[#bbb]">
        Font Size: {{ pdfViewer.freetextSize() }}px
      </label>
      <input
        type="range"
        min="5"
        max="100"
        [value]="pdfViewer.freetextSize()"
        (input)="pdfViewer.freetextSize.set(+$any($event.target).value)"
        class="w-full"
      />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorFreetextParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
