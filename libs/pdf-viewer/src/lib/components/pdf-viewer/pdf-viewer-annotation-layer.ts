import type { PDFPageProxy, PageViewport } from 'pdfjs-dist';
import { AnnotationLayer, setLayerDimensions } from 'pdfjs-dist';
import type { ScPdfViewer } from './pdf-viewer';
import { inferLinkAnnotations } from './pdf-viewer-autolink';
import type { ScPdfTextLayerData } from './pdf-viewer-find-highlighter';
import type { ScPdfLinkService } from './pdf-viewer-link-service';
import type { ScPdfStructTree } from './pdf-viewer-struct-tree';

/**
 * A page's pdf.js annotation layer: links (and links found in the text),
 * form fields as HTML, notes, attachments, annotations with their own
 * canvas — named from the structure tree.
 */
export async function renderAnnotationLayer({
  div,
  page,
  viewport,
  scale,
  textLayer,
  textData,
  annotationCanvasMap,
  structTree,
  linkService,
  viewer,
}: {
  div: HTMLDivElement;
  page: PDFPageProxy;
  /** At the CSS scale. */
  viewport: PageViewport;
  scale: number;
  textLayer: HTMLElement | null;
  textData: ScPdfTextLayerData | undefined;
  /** Annotations drawn on their own canvas by page.render. */
  annotationCanvasMap: Map<string, HTMLCanvasElement>;
  structTree: ScPdfStructTree;
  linkService: ScPdfLinkService;
  viewer: ScPdfViewer;
}): Promise<void> {
  div.innerHTML = '';
  const annotations = await page.getAnnotations();
  // URLs and emails in the text that aren't links yet (as pdf.js).
  const inferredLinks =
    viewer.enableAutoLinking() && textData && textLayer
      ? inferLinkAnnotations(
          textLayer,
          textData.divs,
          textData.texts,
          viewport,
          annotations,
        )
      : [];
  if (annotations.length === 0 && inferredLinks.length === 0) return;

  div.style.setProperty('--total-scale-factor', String(scale));
  setLayerDimensions(div, viewport);

  const { fieldObjects, hasJSActions } = viewer.formInfo();
  const annotationLayer = new AnnotationLayer({
    div,
    accessibilityManager: null,
    annotationCanvasMap,
    annotationEditorUIManager: null,
    // Names and owned text for annotations, from the structure tree.
    structTreeLayer: structTree,
    commentManager: null,
    page,
    viewport: viewport.clone({ dontFlip: true }),
    linkService,
    annotationStorage: viewer.pdfDocument()?.annotationStorage ?? null,
  } as never);

  // Form fields as HTML inputs, their values kept in the document's
  // annotation storage (so they survive re-rendering and are saved).
  await annotationLayer.render({
    annotations,
    renderForms: viewer.canFillForms(),
    enableScripting: viewer.enableScripting(),
    hasJSActions,
    fieldObjects,
    // Note icons (pdf.js's images), attachments on the page, layers.
    imageResourcesPath: `${viewer.assetsUrl()}web/images/`,
    downloadManager: {
      openOrDownloadData: (content: Uint8Array, filename: string) =>
        viewer.downloadAttachment({ filename, content }),
    },
    optionalContentConfig: viewer.optionalContent(),
  } as never);
  if (inferredLinks.length) {
    await (
      annotationLayer as unknown as {
        addLinkAnnotations(links: object[]): Promise<void>;
      }
    ).addLinkAnnotations(inferredLinks);
  }
  setPresentationState(div, viewer.presenting());

  // pdf.js puts a field's name (its tooltip, /TU) on the wrapping section
  // as a title only; give the field itself that accessible name.
  for (const field of div.querySelectorAll<HTMLElement>(
    'section[title] :is(input, textarea, select)',
  )) {
    if (field.hasAttribute('aria-label')) continue;
    const name = field.closest('section')?.getAttribute('title');
    if (name) field.setAttribute('aria-label', name);
  }
}

/**
 * In presentation mode form fields don't take clicks — links still do
 * (as pdf.js's viewer).
 */
export function setPresentationState(
  annotationLayer: HTMLElement,
  presenting: boolean,
): void {
  for (const section of Array.from(annotationLayer.children)) {
    if (
      section.hasAttribute('data-internal-link') ||
      section.classList.contains('linkAnnotation') ||
      section.classList.contains('mediaAnnotation')
    ) {
      continue;
    }
    (section as HTMLElement).inert = presenting;
  }
}
