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

const HIGHLIGHT_COLORS = [
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#FF00FF',
  '#FF6600',
  '#FF0000',
];

@Component({
  selector: 'sc-pdf-viewer-editor-highlight-params',
  template: `
    <div class="flex flex-col gap-2 p-2">
      <label class="text-xs text-[#bbb]">Color</label>
      <div class="flex gap-1">
        @for (color of colors; track color) {
          <button
            type="button"
            class="size-6 rounded-full border-2"
            [style.background]="color"
            [style.border-color]="
              pdfViewer.highlightColor() === color ? '#fff' : 'transparent'
            "
            (click)="pdfViewer.highlightColor.set(color)"
            [attr.aria-label]="'Color ' + color"
          ></button>
        }
        <input
          type="color"
          class="size-6 cursor-pointer rounded border-0 bg-transparent p-0"
          [value]="pdfViewer.highlightColor()"
          (input)="pdfViewer.highlightColor.set($any($event.target).value)"
          aria-label="Custom color"
        />
      </div>

      <label class="text-xs text-[#bbb]">
        Thickness: {{ pdfViewer.highlightThickness() }}
      </label>
      <input
        type="range"
        min="8"
        max="24"
        [value]="pdfViewer.highlightThickness()"
        (input)="pdfViewer.highlightThickness.set(+$any($event.target).value)"
        class="w-full"
      />

      <label class="flex items-center gap-2 text-xs text-[#bbb]">
        <input
          type="checkbox"
          [checked]="pdfViewer.highlightShowAll()"
          (change)="
            pdfViewer.highlightShowAll.set(!pdfViewer.highlightShowAll())
          "
          class="accent-[#6b9edd]"
        />
        Show All
      </label>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-editor-highlight-params',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerEditorHighlightParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly colors = HIGHLIGHT_COLORS;
}
