/**
 * Find as pdf.js's viewer does it (its PDFFindController): the page's text
 * is normalised first — words hyphenated at a line end joined, line breaks
 * between Chinese / Japanese / Korean characters dropped, other line breaks
 * turned into spaces, ligatures and compatibility characters (`ﬁ`, `½`…)
 * and curly quotes made plain, accents split off — and each match is mapped
 * back to the page's text, which the text layer highlights.
 */

/** Characters replaced before searching. */
const CHARACTERS_TO_NORMALIZE: Record<string, string> = {
  '‐': '-',
  '‘': "'",
  '’': "'",
  '‚': "'",
  '‛': "'",
  '“': '"',
  '”': '"',
  '„': '"',
  '‟': '"',
  '¼': '1/4',
  '½': '1/2',
  '¾': '3/4',
};

/** Combining marks that change the letter (kept when ignoring accents). */
const DIACRITICS_EXCEPTION = new Set([
  0x3099, 0x309a, 0x094d, 0x09cd, 0x0a4d, 0x0acd, 0x0b4d, 0x0bcd, 0x0c4d,
  0x0ccd, 0x0d3b, 0x0d3c, 0x0d4d, 0x0dca, 0x0e3a, 0x0eba, 0x0f84, 0x1039,
  0x103a, 0x1714, 0x1734, 0x17d2, 0x1a60, 0x1b44, 0x1baa, 0x1bab, 0x1bf2,
  0x1bf3, 0x2d7f, 0xa806, 0xa82c, 0xa8c4, 0xa953, 0xa9c0, 0xaaf6, 0xabed,
  0x0c56, 0x0f71, 0x0f72, 0x0f7a, 0x0f7b, 0x0f7c, 0x0f7d, 0x0f80, 0x0f74,
]);
const DIACRITICS_EXCEPTION_STR = String.fromCharCode(...DIACRITICS_EXCEPTION);

const DIACRITICS_REG_EXP = /\p{M}+/gu;
const SPECIAL_CHARS_REG_EXP = /([+^$|])|(\p{P}+)|(\s+)|(\p{M})|(\p{L})/gu;
/** Korean syllables, which NFD splits into several characters. */
const SYLLABLES_REG_EXP = /[가-힯𤋮𢡊-𣏕𥉉-𧻓]+/g;
const FIRST_CHAR_SYLLABLES_REG_EXP =
  '[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]';

const syllableLengths = new Map<string, number>();
const nfkcCharacters = new Map<string, string>();
let noSyllablesRegExp: RegExp | null = null;
let withSyllablesRegExp: RegExp | null = null;
let normalizeWithNFKC: string | null = null;

/** The characters NFKC changes (other than combining marks), as ranges. */
function charactersToNormalizeWithNFKC(): string {
  if (normalizeWithNFKC === null) {
    const ranges: string[] = [];
    let range: [number, number] | null = null;
    const diacritic = /^\p{M}$/u;
    const flush = () => {
      if (!range) return;
      const [from, to] = range;
      ranges.push(
        from === to
          ? String.fromCharCode(from)
          : `${String.fromCharCode(from)}-${String.fromCharCode(to)}`,
      );
    };
    for (let i = 0; i < 65536; i++) {
      if (i >= 0xd800 && i <= 0xdfff) continue;
      const c = String.fromCharCode(i);
      if (c.normalize('NFKC') === c || diacritic.test(c)) continue;
      if (range && range[1] + 1 === i) {
        range[1] = i;
      } else {
        flush();
        range = [i, i];
      }
    }
    flush();
    normalizeWithNFKC = ranges.join('');
  }
  return normalizeWithNFKC;
}

/** A regexp character class's special characters, escaped. */
function escapeForClass(text: string): string {
  return text.replace(/[\\\]^-]/g, '\\$&');
}

/**
 * A string's regexp special characters, escaped — only those, as the
 * regexp may be a unicode one, where other escapes are errors.
 */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/**
 * Where the normalised text's positions came from: at each `starts[i]`,
 * the original position is `shifts[i]` further.
 */
export type ScPdfFindDiffs = [Uint32Array, Int32Array];

