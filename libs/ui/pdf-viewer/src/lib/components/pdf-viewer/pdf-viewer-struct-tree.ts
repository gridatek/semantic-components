import type { PDFPageProxy } from 'pdfjs-dist';

/**
 * A page's structure tree (tagged PDF) as an accessible DOM tree, as
 * pdf.js's viewer builds it (its StructTreeLayerBuilder): headings, lists,
 * tables, figures… whose `aria-owns` point at the text layer's marked
 * content. It goes inside the page's canvas, as its fallback content.
 */

interface StructNode {
  role?: string;
  type?: string;
  id?: string;
  structId?: string;
  alt?: string;
  lang?: string;
  short?: string;
  summary?: string;
  scope?: string;
  mathML?: string;
  rowSpan?: number;
  colSpan?: number;
  headers?: string[];
  bbox?: number[];
  children?: StructNode[];
}

interface RawDims {
  pageWidth: number;
  pageHeight: number;
  pageX: number;
  pageY: number;
}

const PDF_ROLE_TO_HTML_ROLE: Record<string, string | null> = {
  Document: null,
  DocumentFragment: null,
  Part: 'group',
  Art: 'article',
  Sect: 'group',
  Div: 'group',
  BlockQuote: 'blockquote',
  Aside: 'note',
  NonStruct: 'none',
  P: 'paragraph',
  H: 'heading',
  Title: null,
  FENote: 'note',
  Sub: 'group',
  Lbl: null,
  Span: null,
  Em: 'emphasis',
  Strong: 'strong',
  Note: 'note',
  Code: 'code',
  Link: 'link',
  Annot: 'note',
  Form: 'form',
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: 'list',
  LI: 'listitem',
  LBody: null,
  Table: 'table',
  TR: 'row',
  TH: 'columnheader',
  TD: 'cell',
  THead: 'rowgroup',
  TBody: 'rowgroup',
  TFoot: 'rowgroup',
  Caption: 'caption',
  Figure: 'figure',
  Formula: null,
  Artifact: null,
};

const ARIA_ROLES_WITH_PROHIBITED_NAMES = new Set([
  'caption',
  'code',
  'emphasis',
  'generic',
  'none',
  'paragraph',
  'strong',
]);

const MATHML_ELEMENTS = new Set([
  'math',
  'merror',
  'mfrac',
  'mi',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mprescripts',
  'mroot',
  'mrow',
  'ms',
  'mspace',
  'msqrt',
  'mstyle',
  'msub',
  'msubsup',
  'msup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
]);

const MATHML_ATTRIBUTES = [
  'dir',
  'displaystyle',
  'mathbackground',
  'mathcolor',
  'mathsize',
  'scriptlevel',
  'encoding',
  'display',
  'linethickness',
  'intent',
  'arg',
  'form',
  'fence',
  'separator',
  'lspace',
  'rspace',
  'stretchy',
  'symmetric',
  'maxsize',
  'minsize',
  'largeop',
  'movablelimits',
  'width',
  'height',
  'depth',
  'voffset',
  'accent',
  'accentunder',
  'columnspan',
  'rowspan',
];

const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
const HEADING_PATTERN = /^H(\d+)$/;

/** The HTML Sanitizer API, where the browser has it. */
type SanitizerHTML = (html: string, options: { sanitizer: unknown }) => void;
let mathSanitizer: unknown;

/** A sanitizer keeping only MathML, or null without the Sanitizer API. */
function mathMLSanitizer(): unknown {
  if (mathSanitizer === undefined) {
    const Sanitizer = (globalThis as { Sanitizer?: new (o: object) => unknown })
      .Sanitizer;
    mathSanitizer = Sanitizer
      ? new Sanitizer({
          elements: [...MATHML_ELEMENTS].map((name) => ({
            name,
            namespace: MATHML_NAMESPACE,
          })),
          replaceWithChildrenElements: [
            { name: 'maction', namespace: MATHML_NAMESPACE },
          ],
          attributes: MATHML_ATTRIBUTES,
          comments: false,
        })
      : null;
  }
  return mathSanitizer;
}

