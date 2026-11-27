/** The languages written right to left, where `Intl` can't tell (Firefox). */
const RTL_LANGUAGES = new Set([
  'ar',
  'arc',
  'ckb',
  'dv',
  'fa',
  'he',
  'iw',
  'ks',
  'ps',
  'sd',
  'syr',
  'ug',
  'ur',
  'yi',
]);

/**
 * A run of Arabic-Indic digits: with its grouping and decimal separators,
 * and what joins digits in one figure (`١:٢٣`, `٢٧/١١`) — the algorithm
 * keeps those inside the number.
 */
const ARABIC_INDIC_RUN =
  /[\u0660-\u0669](?:[\u0660-\u066C:/.,]*[\u0660-\u0669])?/g;

const LEFT_TO_RIGHT_MARK = '\u200E';

const directions = new Map<string, boolean>();

/** The locale's language written right to left (once per locale). */
function isRightToLeft(locale: string): boolean {
  let rtl = directions.get(locale);
  if (rtl === undefined) {
    rtl = readDirection(locale);
    directions.set(locale, rtl);
  }
  return rtl;
}

function readDirection(locale: string): boolean {
  const tag = new Intl.Locale(locale);
  const info =
    (
      tag as Intl.Locale & {
        getTextInfo?: () => { direction?: string };
        textInfo?: { direction?: string };
      }
    ).getTextInfo?.() ??
    (tag as Intl.Locale & { textInfo?: { direction?: string } }).textInfo;
  return info?.direction
    ? info.direction === 'rtl'
    : RTL_LANGUAGES.has(tag.language);
}

/**
 * Text with the user's Arabic-Indic digits, kept in order in a left-to-right
 * locale. To the bidi algorithm these digits are "Arabic numbers": what
 * stands between two runs of them (", ", " – ", " / ") is laid out right to
 * left — "Nov ٢٧, ٢٠٢٦" drawn "Nov ٢٠٢٦ ,٢٧". A left-to-right mark after each
 * run keeps it as written. Right to left, the text is already in order
 * (Unicode's own patterns carry their marks); Persian digits are European
 * numbers to the algorithm, Latin ones too: as they are.
 */
export function ɵkeepDigitOrder(locale: string, text: string): string {
  if (!text || !/[\u0660-\u0669]/.test(text) || isRightToLeft(locale))
    return text;
  return text.replace(ARABIC_INDIC_RUN, (run) => run + LEFT_TO_RIGHT_MARK);
}