/** A page's text normalised for searching. */
export interface ScPdfNormalizedText {
  text: string;
  diffs: ScPdfFindDiffs | null;
  /** It has combining marks (accents), which the query must allow. */
  hasDiacritics: boolean;
}

/** `text` normalised for searching, with how to map positions back. */
export function normalizeText(text: string): ScPdfNormalizedText {
  const syllablePositions: [number, number][] = [];
  let m: RegExpExecArray | null;
  SYLLABLES_REG_EXP.lastIndex = 0;
  while ((m = SYLLABLES_REG_EXP.exec(text)) !== null) {
    let index = m.index;
    for (const char of m[0]) {
      let length = syllableLengths.get(char);
      if (!length) {
        length = char.normalize('NFD').length;
        syllableLengths.set(char, length);
      }
      syllablePositions.push([length, index++]);
    }
  }

  const hasSyllables = syllablePositions.length > 0;
  let normalizationRegex = hasSyllables
    ? withSyllablesRegExp
    : noSyllablesRegExp;
  if (!normalizationRegex) {
    const replace = escapeForClass(
      Object.keys(CHARACTERS_TO_NORMALIZE).join(''),
    );
    const CJK = '(?:\\p{Ideographic}|[぀-ヿ])';
    const HKDiacritics = '(?:゙|゚)';
    const BrokenWord = '\\p{Ll}-\\n(?=\\p{Ll})|\\p{Lu}-\\n(?=\\p{L})';
    const regexps = [
      `[${replace}]`,
      `[${charactersToNormalizeWithNFKC()}]`,
      `${HKDiacritics}\\n`,
      '\\p{M}+(?:-\\n)?',
      BrokenWord,
      '\\S-\\n',
      `${CJK}\\n`,
      '\\n',
      hasSyllables ? FIRST_CHAR_SYLLABLES_REG_EXP : '\\u0000',
    ];
    normalizationRegex = new RegExp(
      regexps.map((r) => `(${r})`).join('|'),
      'gmu',
    );
    if (hasSyllables) withSyllablesRegExp = normalizationRegex;
    else noSyllablesRegExp = normalizationRegex;
  }

  const rawDiacriticsPositions: [number, number][] = [];
  DIACRITICS_REG_EXP.lastIndex = 0;
  while ((m = DIACRITICS_REG_EXP.exec(text)) !== null) {
    rawDiacriticsPositions.push([m[0].length, m.index]);
  }

  let normalized = text.normalize('NFD');
  const positions = [0, 0];
  let rawDiacriticsIndex = 0;
  let syllableIndex = 0;
  let shift = 0;
  let shiftOrigin = 0;
  let eol = 0;
  let hasDiacritics = false;

  normalized = normalized.replace(
    normalizationRegex,
    (
      _match: string,
      p1: string,
      p2: string,
      p3: string,
      p4: string,
      p5: string,
      p6: string,
      p7: string,
      p8: string,
      p9: string,
      i: number,
    ) => {
      i -= shiftOrigin;
      if (p1) {
        // Characters to replace (quotes, fractions).
        const replacement = CHARACTERS_TO_NORMALIZE[p1];
        const jj = replacement.length;
        for (let j = 1; j < jj; j++) positions.push(i - shift + j, shift - j);
        shift -= jj - 1;
        return replacement;
      }
      if (p2) {
        // Ligatures and other compatibility characters.
        let replacement = nfkcCharacters.get(p2);
        if (replacement === undefined) {
          replacement = p2.normalize('NFKC');
          nfkcCharacters.set(p2, replacement);
        }
        const jj = replacement.length;
        for (let j = 1; j < jj; j++) positions.push(i - shift + j, shift - j);
        shift -= jj - 1;
        return replacement;
      }
      if (p3) {
        // Japanese voiced / semi-voiced marks at a line end.
        hasDiacritics = true;
        if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]) {
          ++rawDiacriticsIndex;
        } else {
          positions.push(i - 1 - shift + 1, shift - 1);
          shift -= 1;
          shiftOrigin += 1;
        }
        positions.push(i - shift + 1, shift);
        shiftOrigin += 1;
        eol += 1;
        return p3.charAt(0);
      }
      if (p4) {
        // Combining marks, maybe before a hyphen at a line end.
        const hasTrailingDashEOL = p4.endsWith('\n');
        const len = hasTrailingDashEOL ? p4.length - 2 : p4.length;
        hasDiacritics = true;
        let jj = len;
        if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]) {
          jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
          ++rawDiacriticsIndex;
        }
        for (let j = 1; j <= jj; j++) {
          positions.push(i - 1 - shift + j, shift - j);
        }
        shift -= jj;
        shiftOrigin += jj;
        if (hasTrailingDashEOL) {
          i += len - 1;
          positions.push(i - shift + 1, 1 + shift);
          shift += 1;
          shiftOrigin += 1;
          eol += 1;
          return p4.slice(0, len);
        }
        return p4;
      }
      if (p5) {
        // A word hyphenated at a line end: joined.
        const len = p5.length - 2;
        positions.push(i - shift + len, 1 + shift);
        shift += 1;
        shiftOrigin += 1;
        eol += 1;
        return p5.slice(0, -2);
      }
      if (p6) {
        // A hyphen at a line end that's part of the text (e.g. "COVID-").
        shiftOrigin += 1;
        eol += 1;
        return p6.slice(0, -1);
      }
      if (p7) {
        // A line break between Chinese / Japanese / Korean characters.
        const len = p7.length - 1;
        positions.push(i - shift + len, shift);
        shiftOrigin += 1;
        eol += 1;
        return p7.slice(0, -1);
      }
      if (p8) {
        // Another line break: a space.
        positions.push(i - shift + 1, shift - 1);
        shift -= 1;
        shiftOrigin += 1;
        eol += 1;
        return ' ';
      }
      // A Korean syllable's first character (NFD split it).
      if (i + eol === syllablePositions[syllableIndex]?.[1]) {
        const newCharLen = syllablePositions[syllableIndex][0] - 1;
        ++syllableIndex;
        for (let j = 1; j <= newCharLen; j++) {
          positions.push(i - (shift - j), shift - j);
        }
        shift -= newCharLen;
        shiftOrigin += newCharLen;
      }
      return p9;
    },
  );

  positions.push(normalized.length, shift);
  const starts = new Uint32Array(positions.length >> 1);
  const shifts = new Int32Array(positions.length >> 1);
  for (let i = 0; i < positions.length; i += 2) {
    starts[i >> 1] = positions[i];
    shifts[i >> 1] = positions[i + 1];
  }
  return { text: normalized, diffs: [starts, shifts], hasDiacritics };
}

