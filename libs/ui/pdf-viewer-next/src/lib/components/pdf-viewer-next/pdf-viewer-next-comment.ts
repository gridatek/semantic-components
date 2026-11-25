import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfComment } from './pdf-viewer-next-types';

/**
 * A comment in your list of `viewer.comments()`. Marked `data-active` when
 * it's picked — here (`scPdfViewerNextCommentShow`) or by its button on the
 * page — and scrolled into view then.
 */
@Directive({
  selector: '[scPdfViewerNextComment]',
  host: {
    'data-slot': 'pdf-viewer-comment',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextComment {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerNextComment',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly active = computed(
    () => this.pdfViewer.activeCommentId() === this.comment().id,
  );
  private readonly class = computed(() =>
    cn('data-active:bg-accent', this.classInput()),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    effect(() => {
      if (this.active()) {
        requestAnimationFrame(() =>
          element.scrollIntoView({ block: 'nearest' }),
        );
      }
    });
  }
}
