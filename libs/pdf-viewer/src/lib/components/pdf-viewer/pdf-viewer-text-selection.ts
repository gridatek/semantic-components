import { normalizeUnicode } from 'pdfjs-dist';

/**
 * Text selection as pdf.js's viewer does it (its TextLayerBuilder). Without
 * it, dragging over the gaps between lines makes the browser extend the
 * selection to everything up to the end of the page.
 *
 * Each text layer gets an "end of content" element. While selecting, it's
 * moved right after the selection's end and stretched over the whole layer
 * (`pdf_viewer.css` styles `.endOfContent` and `.selecting`), so the pointer
 * over empty space lands on it — not on the page behind, which the browser
 * would read as "select to the end". Copying puts the normalised text on
 * the clipboard — or nothing, when the document forbids copying.
 */
export class ScPdfTextSelection {
  /** Each text layer and its end-of-content element. */
  private readonly layers = new Map<HTMLElement, HTMLElement>();
  private abort: AbortController | null = null;

  constructor(private readonly canCopy: () => boolean = () => true) {}

  /** Call after a text layer is rendered. */
  add(textLayer: HTMLElement): void {
    const end = document.createElement('div');
    end.className = 'endOfContent';
    textLayer.append(end);
    textLayer.addEventListener('mousedown', this.onMousedown);
    textLayer.addEventListener('copy', this.onCopy);
    this.layers.set(textLayer, end);
    this.listen();
  }

  /** Call when a text layer is cleared or released. */
  remove(textLayer: HTMLElement): void {
    textLayer.removeEventListener('mousedown', this.onMousedown);
    textLayer.removeEventListener('copy', this.onCopy);
    this.layers.delete(textLayer);
    if (!this.layers.size) this.stop();
  }

  destroy(): void {
    for (const textLayer of [...this.layers.keys()]) this.remove(textLayer);
    this.stop();
  }

  private readonly onMousedown = (event: Event): void => {
    (event.currentTarget as HTMLElement).classList.add('selecting');
  };

  private readonly onCopy = (event: ClipboardEvent): void => {
    if (this.canCopy()) {
      const text = document.getSelection()?.toString() ?? '';
      event.clipboardData?.setData(
        'text/plain',
        // Without the null characters some PDFs' text contains.
        normalizeUnicode(text.split(String.fromCharCode(0)).join('')),
      );
    }
    event.preventDefault();
    event.stopPropagation();
  };

  private reset(end: HTMLElement, textLayer: HTMLElement): void {
    textLayer.append(end);
    end.style.width = '';
    end.style.height = '';
    textLayer.classList.remove('selecting');
  }

  private resetAll(): void {
    this.layers.forEach((end, textLayer) => this.reset(end, textLayer));
  }

  private stop(): void {
    this.abort?.abort();
    this.abort = null;
  }

  private listen(): void {
    if (this.abort) return;
    this.abort = new AbortController();
    const { signal } = this.abort;
    let pointerDown = false;
    let previous: Range | null = null;
    let modernEngine: boolean | undefined;

    document.addEventListener('pointerdown', () => (pointerDown = true), {
      signal,
    });
    document.addEventListener(
      'pointerup',
      () => {
        pointerDown = false;
        this.resetAll();
      },
      { signal },
    );
    window.addEventListener(
      'blur',
      () => {
        pointerDown = false;
        this.resetAll();
      },
      { signal },
    );
    document.addEventListener(
      'keyup',
      () => {
        if (!pointerDown) this.resetAll();
      },
      { signal },
    );

    document.addEventListener(
      'selectionchange',
      () => {
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0) {
          this.resetAll();
          return;
        }

        // The layers the selection is in are "selecting".
        const active = new Set<HTMLElement>();
        for (let i = 0; i < selection.rangeCount; i++) {
          const range = selection.getRangeAt(i);
          for (const textLayer of this.layers.keys()) {
            if (range.intersectsNode(textLayer)) active.add(textLayer);
          }
        }
        this.layers.forEach((end, textLayer) => {
          if (active.has(textLayer)) textLayer.classList.add('selecting');
          else this.reset(end, textLayer);
        });

        // Firefox and recent Chromium select sensibly on their own (pdf.js
        // checks the same way); others need the end moved to the selection.
        if (modernEngine === undefined) {
          const first = this.layers.keys().next().value;
          modernEngine =
            !!first &&
            getComputedStyle(first).getPropertyValue('-moz-user-select') ===
              'none';
          if (!modernEngine) {
            const version =
              /\bChrome\/(\d+)\b/.exec(navigator.userAgent)?.[1] ?? '';
            modernEngine = parseInt(version, 10) >= 148;
          }
        }
        if (modernEngine) return;

        const range = selection.getRangeAt(0);
        const modifyStart =
          !!previous &&
          (range.compareBoundaryPoints(Range.END_TO_END, previous) === 0 ||
            range.compareBoundaryPoints(Range.START_TO_END, previous) === 0);
        let anchor: Node = modifyStart
          ? range.startContainer
          : range.endContainer;
        if (anchor.nodeType === Node.TEXT_NODE && anchor.parentNode) {
          anchor = anchor.parentNode;
        }
        // A find highlight wraps text inside a span.
        if ((anchor as Element).classList?.contains('highlight')) {
          anchor = anchor.parentNode ?? anchor;
        }
        if (!modifyStart && range.endOffset === 0) {
          do {
            while (!anchor.previousSibling && anchor.parentNode) {
              anchor = anchor.parentNode;
            }
            if (!anchor.previousSibling) break;
            anchor = anchor.previousSibling;
          } while (!anchor.childNodes.length);
        }

        const textLayer =
          anchor.parentElement?.closest<HTMLElement>('.textLayer');
        const end = textLayer ? this.layers.get(textLayer) : undefined;
        if (textLayer && end && anchor.parentElement) {
          end.style.width = textLayer.style.width;
          end.style.height = textLayer.style.height;
          end.style.userSelect = 'text';
          anchor.parentElement.insertBefore(
            end,
            modifyStart ? anchor : anchor.nextSibling,
          );
        }
        previous = range.cloneRange();
      },
      { signal },
    );
  }
}