/** The first index whose item meets `condition` (items sorted by it). */
function binarySearchFirstItem(
  items: ArrayLike<number>,
  condition: (item: number) => boolean,
  start = 0,
): number {
  let minIndex = start;
  let maxIndex = items.length - 1;
  if (maxIndex < 0 || !condition(items[maxIndex])) return items.length;
  if (condition(items[minIndex])) return minIndex;
  while (minIndex < maxIndex) {
    const currentIndex = (minIndex + maxIndex) >> 1;
    if (condition(items[currentIndex])) maxIndex = currentIndex;
    else minIndex = currentIndex + 1;
  }
  return minIndex;
}

/** A match in the normalised text, as `[start, length]` in the original. */
export function originalRange(
  diffs: ScPdfFindDiffs | null,
  pos: number,
  len: number,
): [number, number] {
  if (!diffs) return [pos, len];
  const [starts, shifts] = diffs;
  const start = pos;
  const end = pos + len - 1;
  let i = binarySearchFirstItem(starts, (x) => x >= start);
  if (starts[i] > start) --i;
  let j = binarySearchFirstItem(starts, (x) => x >= end, i);
  if (starts[j] > end) --j;
  const oldStart = start + shifts[i];
  const oldEnd = end + shifts[j];
  return [oldStart, oldEnd + 1 - oldStart];
}

