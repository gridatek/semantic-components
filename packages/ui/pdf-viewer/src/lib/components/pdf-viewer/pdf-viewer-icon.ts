import {
  ApplicationRef,
  Directive,
  Injector,
  TemplateRef,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { stampTemplates } from './pdf-viewer-stamp';

/** The icons pdf.js shows on the pages: yours (`scPdfViewerIcon`). */
export type ScPdfViewerIconName =
  'comment' | 'alt-text-missing' | 'page-loading' | 'media-play';

/** Where each goes (pdf.js's elements), and its box there. */
const PLACES: Record<ScPdfViewerIconName, { selector: string; box: string }> = {
  // The button by an annotation with a comment (pdf.js names it).
  comment: {
    selector: '.annotationCommentButton',
    box: "pointer-events-none flex size-full items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
  },
  // The badge on an image without alt text.
  'alt-text-missing': {
    selector: '.noAltTextBadge',
    box: "pointer-events-none flex size-full items-center justify-center [&_svg:not([class*='size-'])]:size-4",
  },
  // The button that plays a video or sound embedded in the document
  // (pdf.js names it with the file's name).
  'media-play': {
    selector: '.mediaPlayButton',
    box: "pointer-events-none flex size-full items-center justify-center [&_svg:not([class*='size-'])]:size-12",
  },
  // A page being drawn: shown while it is.
  'page-loading': {
    selector: '.pdfViewer .page',
    box: "pointer-events-none absolute inset-0 hidden items-center justify-center text-muted-foreground in-[.loadingIcon]:flex [&_svg:not([class*='size-'])]:size-6",
  },
};

/**
 * An icon pdf.js shows on the pages, yours — the library draws none:
 *
 * ```html
 * <ng-template scPdfViewerIcon="comment"><svg siMessageSquareIcon></svg></ng-template>
 * ```
 *
 * `comment`: in the button by an annotation with a comment (pdf.js names
 * the button). `alt-text-missing`: the badge on an image without alt text.
 * `page-loading`: a page being drawn (a spinner: `svg[scSpinner]`, named).
 * `media-play`: the button that plays a video or sound in the document.
 * Stamped into each, as pdf.js makes them; without one, they show none. The
 * icon takes the colour pdf.js gives the place.
 */
@Directive({ selector: 'ng-template[scPdfViewerIcon]' })
export class ScPdfViewerIcon {
  private readonly template = inject<TemplateRef<object>>(TemplateRef);
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);

  readonly name = input.required<ScPdfViewerIconName>({
    alias: 'scPdfViewerIcon',
  });

  constructor() {
    effect((onCleanup) => {
      const engine = this.pdfViewer.engine();
      const name = this.name();
      if (!engine) return;
      const place = PLACES[name];
      const stop = untracked(() =>
        stampTemplates({
          container: engine.viewer.container as HTMLElement,
          selector: place.selector,
          template: this.template,
          injector: this.injector,
          appRef: this.appRef,
          stampFor: (element) => {
            const box = element.ownerDocument.createElement('span');
            box.dataset['slot'] = 'pdf-viewer-icon';
            box.dataset['icon'] = name;
            box.className = cn(place.box);
            return { context: {}, box };
          },
        }),
      );
      onCleanup(stop);
    });
  }
}
