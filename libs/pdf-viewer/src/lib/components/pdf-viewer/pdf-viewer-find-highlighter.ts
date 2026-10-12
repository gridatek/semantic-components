import type { ScPdfPageMatchInfo } from './pdf-viewer-types';

/**
 * Find's matches in the text layers: each match wrapped in a
 * `span.highlight` (`.selected` for the current one), as pdf.js's text
 * highlighter does. Offsets count in the page's text items joined.
 */

/** A rendered page's text layer: its items' elements and their text. */
export interface ScPdfTextLayerData {
  divs: HTMLElement[];
  texts: string[];
}

/**
 * Highlights the matches in the rendered pages' text layers (all of them,
 * or the current one only). Returns whether the current match is on a
 * page that has matches.
 */
export function highlightMatches(
  textLayers: ReadonlyMap<number, ScPdfTextLayerData>,
  allMatches: ScPdfPageMatchInfo[],
  highlightAll: boolean,
  currentMatchIndex: number,
): boolean {
  // The page and match the current index refers to.
  let currentPage = -1;
  let currentMatchOnPage = -1;
  let count = 0;
  for (let p = 0; p < allMatches.length; p++) {
    if (count + allMatches[p].matches.length > currentMatchIndex) {
      currentPage = p;
      currentMatchOnPage = currentMatchIndex - count;
      break;
    }
    count += allMatches[p].matches.length;
  }

  for (const [pageNumber, data] of textLayers) {
    const pageIdx = pageNumber - 1;
    const pageMatchInfo = allMatches[pageIdx];
    // The text as it was, first.
    clearPageHighlights(data);
    if (!pageMatchInfo || pageMatchInfo.matches.length === 0) continue;
    renderPageHighlights(
      data,
      pageMatchInfo,
      highlightAll,
      pageIdx === currentPage,
      currentMatchOnPage,
    );
  }
  return currentPage >= 0;
}

function clearPageHighlights(data: {
  divs: HTMLElement[];
  texts: string[];
}): void {
  for (let i = 0; i < data.divs.length; i++) {
    const div = data.divs[i];
    if (div.querySelector('.highlight')) {
      div.textContent = data.texts[i];
    }
  }
}

function renderPageHighlights(
  data: { divs: HTMLElement[]; texts: string[] },
  matchInfo: ScPdfPageMatchInfo,
  highlightAll: boolean,
  isSelectedPage: boolean,
  selectedMatchOnPage: number,
): void {
  // Where each item starts in the page's text: the items joined, which
  // find's offsets count in (as pdf.js's text highlighter).
  const starts: number[] = [];
  let offset = 0;
  for (const text of data.texts) {
    starts.push(offset);
    offset += text.length;
  }

  // Each item's highlighted parts (a match can span items, and an item
  // hold several matches).
  const parts = new Map<
    number,
    { start: number; end: number; selected: boolean }[]
  >();
  for (let m = 0; m < matchInfo.matches.length; m++) {
    const selected = isSelectedPage && m === selectedMatchOnPage;
    if (!highlightAll && !selected) continue;
    const matchStart = matchInfo.matches[m];
    const matchEnd = matchStart + matchInfo.matchesLength[m];
    for (let d = 0; d < data.texts.length; d++) {
      const itemStart = starts[d];
      const itemEnd = itemStart + data.texts[d].length;
      if (matchEnd <= itemStart || matchStart >= itemEnd) continue;
      const list = parts.get(d) ?? [];
      list.push({
        start: Math.max(0, matchStart - itemStart),
        end: Math.min(data.texts[d].length, matchEnd - itemStart),
        selected,
      });
      parts.set(d, list);
    }
  }

  for (const [d, list] of parts) {
    const text = data.texts[d];
    const frag = document.createDocumentFragment();
    let position = 0;
    for (const part of list.sort((a, b) => a.start - b.start)) {
      const from = Math.max(part.start, position);
      if (part.end <= from) continue;
      if (from > position) {
        frag.appendChild(
          document.createTextNode(text.substring(position, from)),
        );
      }
      const highlight = document.createElement('span');
      highlight.className = part.selected ? 'highlight selected' : 'highlight';
      highlight.textContent = text.substring(from, part.end);
      frag.appendChild(highlight);
      position = part.end;
    }
    if (position < text.length) {
      frag.appendChild(document.createTextNode(text.substring(position)));
    }
    const div = data.divs[d];
    div.textContent = '';
    div.appendChild(frag);
  }
}
