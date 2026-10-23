import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Enters and leaves fullscreen (`aria-pressed` while in it). Overlays (dialogs, menus, tooltips) need CDK's
 * `FullscreenOverlayContainer` to show in fullscreen — see the README.
 */
@Directive({
  selector: 'button[scPdfViewerFullscreen]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.isFullscreen()',
    '(click)': 'pdfViewer.toggleFullscreen()',
  },
})
export class ScPdfViewerFullscreen {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
