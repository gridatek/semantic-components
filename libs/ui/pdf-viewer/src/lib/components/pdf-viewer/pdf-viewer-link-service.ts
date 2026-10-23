import type { ScPdfViewer } from './pdf-viewer';

/**
 * pdf.js's link service, for the annotation and XFA layers: where links go
 * (pages, destinations, named actions, layers) — through the viewer.
 */

const DEFAULT_LINK_REL = 'noopener noreferrer nofollow';

const enum LinkTarget {
  NONE = 0,
  SELF = 1,
  BLANK = 2,
  PARENT = 3,
  TOP = 4,
}

export class ScPdfLinkService {
  externalLinkEnabled = true;

  private externalLinkTarget: LinkTarget = LinkTarget.BLANK;
  private externalLinkRel: string = DEFAULT_LINK_REL;
  private baseUrl: string | null = null;

  constructor(private viewer: ScPdfViewer) {}

  get pagesCount(): number {
    return this.viewer.totalPages();
  }

  get page(): number {
    return this.viewer.currentPage();
  }

  set page(value: number) {
    this.viewer.goToPage(value);
  }

  get rotation(): number {
    return this.viewer.rotation();
  }

  set rotation(value: number) {
    // Rotation is managed by the viewer root
  }

  get isInPresentationMode(): boolean {
    return this.viewer.presenting();
  }

  /** Form fields send their script events through it. */
  get eventBus(): ScPdfViewer['scripting']['eventBus'] {
    return this.viewer.scripting.eventBus;
  }

  setDocument(baseUrl: string | null = null): void {
    this.baseUrl = baseUrl;
  }

  addLinkAttributes(
    link: HTMLAnchorElement,
    url: string,
    newWindow = false,
  ): void {
    if (!url || typeof url !== 'string') return;

    if (this.externalLinkEnabled) {
      link.href = link.title = url;
    } else {
      link.href = '';
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }

    const target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget;
    switch (target) {
      case LinkTarget.SELF:
        link.target = '_self';
        break;
      case LinkTarget.BLANK:
        link.target = '_blank';
        break;
      case LinkTarget.PARENT:
        link.target = '_parent';
        break;
      case LinkTarget.TOP:
        link.target = '_top';
        break;
      default:
        break;
    }

    link.rel = this.externalLinkRel;
  }

  getDestinationHash(dest: unknown): string {
    if (typeof dest === 'string' && dest.length > 0) {
      return this.getAnchorUrl('#' + escape(dest));
    }
    if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);
      if (str.length > 0) {
        return this.getAnchorUrl('#' + escape(str));
      }
    }
    return this.getAnchorUrl('');
  }

  getAnchorUrl(anchor: string): string {
    return this.baseUrl ? this.baseUrl + anchor : anchor;
  }

  goToDestination(dest: unknown): Promise<void> {
    return this.viewer.goToDestination(dest);
  }

  /** A file attachment annotation's content, loaded when it's opened. */
  async getAttachmentContent(id: string): Promise<Uint8Array | null> {
    try {
      return (
        (await this.viewer.pdfDocument()?.getAttachmentContent(id)) ?? null
      );
    } catch {
      return null;
    }
  }

  goToPage(val: number | string): void {
    const doc = this.viewer.pdfDocument();
    if (!doc) return;

    const pageNumber = typeof val === 'string' ? parseInt(val, 10) : val | 0;
    if (
      Number.isInteger(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= this.pagesCount
    ) {
      this.viewer.jumpToPage(pageNumber);
    }
  }

  setHash(hash: string): void {
    this.viewer.applyHash(hash);
  }

  executeNamedAction(action: string): void {
    switch (action) {
      case 'NextPage':
        this.viewer.goToNextPage();
        break;
      case 'PrevPage':
        this.viewer.goToPrevPage();
        break;
      case 'FirstPage':
        this.viewer.goToPage(1);
        break;
      case 'LastPage':
        this.viewer.goToPage(this.viewer.totalPages());
        break;
      case 'GoBack':
        this.viewer.goBack();
        break;
      case 'GoForward':
        this.viewer.goForward();
        break;
    }
  }

  async executeSetOCGState(action: unknown): Promise<void> {
    this.viewer.applyLayerState(action);
  }
}
