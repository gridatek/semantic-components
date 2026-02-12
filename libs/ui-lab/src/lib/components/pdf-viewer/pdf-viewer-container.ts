import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[sc-pdf-viewer-container]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-container',
    '[class]': 'class()',
    '[class.fullscreen]': 'pdfViewer.isFullscreen()',
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