interface Segmenter {
  segment(text: string): {
    containing(index: number): { index: number; segment: string };
  };
}
let wordSegmenter: Segmenter | null = null;
let graphemeSegmenter: Segmenter | null = null;

function segmenter(granularity: 'word' | 'grapheme'): Segmenter {
  const Ctor = (
    Intl as unknown as {
      Segmenter: new (
        locale: undefined,
        options: { granularity: string },
      ) => Segmenter;
    }
  ).Segmenter;
  return new Ctor(undefined, { granularity });
}

/** Whether a word starts or ends at `pos` (in any script). */
function isWordBreakAt(content: string, pos: number): boolean {
  graphemeSegmenter ??= segmenter('grapheme');
  const graphemes = graphemeSegmenter.segment(content);
  const after = graphemes.containing(pos);
  if (after.index !== pos) return false;
  wordSegmenter ??= segmenter('word');
  const before = graphemes.containing(pos - 1).segment;
  return (
    wordSegmenter.segment(before + after.segment).containing(before.length)
      .index === before.length
  );
}

function isEntireWord(content: string, start: number, length: number): boolean {
  const end = start + length;
  return (
    (start === 0 || isWordBreakAt(content, start)) &&
    (end === content.length || isWordBreakAt(content, end))
  );
}

export interface ScPdfFindOptions {
  matchCase: boolean;
  entireWord: boolean;
  matchDiacritics: boolean;
}

/**
 * The query (normalised) as a regexp source: spaces match any run of
 * spaces, punctuation may have spaces around it, and accents are optional
 * unless they must match.
 */
function queryToRegExp(
  query: string,
  hasDiacritics: boolean,
  matchDiacritics: boolean,
): [boolean, string] {
  let isUnicode = false;
  const addExtraWhitespaces = (original: string, fixed: string): string => {
    if (original === query) return fixed;
    if (query.startsWith(original)) return `${fixed}[ ]*`;
    return query.endsWith(original) ? `[ ]*${fixed}` : `[ ]*${fixed}[ ]*`;
  };
  let source = query.replace(
    SPECIAL_CHARS_REG_EXP,
    (
      _match: string,
      p1: string,
      p2: string,
      p3: string,
      p4: string,
      p5: string,
    ) => {
      if (p1) return addExtraWhitespaces(p1, escapeRegExp(p1));
      if (p2) return addExtraWhitespaces(p2, escapeRegExp(p2));
      if (p3) return '[ ]+';
      if (matchDiacritics) return p4 || p5;
      if (p4) return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0)) ? p4 : '';
      if (hasDiacritics) {
        isUnicode = true;
        return `${p5}\\p{M}*`;
      }
      return p5;
    },
  );
  const trailingSpaces = '[ ]*';
  if (source.endsWith(trailingSpaces)) {
    source = source.slice(0, source.length - trailingSpaces.length);
  }
  if (matchDiacritics && hasDiacritics) {
    isUnicode = true;
    source = `${source}(?=[${DIACRITICS_EXCEPTION_STR}]|[^\\p{M}]|$)`;
  }
  return [isUnicode, source];
}

/**
 * The matches of `query` (normalised with `normalizeText`) in a page, as
 * `[start, length]` pairs in the page's original text.
 */
export function findInPage(
  query: string,
  page: ScPdfNormalizedText,
  { matchCase, entireWord, matchDiacritics }: ScPdfFindOptions,
): [number, number][] {
  const [isUnicode, source] = queryToRegExp(
    query,
    page.hasDiacritics,
    matchDiacritics,
  );
  if (!source) return [];
  // The other special characters ([], (), \…) are punctuation, escaped.
  const regex = new RegExp(
    source,
    `g${isUnicode ? 'u' : ''}${matchCase ? '' : 'i'}`,
  );
  const found: [number, number][] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(page.text)) !== null) {
    if (!match[0].length) {
      regex.lastIndex++;
      continue;
    }
    if (entireWord && !isEntireWord(page.text, match.index, match[0].length)) {
      continue;
    }
    const [start, length] = originalRange(
      page.diffs,
      match.index,
      match[0].length,
    );
    if (length) found.push([start, length]);
  }
  return found;
}
