import { Directive, TemplateRef, inject } from '@angular/core';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/** What the annotation toolbar template gets. */
export interface ScPdfAnnotationToolbarContext {
  /** The selected annotation. */
  $implicit: ScPdfEditorAnnotation;
}

/**
 * The toolbar of the selected annotation, written by you inside
 * `sc-pdf-viewer-canvas`; the canvas places it next to the annotation:
 * `<ng-template scPdfViewerAnnotationToolbar let-annotation>`. Use
 * `scPdfViewerAnnotationDelete`, `scPdfViewerAnnotationAltText` and
 * `scPdfViewerAnnotationColor` buttons in it.
 */
@Directive({
  selector: 'ng-template[scPdfViewerAnnotationToolbar]',
})
export class ScPdfViewerAnnotationToolbar {
  readonly templateRef =
    inject<TemplateRef<ScPdfAnnotationToolbarContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScPdfViewerAnnotationToolbar,
    context: unknown,
  ): context is ScPdfAnnotationToolbarContext {
    return !!context;
  }
}
