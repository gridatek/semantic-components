import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  viewChildren,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import {
  ScPdfCursorTool,
  ScPdfScrollMode,
  ScPdfSpreadMode,
} from './pdf-viewer-types';

let nextId = 0;

/** The view options: cursor tool, scroll mode and spreads. */
@Component({
  selector: 'sc-pdf-viewer-view-options',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: `
    @for (group of groups; track group.key; let i = $index) {
      <div class="flex flex-col gap-2">
        <p
          class="text-muted-foreground text-xs font-medium"
          [id]="id + '-' + group.key"
        >
          {{ group.label }}
        </p>
        <div
          scToggleGroup
          type="single"
          variant="outline"
          size="sm"
          [attr.aria-labelledby]="id + '-' + group.key"
          [value]="value(group.key)"
          (valueChange)="set(group.key, $event, i)"
        >
          @for (option of group.options; track option.value) {
            <button scToggleGroupItem [value]="option.value">
              {{ option.label }}
            </button>
          }
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-view-options',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerViewOptions {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  private readonly toggleGroups = viewChildren(ScToggleGroup);

  protected readonly id = `sc-pdf-viewer-view-options-${nextId++}`;

  protected readonly groups = [
    {
      key: 'cursor',
      label: 'Cursor',
      options: [
        { value: 'select', label: 'Select' },
        { value: 'hand', label: 'Hand' },
      ],
    },
    {
      key: 'scroll',
      label: 'Scrolling',
      options: [
        { value: 'page', label: 'Page' },
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'wrapped', label: 'Wrapped' },
      ],
    },
    {
      key: 'spread',
      label: 'Spreads',
      options: [
        { value: 'none', label: 'None' },
        { value: 'odd', label: 'Odd' },
        { value: 'even', label: 'Even' },
      ],
    },
  ] as const;

  protected value(key: 'cursor' | 'scroll' | 'spread'): string {
    if (key === 'cursor') return this.pdfViewer.cursorTool();
    if (key === 'scroll') return this.pdfViewer.scrollMode();
    return this.pdfViewer.spreadMode();
  }

  protected set(
    key: 'cursor' | 'scroll' | 'spread',
    value: string | string[] | null,
    index: number,
  ): void {
    // A second click on the selected item clears a single toggle group; one
    // of the modes always applies, so put it back.
    if (typeof value !== 'string' || !value) {
      this.toggleGroups()[index]?.value.set(this.value(key));
      return;
    }
    if (key === 'cursor')
      this.pdfViewer.cursorTool.set(value as ScPdfCursorTool);
    else if (key === 'scroll') {
      this.pdfViewer.scrollMode.set(value as ScPdfScrollMode);
    } else this.pdfViewer.spreadMode.set(value as ScPdfSpreadMode);
  }
}
