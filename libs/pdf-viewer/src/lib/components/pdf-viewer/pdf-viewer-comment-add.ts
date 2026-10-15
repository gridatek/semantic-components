import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Turns the comment tool on (or off): click a page to place a comment.
 * `aria-pressed` while it's on.
 */
@Directive({
  selector: 'button[scPdfViewerCommentAdd]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'placing()',
    '(click)': 'toggle()',
  },
})
export class ScPdfViewerCommentAdd {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
  protected readonly placing = computed(
    () => this.pdfViewer.editorMode() === 'comment',
  );

  protected toggle(): void {
    this.pdfViewer.setEditorMode(this.placing() ? 'none' : 'comment');
  }
}
