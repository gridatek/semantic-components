import {
  ApplicationRef,
  Directive,
  type EmbeddedViewRef,
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
import type { ScPdfEngine } from './pdf-viewer-engine';
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
    effect((onCleanup) => {
      const engine = this.pdfViewer.engine();
      if (!engine) return;
      onCleanup(untracked(() => this.stampToolbars(engine)));
    });
  }

  static ngTemplateContextGuard(
    _dir: ScPdfViewerAnnotationToolbar,
    context: unknown,
  ): context is ScPdfAnnotationToolbarContext {
    return !!context;
  }

  /**
   * Stamps the template into each toolbar pdf.js makes for an annotation
   * (`div.editToolbar` in the annotation's element: made when it's first
   * selected, shown and hidden by pdf.js since), and takes it out when the
   * toolbar goes.
   */
  private stampToolbars(engine: ScPdfEngine): () => void {
    const container = engine.viewer.container as HTMLElement;
    const view = container.ownerDocument.defaultView;
    if (!view?.MutationObserver) return () => undefined;
    const stamped = new Map<
      HTMLElement,
      { box: HTMLElement; ref: EmbeddedViewRef<ScPdfAnnotationToolbarContext> }
    >();

    const stamp = (toolbar: HTMLElement): void => {
      if (stamped.has(toolbar)) return;
      const id = toolbar.parentElement?.id;
      const editor = id ? this.pdfViewer.annotationEditor(id) : undefined;
      if (!editor) return;
      const annotation: ScPdfAnnotation = {
        id: editor.id,
        type: editor.editorType as ScPdfAnnotationType,
        pageNumber: editor.pageIndex + 1,
      };
      const box = container.ownerDocument.createElement('div');
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
      toolbar.append(box);
      const ref = this.template.createEmbeddedView(
        { $implicit: annotation },
        Injector.create({
          providers: [{ provide: SC_PDF_ANNOTATION, useValue: annotation }],
          parent: this.injector,
        }),
      );
      box.append(...ref.rootNodes);
      this.appRef.attachView(ref);
      ref.detectChanges();
      stamped.set(toolbar, { box, ref });
    };

    const unstamp = (toolbar: HTMLElement): void => {
      const entry = stamped.get(toolbar);
      if (!entry) return;
      stamped.delete(toolbar);
      entry.ref.destroy();
      entry.box.remove();
    };

    const toolbarsIn = (node: Node): HTMLElement[] =>
      node instanceof view.HTMLElement
        ? node.matches('.editToolbar')
          ? [node]
          : Array.from(node.querySelectorAll<HTMLElement>('.editToolbar'))
        : [];

    const observer = new view.MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => toolbarsIn(node).forEach(stamp));
      }
      // Gone with its annotation (deleted, or its page let go).
      for (const toolbar of [...stamped.keys()]) {
        if (!toolbar.isConnected) unstamp(toolbar);
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    toolbarsIn(container).forEach(stamp);

    return () => {
      observer.disconnect();
      [...stamped.keys()].forEach(unstamp);
    };
  }
}
