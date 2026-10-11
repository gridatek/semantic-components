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
  ScSeparator,
  ScSlider,
  ScSwitch,
  ScSwitchField,
  ScToggleGroup,
  ScToggleGroupItem,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_HIGHLIGHT_COLORS } from './pdf-viewer-editor-colors';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/** The highlight tool's options: color, thickness, show all. */
@Component({
  selector: 'sc-pdf-viewer-editor-highlight-params',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    ScField,
    ScLabel,
    ScSlider,
    ScSeparator,
    ScSwitchField,
    ScSwitch,
  ],
  template: `
    <div
      scToggleGroup
      type="single"
      size="sm"
      aria-label="Highlight color"
      [value]="pdfViewer.highlightColor()"
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
      <label scLabel>Thickness — {{ pdfViewer.highlightThickness() }}</label>
      <input
        scSlider
        [min]="8"
        [max]="24"
        [value]="pdfViewer.highlightThickness()"
        (input)="pdfViewer.highlightThickness.set(+$any($event.target).value)"
      />
    </div>
    <div scSeparator></div>
    <label scSwitchField>
      Show all
      <input
        type="checkbox"
        scSwitch
        [checked]="pdfViewer.highlightShowAll()"
        (checkedChange)="pdfViewer.highlightShowAll.set($event)"
      />
    </label>
  `,
  host: {
    'data-slot': 'pdf-viewer-editor-params',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEditorHighlightParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex w-60 flex-col gap-4', this.classInput()),
  );

  protected readonly colors = SC_PDF_HIGHLIGHT_COLORS;

  protected setColor(value: string | string[] | null): void {
    if (typeof value === 'string') this.pdfViewer.highlightColor.set(value);
  }
}
