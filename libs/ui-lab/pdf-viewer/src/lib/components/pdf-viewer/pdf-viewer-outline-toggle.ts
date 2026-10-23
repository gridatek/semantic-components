import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfOutlineItem } from './pdf-viewer-types';

/**
 * Opens or closes a bookmark's children (`aria-expanded`, `data-state`);
 * Shift+click does its whole branch, as pdf.js. Show its children while
 * `viewer.outlineExpanded().has(item.id)`. Use named after
 * the bookmark; rotate your chevron with `data-[state=open]`.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineToggle]',
  host: {
    type: 'button',
    'data-slot': 'pdf-viewer-outline-toggle',
    '[attr.aria-expanded]': 'open()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[class]': 'class()',
    '(click)': 'pdfViewer.toggleOutlineItem(item(), $event.shiftKey)',
  },
})
export class ScPdfViewerOutlineToggle {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly item = input.required<ScPdfOutlineItem>({
    alias: 'scPdfViewerOutlineToggle',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly open = computed(() =>
    this.pdfViewer.outlineExpanded().has(this.item().id),
  );
  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      '[&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-90 rtl:[&_svg]:-scale-x-100',
      this.classInput(),
    ),
  );
}
