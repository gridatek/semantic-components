import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { ZOOM_LEVELS } from './pdf-viewer-types';

/**
 * The zoom levels as `<option>`s, bound to the viewer's zoom. Use on a
 * `select[scNativeSelect]` (inside a `scNativeSelectContainer`).
 */
@Component({
  selector: 'select[scPdfViewerZoomSelect]',
  template: `
    <!-- [selected] rather than the select's value: the custom option may not
         exist yet when the select's own bindings run. -->
    @for (level of zoomLevels; track level.value) {
      <option
        [value]="level.value"
        [selected]="level.value.toString() === zoomLevelValue()"
      >
        {{ level.label }}
      </option>
    }
    @if (customLevel(); as custom) {
      <option [value]="custom.value" selected>{{ custom.label }}</option>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-zoom-select',
    '[class]': 'class()',
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

  /** A zoom that isn't a preset (wheel, pinch), shown as its percentage. */
  protected readonly customLevel = computed(() => {
    const zoom = this.pdfViewer.zoom();
    if (typeof zoom !== 'number') return null;
    if (this.zoomLevels.some((level) => level.value === zoom)) return null;
    return { value: zoom.toString(), label: `${Math.round(zoom * 100)}%` };
  });

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
