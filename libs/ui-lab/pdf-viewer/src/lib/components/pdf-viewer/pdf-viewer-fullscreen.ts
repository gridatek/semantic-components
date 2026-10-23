import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
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
  private readonly buttonStyles = injectPreset().button;

  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
