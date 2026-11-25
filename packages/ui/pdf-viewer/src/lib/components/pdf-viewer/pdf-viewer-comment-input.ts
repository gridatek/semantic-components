import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { ScPdfViewerCommentForm } from './pdf-viewer-comment-form';

/**
 * The text of a `scPdfViewerCommentForm`: focused when it appears, Escape
 * gives up on the comment. Use on a `scTextarea` and label it.
 */
@Directive({
  selector: 'textarea[scPdfViewerCommentInput]',
  host: {
    'data-slot': 'pdf-viewer-comment-input',
    '[value]': 'form.text()',
    '[class]': 'class()',
    '(input)': 'form.text.set($any($event.target).value)',
    '(keydown.escape)': 'pdfViewer.cancelComment()',
  },
})
export class ScPdfViewerCommentInput {
  private readonly form = inject(ScPdfViewerCommentForm);
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const element =
      inject<ElementRef<HTMLTextAreaElement>>(ElementRef).nativeElement;
    afterNextRender(() => element.focus());
  }
}
