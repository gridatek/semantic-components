import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-editor-ink-params',
  template: `
    <div class="flex flex-col gap-2 p-2">
      <label class="text-xs text-[#bbb]">Color</label>
      <input
        type="color"
        class="h-7 w-12 cursor-pointer rounded border border-[#5a5a5a] bg-transparent p-0"
        [value]="pdfViewer.inkColor()"
        (input)="pdfViewer.inkColor.set($any($event.target).value)"
      />

      <label class="text-xs text-[#bbb]">
        Thickness: {{ pdfViewer.inkThickness() }}
      </label>
      <input
        type="range"
        min="1"
        max="20"
        [value]="pdfViewer.inkThickness()"
        (input)="pdfViewer.inkThickness.set(+$any($event.target).value)"
        class="w-full"
      />

      <label class="text-xs text-[#bbb]">
        Opacity: {{ Math.round(pdfViewer.inkOpacity() * 100) }}%
      </label>
      <input
        type="range"
        min="5"
        max="100"
        [value]="pdfViewer.inkOpacity() * 100"
        (input)="pdfViewer.inkOpacity.set(+$any($event.target).value / 100)"
        class="w-full"
      />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerEditorInkParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly Math = Math;
}
