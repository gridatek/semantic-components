import { Directive, TemplateRef, inject } from '@angular/core';
import type { ScPdfComment } from './pdf-viewer-types';

/** What the comment marker template gets. */
export interface ScPdfCommentMarkerContext {
  /** The comment — null for the one being placed. */
  $implicit: ScPdfComment | null;
  /** Its position in `viewer.comments()`. */
  index: number;
  /** It's the picked comment (`viewer.activeCommentId()`). */
  active: boolean;
  /** It's the comment being placed, not posted yet. */
  pending: boolean;
}

/**
 * A comment's marker on its page, written by you inside
 * `sc-pdf-viewer-canvas`; the canvas places it where the comment was put:
 * `<ng-template scPdfViewerCommentMarker let-comment let-index="index"
 * let-active="active" let-pending="pending">`. Pick the comment with a
 * `scPdfViewerCommentShow` button.
 */
@Directive({
  selector: 'ng-template[scPdfViewerCommentMarker]',
})
export class ScPdfViewerCommentMarker {
  readonly templateRef =
    inject<TemplateRef<ScPdfCommentMarkerContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScPdfViewerCommentMarker,
    context: unknown,
  ): context is ScPdfCommentMarkerContext {
    return !!context;
  }
}
