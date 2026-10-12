import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Enters and leaves fullscreen (`aria-pressed` while in it). Use on a
 * `scButton`. Overlays (dialogs, menus, tooltips) need CDK's
 * `FullscreenOverlayContainer` to show in fullscreen — see the README.
 */
@Directive({
  selector: 'button[scPdfViewerFullscreen]',
  host: {
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.isFullscreen()',
    '(click)': 'pdfViewer.toggleFullscreen()',
  },
})
export class ScPdfViewerFullscreen {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
