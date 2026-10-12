import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * A comment in your list of `viewer.comments()`. Marked `data-active` when
 * it's picked — here (`scPdfViewerCommentShow`) or by its marker on the page
 * — and scrolled into view then.
 */
@Directive({
  selector: '[scPdfViewerComment]',
  host: {
    'data-slot': 'pdf-viewer-comment',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
  },
})
export class ScPdfViewerComment {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerComment',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly active = computed(
    () => this.pdfViewer.activeCommentId() === this.comment().id,
  );
  protected readonly class = computed(() =>
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
