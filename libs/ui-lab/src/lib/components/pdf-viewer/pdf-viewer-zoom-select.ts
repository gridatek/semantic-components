import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';
import { ZOOM_LEVELS } from './pdf-viewer-types';

/**
 * The zoom levels as `<option>`s, bound to the viewer's zoom. Use on a
 * `select[scNativeSelect]` (inside a `scNativeSelectContainer`).
 */
@Component({
  selector: 'select[scPdfViewerZoomSelect]',
  template: `
    @for (level of zoomLevels; track level.value) {
      <option [value]="level.value">{{ level.label }}</option>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-zoom-select',
    '[class]': 'class()',
    '[value]': 'zoomLevelValue()',
    '[attr.aria-label]': 'ariaLabel()',
    '(change)': 'onZoomSelect($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerZoomSelect {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name. */
  readonly ariaLabel = input('Zoom', { alias: 'aria-label' });

  protected readonly zoomLevels = ZOOM_LEVELS;

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly zoomLevelValue = computed(() => {
    const z = this.pdfViewer.zoom();
    return typeof z === 'number' ? z.toString() : z;
  });

  protected onZoomSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (
      value === 'auto' ||
      value === 'page-fit' ||
      value === 'page-width' ||
      value === 'page-actual'
    ) {
      this.pdfViewer.setZoom(value);
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) this.pdfViewer.setZoom(numValue);
  }
}