/** The text without NUL characters (other control characters as spaces). */
function cleanText(text: string, replaceInvisible = false): string {
  let result = '';
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code === 0) continue;
    result += replaceInvisible && code < 0x20 ? ' ' : char;
  }
  return result;
}

let treeCount = 0;

export class ScPdfStructTree {
  private readonly tree: Promise<StructNode | null>;
  private rendered: Promise<HTMLElement | null> | null = null;
  private readonly annotationIds = new Set<string>();
  private readonly elementAttributes = new Map<string, Map<string, string>>();
  private readonly pendingLinkOwnership = new Map<
    string,
    { element: HTMLElement; ids: string[] }
  >();
  private linkTextId = 0;
  private readonly idPrefix = `sc_pdf_struct_${treeCount++}_`;
  private readonly structElementIds = new Map<string, string>();
  private readonly structElements = new Map<string, StructNode>();
  private elementsToAddToTextLayer: Map<string, HTMLElement> | null = null;
  private elementsToHideInTextLayer: string[] | null = null;
  private elementsToStealFromTextLayer: [Element, string[]][] | null = null;

  constructor(
    page: PDFPageProxy,
    private readonly rawDims: RawDims | null,
  ) {
    this.tree = page.getStructTree() as Promise<StructNode | null>;
  }

  /** The tree's DOM (built once), or null for an untagged page. */
  render(): Promise<HTMLElement | null> {
    this.rendered ??= this.tree
      .then((tree) => {
        if (!tree) return null;
        this.collectStructElements(tree);
        this.collectAnnotations(tree);
        const dom = this.walk(tree, []) as HTMLElement;
        dom.classList.add('structTree');
        return dom;
      })
      .catch(() => null);
    return this.rendered;
  }

  /** ARIA attributes the tree gives an annotation (for the annotation layer). */
  async getAriaAttributes(
    annotationId: string,
    { enableLinkOwnership = false } = {},
  ): Promise<Map<string, string> | null> {
    try {
      await this.render();
      const ownership = this.pendingLinkOwnership.get(annotationId);
      if (ownership && enableLinkOwnership) {
        const { element, ids } = ownership;
        element.removeAttribute('role');
        if (ids.length > 0) {
          this.attributesOf(annotationId).set('aria-owns', ids.join(' '));
        }
        this.pendingLinkOwnership.delete(annotationId);
      }
      return this.elementAttributes.get(annotationId) ?? null;
    } catch {
      return null;
    }
  }

  /** The annotations the tree refers to. */
  async getAnnotationIds(): Promise<Set<string> | null> {
    try {
      await this.render();
      return this.annotationIds;
    } catch {
      return null;
    }
  }

