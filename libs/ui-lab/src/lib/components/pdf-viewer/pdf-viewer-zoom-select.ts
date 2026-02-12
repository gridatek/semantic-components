import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PDF_VIEWER } from './pdf-viewer-root';
import { ZOOM_LEVELS } from './pdf-viewer-types';

@Component({
  selector: 'select[sc-pdf-viewer-zoom-select]',
  template: `
    @for (level of zoomLevels; track level.value) {
      <option [value]="level.value">{{ level.label }}</option>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-zoom-select',
    '[class]': 'class()',
    '[value]': 'zoomLevelValue()',
    '[attr.aria-label]': '"Zoom level"',
    '(change)': 'onZoomSelect($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerZoomSelect {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly zoomLevels = ZOOM_LEVELS;

  protected readonly class = computed(() =>
    cn(
      'px-2 py-1.5 text-sm border rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer',
      this.classInput(),
    ),
  );

  protected readonly zoomLevelValue = computed(() => {
    const z = this.pdfViewer.zoom();
    return typeof z === 'number' ? z.toString() : z;
  });

  protected onZoomSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    if (value === 'auto' || value === 'page-fit' || value === 'page-width') {
      this.pdfViewer.setZoom(value);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        this.pdfViewer.setZoom(numValue);
      }
    }
  }
}
