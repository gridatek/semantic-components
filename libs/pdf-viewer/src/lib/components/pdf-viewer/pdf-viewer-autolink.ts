import type { PageViewport } from 'pdfjs-dist';
import { AnnotationType } from 'pdfjs-dist';

/**
 * Links found in a page's text — URLs and email addresses that aren't
 * already links — as pdf.js link annotations, as pdf.js's viewer does
 * (its Autolinker). The annotation layer adds them with
 * `addLinkAnnotations`.
 */

/** URLs (http, https, mailto, www.) and email addresses (as pdf.js's). */
const LINK_PATTERN =
  '\\b(?:https?:\\/\\/|mailto:|www\\.)(?:[\\S--[\\p{P}<>]]|\\/|[\\S--[\\[\\]]]+[\\S--[\\p{P}<>]])+|(?=\\p{L})[\\S--[@\\p{Ps}\\p{Pe}<>]]{1,64}@([\\S--[[\\p{P}--\\-]<>]]{1,63}(?:\\.[\\S--[[\\p{P}--\\-]<>]]{1,63})+)';

let regex: RegExp | null | undefined;
let nextId = 0;

/** The pattern needs the regexp `v` flag; without it, no auto-links. */
function linkRegex(): RegExp | null {
  if (regex === undefined) {
    try {
      regex = new RegExp(LINK_PATTERN, 'gv');
    } catch {
      regex = null;
    }
  }
  return regex;
}

interface FoundLink {
  url: string;
  index: number;
  length: number;
}

/** URLs and emails in a page's text, with their place in it. */
function findLinks(text: string): FoundLink[] {
  const pattern = linkRegex();
  if (!pattern) return [];
  const links: FoundLink[] = [];
  for (const match of text.matchAll(pattern)) {
    const [found, emailDomain] = match;
    let raw: string;
    if (/^(?:www\.|https?:\/\/)/.test(found)) {
      raw = found;
    } else if (emailDomain) {
      let hostname: string;
      try {
        hostname = new URL(`http://${emailDomain}`).hostname;
      } catch {
        continue;
      }
      if (/\.\d+$/.test(hostname)) continue;
      raw = found.startsWith('mailto:') ? found : `mailto:${found}`;
    } else {
      raw = found.startsWith('mailto:') ? found : `mailto:${found}`;
    }
    let url: URL;
    try {
      url = new URL(raw.startsWith('www.') ? `http://${raw}` : raw);
    } catch {
      continue;
    }
    if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) continue;
    links.push({
      url: url.href,
      index: match.index ?? 0,
      length: found.length,
    });
  }
  return links;
}

/** The text node and offset at a character offset inside an element. */
function textPosition(container: Node, offset: number): [Node, number] {
  let node: Node = container;
  do {
    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent?.length ?? 0;
      if (offset <= length) return [node, offset];
      offset -= length;
    } else if (node.firstChild) {
      node = node.firstChild;
      continue;
    }
    while (!node.nextSibling && node !== container && node.parentNode) {
      node = node.parentNode;
    }
    if (node !== container && node.nextSibling) node = node.nextSibling;
  } while (node !== container);
  return [container, 0];
}

type Rect = [number, number, number, number];

function normalizeRect([x1, y1, x2, y2]: number[]): Rect {
  return [
    Math.min(x1, x2),
    Math.min(y1, y2),
    Math.max(x1, x2),
    Math.max(y1, y2),
  ];
}

function intersect(a: Rect, b: Rect): Rect | null {
  const x1 = Math.max(a[0], b[0]);
  const y1 = Math.max(a[1], b[1]);
  const x2 = Math.min(a[2], b[2]);
  const y2 = Math.min(a[3], b[3]);
  return x1 < x2 && y1 < y2 ? [x1, y1, x2, y2] : null;
}

function area(rects: Rect[]): number {
  return rects.reduce(
    (sum, r) => sum + Math.abs((r[2] - r[0]) * (r[3] - r[1])),
    0,
  );
}

/** An annotation's rectangles: its quads, or its rect. */
function rectsOf(annotation: {
  rect: number[];
  quadPoints?: ArrayLike<number> | null;
}): Rect[] {
  const quads = annotation.quadPoints;
  if (!quads?.length) return [normalizeRect(annotation.rect)];
  const rects: Rect[] = [];
  for (let i = 0; i + 7 < quads.length; i += 8) {
    rects.push(
      normalizeRect([quads[i + 4], quads[i + 5], quads[i + 2], quads[i + 3]]),
    );
  }
  return rects;
}

/**
 * Link annotations for the URLs and emails in a page's text layer, leaving
 * out those mostly covered by an existing link.
 */
export function inferLinkAnnotations(
  textLayer: HTMLElement,
  textDivs: HTMLElement[],
  texts: string[],
  viewport: PageViewport,
  existing: {
    annotationType: number;
    rect: number[];
    quadPoints?: ArrayLike<number> | null;
  }[],
): object[] {
  // The items joined by line breaks, as pdf.js does.
  const starts: number[] = [];
  let offset = 0;
  for (const text of texts) {
    starts.push(offset);
    offset += text.length + 1;
  }
  const found = findLinks(texts.join('\n'));
  if (!found.length) return [];

  const layerBox = textLayer.getBoundingClientRect();
  const toPdf = (x: number, y: number): number[] =>
    viewport.convertToPdfPoint(x - layerBox.left, y - layerBox.top);
  const locate = (at: number): [Node, number] | null => {
    let item = starts.length - 1;
    while (item > 0 && starts[item] > at) item--;
    const div = textDivs[item];
    return div ? textPosition(div, at - starts[item]) : null;
  };

  const links = [];
  const existingLinks = existing.filter(
    (a) => a.annotationType === AnnotationType.LINK,
  );
  for (const link of found) {
    const start = locate(link.index);
    const end = locate(link.index + link.length);
    if (!start || !end) continue;
    const range = document.createRange();
    try {
      range.setStart(...start);
      range.setEnd(...end);
    } catch {
      continue;
    }
    const rects: Rect[] = [];
    for (const box of range.getClientRects()) {
      if (!box.width || !box.height) continue;
      rects.push(
        normalizeRect([
          ...toPdf(box.left, box.bottom),
          ...toPdf(box.right, box.top),
        ]),
      );
    }
    if (!rects.length) continue;

    // Already a link (mostly)? Leave it.
    const covered = existingLinks.some((annotation) => {
      const overlaps = rectsOf(annotation).flatMap((a) =>
        rects.map((b) => intersect(a, b)).filter((r): r is Rect => !!r),
      );
      return overlaps.length > 0 && area(overlaps) / area(rects) > 0.5;
    });
    if (covered) continue;

    const rect: Rect = [
      Math.min(...rects.map((r) => r[0])),
      Math.min(...rects.map((r) => r[1])),
      Math.max(...rects.map((r) => r[2])),
      Math.max(...rects.map((r) => r[3])),
    ];
    const quadPoints =
      rects.length > 1
        ? rects.flatMap((r) => [r[0], r[3], r[2], r[3], r[0], r[1], r[2], r[1]])
        : undefined;
    links.push({
      id: `sc_inferred_link_${nextId++}`,
      annotationType: AnnotationType.LINK,
      url: link.url,
      unsafeUrl: link.url,
      rotation: 0,
      rect,
      ...(quadPoints && { quadPoints }),
      borderStyle: null,
    });
  }
  return links;
}
