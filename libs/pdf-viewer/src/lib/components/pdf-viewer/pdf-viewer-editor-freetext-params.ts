import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSlider,
  ScToggleGroup,
  ScToggleGroupItem,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { SC_PDF_INK_COLORS } from './pdf-viewer-editor-colors';

/** The text tool's options: color and size. */
@Component({
  selector: 'sc-pdf-viewer-editor-freetext-params',
  imports: [ScToggleGroup, ScToggleGroupItem, ScField, ScLabel, ScSlider],
  template: `
    <div
      scToggleGroup
      type="single"
      size="sm"
      aria-label="Text color"
      [value]="pdfViewer.freetextColor()"
      (valueChange)="setColor($event)"
    >
      @for (color of colors; track color.value) {
        <button
          scToggleGroupItem
          [value]="color.value"
          [attr.aria-label]="color.name"
        >
          <span
            class="ring-foreground/20 size-4 rounded-full ring-1"
            [style.background-color]="color.value"
          ></span>
        </button>
      }
    </div>
    <div scField>
      <label scLabel>Size — {{ pdfViewer.freetextSize() }}px</label>
      <input
        scSlider
        [min]="5"
        [max]="100"
        [value]="pdfViewer.freetextSize()"
        (input)="pdfViewer.freetextSize.set(+$any($event.target).value)"
      />
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-editor-params',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorFreetextParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex w-60 flex-col gap-4', this.classInput()),
  );

  protected readonly colors = SC_PDF_INK_COLORS;

  protected setColor(value: string | string[] | null): void {
    if (typeof value === 'string') this.pdfViewer.freetextColor.set(value);
  }
}
