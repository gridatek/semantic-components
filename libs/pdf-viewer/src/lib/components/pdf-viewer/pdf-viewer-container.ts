import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

@Component({
  selector: '[scPdfViewerContainer]',
  template: ` <ng-content /> `,
  host: {
    'data-slot': 'pdf-viewer-container',
    '[class]': 'class()',
    '[class.fullscreen]': 'pdfViewer.isFullscreen()',
    '[attr.data-presenting]': 'pdfViewer.presenting() || null',
  },
  styles: `
    [data-slot='pdf-viewer-container'] {
      display: flex;
      flex-direction: column;
    }

    [data-slot='pdf-viewer-container'].fullscreen {
      position: fixed !important;
      inset: 0 !important;
      z-index: 50 !important;
      width: 100vw !important;
      height: 100vh !important;
    }

    /* Presentation mode: only the pages, on black. */
    [data-slot='pdf-viewer-container'][data-presenting]
      [data-slot='pdf-viewer-toolbar'] {
      display: none !important;
    }

    [data-slot='pdf-viewer-container'][data-presenting] {
      border: 0;
      border-radius: 0;
      background: #000;
    }

    [data-slot='pdf-viewer-container'][data-presenting]
      [data-slot='pdf-viewer-content'] {
      background: #000;
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerContainer {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-background border rounded-lg overflow-hidden', this.classInput()),
  );

  constructor() {
    // Register this container with the root for fullscreen support
    this.pdfViewer.setContainerElement(this.elementRef);
  }
}
