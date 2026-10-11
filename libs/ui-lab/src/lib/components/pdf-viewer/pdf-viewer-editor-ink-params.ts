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
import { SC_PDF_INK_COLORS } from './pdf-viewer-editor-colors';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/** The drawing tool's options: color, thickness, opacity. */
@Component({
  selector: 'sc-pdf-viewer-editor-ink-params',
  imports: [ScToggleGroup, ScToggleGroupItem, ScField, ScLabel, ScSlider],
  template: `
    <div
      scToggleGroup
      type="single"
      size="sm"
      aria-label="Ink color"
      [value]="pdfViewer.inkColor()"
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
      <label scLabel>Thickness — {{ pdfViewer.inkThickness() }}</label>
      <input
        scSlider
        [min]="1"
        [max]="20"
        [value]="pdfViewer.inkThickness()"
        (input)="pdfViewer.inkThickness.set(+$any($event.target).value)"
      />
    </div>
    <div scField>
      <label scLabel>Opacity — {{ opacityPercent() }}%</label>
      <input
        scSlider
        [min]="5"
        [max]="100"
        [value]="opacityPercent()"
        (input)="pdfViewer.inkOpacity.set(+$any($event.target).value / 100)"
      />
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-editor-params',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorInkParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex w-60 flex-col gap-4', this.classInput()),
  );

  protected readonly colors = SC_PDF_INK_COLORS;
  protected readonly opacityPercent = computed(() =>
    Math.round(this.pdfViewer.inkOpacity() * 100),
  );

  protected setColor(value: string | string[] | null): void {
    if (typeof value === 'string') this.pdfViewer.inkColor.set(value);
  }
}