  /**
   * Each time the text layer is rendered: adds figures' alt text to it,
   * and hides the text the tree replaces (MathML).
   */
  updateTextLayer(textLayer: HTMLElement): void {
    const byId = (id: string) =>
      textLayer.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`);
    for (const [id, img] of this.elementsToAddToTextLayer ?? []) {
      byId(id)?.append(img);
    }
    for (const id of this.elementsToHideInTextLayer ?? []) {
      byId(id)?.setAttribute('aria-hidden', 'true');
    }
    for (const [element, ids] of this.elementsToStealFromTextLayer ?? []) {
      let textContent = '';
      for (const id of ids) {
        const text = byId(id);
        if (text) {
          textContent += text.textContent?.trim() ?? '';
          text.setAttribute('aria-hidden', 'true');
        }
      }
      if (textContent) element.textContent = textContent;
    }
  }

  private attributesOf(id: string): Map<string, string> {
    let attributes = this.elementAttributes.get(id);
    if (!attributes) {
      attributes = new Map();
      this.elementAttributes.set(id, attributes);
    }
    return attributes;
  }

  private collectStructElements(node: StructNode): void {
    if (node.structId && !this.structElements.has(node.structId)) {
      this.structElements.set(node.structId, node);
    }
    for (const child of node.children ?? []) {
      this.collectStructElements(child);
    }
  }

  private collectAnnotations(node: StructNode): void {
    if (node.type === 'annotation') {
      if (node.id) this.annotationIds.add(node.id);
      return;
    }
    for (const child of node.children ?? []) {
      this.collectAnnotations(child);
    }
  }

  private structElementId(structId: string): string {
    let id = this.structElementIds.get(structId);
    if (!id) {
      id = `${this.idPrefix}${this.structElementIds.size}`;
      this.structElementIds.set(structId, id);
    }
    return id;
  }

  /** The element ids of a cell's headers, and of their own headers. */
  private headerIds(headers: string[]): string[] {
    const result: string[] = [];
    const visited = new Set<string>();
    const pending = headers.slice().reverse();
    while (pending.length > 0) {
      const structId = pending.pop() as string;
      if (visited.has(structId)) continue;
      visited.add(structId);
      const header = this.structElements.get(structId);
      if (header?.role !== 'TH') continue;
      result.push(this.structElementId(structId));
      const own = header.headers ?? [];
      for (let i = own.length - 1; i >= 0; i--) pending.push(own[i]);
    }
    return result;
  }

  private setAttributes(node: StructNode, element: Element): void {
    const { alt, colSpan, headers, id, lang, rowSpan, short, structId } = node;
    if (alt !== undefined) {
      let added = false;
      const label = cleanText(alt);
      for (const child of node.children ?? []) {
        if (child.type === 'annotation' && child.id) {
          this.attributesOf(child.id).set('aria-label', label);
          added = true;
        }
      }
      const role =
        element.getAttribute('role') ||
        (element.localName === 'span' ? 'generic' : null);
      if (!added && role !== 'none') {
        element.setAttribute(
          role && ARIA_ROLES_WITH_PROHIBITED_NAMES.has(role)
            ? 'aria-description'
            : 'aria-label',
          label,
        );
      }
    }
    // An object (not content or an annotation) has no element to own.
    if (id !== undefined && node.type !== 'object') {
      element.setAttribute('aria-owns', id);
    }
    if (structId !== undefined && this.structElements.get(structId) === node) {
      const elementId = this.structElementId(structId);
      if (short !== undefined) {
        const abbreviation = document.createElement('span');
        abbreviation.id = elementId;
        abbreviation.setAttribute('aria-hidden', 'true');
        abbreviation.textContent = cleanText(short);
        element.append(abbreviation);
      } else {
        element.id = elementId;
      }
    }
    if (lang !== undefined) element.setAttribute('lang', cleanText(lang, true));
    if (rowSpan !== undefined) {
      element.setAttribute('aria-rowspan', String(rowSpan));
    }
    if (colSpan !== undefined) {
      element.setAttribute('aria-colspan', String(colSpan));
    }
    if (headers?.length) {
      const ids = this.headerIds(headers);
      if (ids.length) element.setAttribute('aria-describedby', ids.join(' '));
    }
    if (node.summary !== undefined) {
      element.setAttribute('aria-description', cleanText(node.summary));
    }
  }

  /**
   * A figure with alt text becomes an `img` in the text layer, where the
   * figure is on the page.
   */
  private addImageInTextLayer(node: StructNode, element: Element): boolean {
    const { alt, bbox, children } = node;
    const child = children?.[0];
    if (!this.rawDims || !alt || !bbox || child?.type !== 'content') {
      return false;
    }
    const { id } = child;
    if (!id) return false;
    element.setAttribute('aria-owns', id);
    const img = document.createElement('span');
    (this.elementsToAddToTextLayer ??= new Map()).set(id, img);
    img.setAttribute('role', 'img');
    img.setAttribute('aria-label', cleanText(alt));
    const { pageHeight, pageX, pageY } = this.rawDims;
    const calc = 'calc(var(--total-scale-factor) *';
    img.style.width = `${calc}${bbox[2] - bbox[0]}px)`;
    img.style.height = `${calc}${bbox[3] - bbox[1]}px)`;
    img.style.left = `${calc}${bbox[0] - pageX}px)`;
    img.style.top = `${calc}${pageHeight - bbox[3] + pageY}px)`;
    return true;
  }

  private collectIds(node: StructNode, ids: string[]): void {
    if (node.id !== undefined) ids.push(node.id);
    for (const child of node.children ?? []) this.collectIds(child, ids);
  }

  private walk(node: StructNode, parents: StructNode[]): Element {
    let element: Element | null = null;
    let visitChildren = true;
    const { role } = node;
    if (role !== undefined) {
      if (MATHML_ELEMENTS.has(role)) {
        element = document.createElementNS(MATHML_NAMESPACE, role);
        const ids: string[] = [];
        (this.elementsToStealFromTextLayer ??= []).push([element, ids]);
        for (const { type, id } of node.children ?? []) {
          if (type === 'content' && id) ids.push(id);
        }
      } else {
        element = document.createElement('span');
      }
      const heading = role.match(HEADING_PATTERN);
      if (heading) {
        element.setAttribute('role', 'heading');
        element.setAttribute('aria-level', heading[1]);
      } else if (PDF_ROLE_TO_HTML_ROLE[role]) {
        let htmlRole: string | null = PDF_ROLE_TO_HTML_ROLE[role];
        const parent = parents[parents.length - 1];
        if (role === 'TH') {
          if (node.scope === 'Row') {
            htmlRole = 'rowheader';
          } else if (node.scope === 'Column') {
            htmlRole = 'columnheader';
          } else if (
            parent?.role === 'TR' &&
            parents[parents.length - 2]?.role === 'TBody'
          ) {
            htmlRole = 'rowheader';
          }
        } else if (role === 'Caption') {
          if (parent?.role !== 'Table' && parent?.role !== 'Figure') {
            htmlRole = null;
          }
        }
        if (htmlRole) element.setAttribute('role', htmlRole);
      }
      if (role === 'Figure' && this.addImageInTextLayer(node, element)) {
        return element;
      }
      if (role === 'Formula') {
        const sanitizer = mathMLSanitizer();
        const setHTML = (element as unknown as { setHTML?: SanitizerHTML })
          .setHTML;
        if (node.mathML && sanitizer && setHTML) {
          visitChildren = false;
          setHTML.call(element, node.mathML, { sanitizer });
          this.collectIds(node, (this.elementsToHideInTextLayer ??= []));
          delete node.alt;
        }
        if (
          !node.mathML &&
          node.children?.length === 1 &&
          node.children[0].role !== 'math'
        ) {
          element = document.createElementNS(MATHML_NAMESPACE, 'math');
          delete node.alt;
        }
      }
    }
    element ??= document.createElement('span');
    this.setAttributes(node, element);

    const children = node.children;
    if (children) {
      const [only] = children;
      if (
        children.length === 1 &&
        only.role === undefined &&
        only.id !== undefined &&
        element.getAttribute('role') !== 'none'
      ) {
        this.setAttributes(only, element);
      } else if (visitChildren) {
        parents.push(node);
        for (const child of children) {
          element.append(this.walk(child, parents));
        }
        parents.pop();
      }
    }

    // A link's text belongs to its link annotation.
    if (role === 'Link') {
      const annotations = children?.filter((c) => c.type === 'annotation');
      if (annotations?.length === 1 && annotations[0].id) {
        const annotationId = annotations[0].id;
        const ids: string[] = [];
        for (const child of Array.from(element.children)) {
          if (child.getAttribute('aria-owns') === annotationId) continue;
          child.id ||= `${this.idPrefix}link_${this.linkTextId++}`;
          ids.push(child.id);
        }
        this.pendingLinkOwnership.set(annotationId, {
          element: element as HTMLElement,
          ids,
        });
      }
    }
    return element;
  }
}
