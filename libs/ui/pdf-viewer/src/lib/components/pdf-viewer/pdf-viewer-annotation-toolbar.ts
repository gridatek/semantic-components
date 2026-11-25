import {
  ApplicationRef,
  Directive,
  InjectionToken,
  Injector,
  TemplateRef,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { stampTemplates } from './pdf-viewer-stamp';
import type { ScPdfAnnotation, ScPdfAnnotationType } from './pdf-viewer-types';

/** The annotation a toolbar is for: its parts act on it. */
export const SC_PDF_ANNOTATION = new InjectionToken<ScPdfAnnotation>(
  'SC_PDF_ANNOTATION',
);

/** What your annotation toolbar's template gets: the annotation. */
export interface ScPdfAnnotationToolbarContext {
  $implicit: ScPdfAnnotation;
}

/**
 * Your toolbar on a selected annotation — the template, stamped where pdf.js
 * puts its own (in the annotation, which it follows when moved, resized or
 * zoomed, and in its focus order), in place of pdf.js's buttons:
 *
 * ```html
 * <ng-template scPdfViewerAnnotationToolbar let-annotation>
 *   <button scPdfViewerAnnotationComment>…</button>
 *   <button scPdfViewerAnnotationDelete>…</button>
 * </ng-template>
 * ```
 *
 * `annotation` is the one selected (`{ id, type, pageNumber }`): show what
 * fits its type — colours for a highlight (`button[scPdfViewerColor]`), alt
 * text for an image. Your buttons, icons and words: the library draws none.
 * Without it, annotations have no toolbar. The box is the style's popover.
 */
@Directive({ selector: 'ng-template[scPdfViewerAnnotationToolbar]' })
export class ScPdfViewerAnnotationToolbar {
  private readonly template =
    inject<TemplateRef<ScPdfAnnotationToolbarContext>>(TemplateRef);
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly popoverStyles = injectStyle().popover;

  /** The box: the style's popover, as a row of buttons. */
  private readonly boxClass = cn(
    this.popoverStyles.popup,
    'w-auto flex-row items-center gap-1 p-1',
    // Vertical separators (scSeparator): short and centered on the row.
    '*:data-[orientation=vertical]:mx-0.5 *:data-[orientation=vertical]:h-5 *:data-[orientation=vertical]:self-center',
  );

  constructor() {
    // Into each toolbar pdf.js makes for an annotation (`div.editToolbar`
    // in its element: made when it's first selected, shown and hidden by
    // pdf.js since).
    effect((onCleanup) => {
      const engine = this.pdfViewer.engine();
      if (!engine) return;
      const stop = untracked(() =>
        stampTemplates({
          container: engine.viewer.container as HTMLElement,
          selector: '.annotationEditorLayer .editToolbar',
          template: this.template,
          injector: this.injector,
          appRef: this.appRef,
          stampFor: (toolbar) => this.stampFor(toolbar),
        }),
      );
      onCleanup(stop);
    });
  }

  static ngTemplateContextGuard(
    _dir: ScPdfViewerAnnotationToolbar,
    context: unknown,
  ): context is ScPdfAnnotationToolbarContext {
    return !!context;
  }

  private stampFor(toolbar: HTMLElement) {
    const id = toolbar.parentElement?.id;
    const editor = id ? this.pdfViewer.annotationEditor(id) : undefined;
    if (!editor) return null;
    const annotation: ScPdfAnnotation = {
      id: editor.id,
      type: editor.editorType as ScPdfAnnotationType,
      pageNumber: editor.pageIndex + 1,
    };
    const box = toolbar.ownerDocument.createElement('div');
    box.dataset['slot'] = 'pdf-viewer-annotation-toolbar';
    box.className = this.boxClass;
    // Focus in the toolbar: the annotation stays selected, uncommitted —
    // what pdf.js's own toolbar buttons do. After your parts' handlers
    // (bubbling), before the annotation's.
    box.addEventListener('focusin', (event) => {
      editor._focusEventsAllowed = false;
      event.stopPropagation();
    });
    box.addEventListener('focusout', (event) => {
      editor._focusEventsAllowed = true;
      event.stopPropagation();
    });
    return {
      context: { $implicit: annotation },
      providers: [{ provide: SC_PDF_ANNOTATION, useValue: annotation }],
      box,
    };
  }
}
