import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import { ScPdfViewerNextCommentForm } from './pdf-viewer-next-comment-form';

/**
 * The text of a `scPdfViewerNextCommentForm`: focused when it appears, Escape
 * gives up on the comment. Use on a `scTextarea` and label it.
 */
@Directive({
  selector: 'textarea[scPdfViewerNextCommentInput]',
  host: {
    'data-slot': 'pdf-viewer-comment-input',
    '[value]': 'form.text()',
    '[class]': 'class()',
    '(input)': 'form.text.set($any($event.target).value)',
    '(keydown.escape)': 'pdfViewer.cancelComment()',
  },
})
export class ScPdfViewerNextCommentInput {
  private readonly form = inject(ScPdfViewerNextCommentForm);
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const element =
      inject<ElementRef<HTMLTextAreaElement>>(ElementRef).nativeElement;
    afterNextRender(() => element.focus());
  }
}
