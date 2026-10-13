/**
 * Numbers as the locale writes them: formatted with `Intl.NumberFormat`,
 * and read back from what was typed — the locale's digits (e.g. Arabic-Indic),
 * decimal and group separators, minus signs, and the currency / percent /
 * unit text the format adds.
 */

const formatters = new Map<string, Intl.NumberFormat>();

/** A cached formatter for a locale and options. */
export function numberFormatter(
  locale: string | undefined,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = `${locale ?? ''}|${JSON.stringify(options)}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.NumberFormat(locale, options);
    } catch (error) {
      // An unknown locale, currency or unit: plain numbers rather than none.
      console.warn(
        'scNumberField: invalid format, written as plain numbers.',
        error,
      );
      formatter = new Intl.NumberFormat();
    }
    formatters.set(key, formatter);
  }
  return formatter;
}

interface NumberSymbols {
  /** The locale's digits, 0 to 9. */
  digits: string[];
  decimal: string;
  group: string;
  /** Text the format adds (currency symbol, %, unit, spaces). */
  literals: string[];
  percent: boolean;
}

const symbolsCache = new Map<Intl.NumberFormat, NumberSymbols>();

function symbols(formatter: Intl.NumberFormat): NumberSymbols {
  let found = symbolsCache.get(formatter);
  if (found) return found;
  const { locale, numberingSystem, style } = formatter.resolvedOptions();
  const plain = new Intl.NumberFormat(locale, {
    numberingSystem,
    useGrouping: false,
  });
  const digits = Array.from({ length: 10 }, (_, i) => plain.format(i));
  const parts = new Intl.NumberFormat(locale, {
    numberingSystem,
    useGrouping: true,
    minimumFractionDigits: 1,
  }).formatToParts(-12345.6);
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
  const group = parts.find((p) => p.type === 'group')?.value ?? ',';
  // The format's text, in each of its forms ("45°", "45 deg", "45 degrees";
  // "$5", "US$5", "USD 5"), longest first so they're removed whole.
  const options = formatter.resolvedOptions();
  const variants: Intl.NumberFormatOptions[] = [options];
  if (options.style === 'unit') {
    for (const unitDisplay of ['short', 'narrow', 'long'] as const) {
      variants.push({ ...options, unitDisplay });
    }
  } else if (options.style === 'currency') {
    for (const currencyDisplay of [
      'symbol',
      'narrowSymbol',
      'code',
      'name',
    ] as const) {
      variants.push({ ...options, currencyDisplay });
    }
  }
  const literals = new Set<string>();
  for (const variant of variants) {
    let variantParts: Intl.NumberFormatPart[];
    try {
      variantParts = new Intl.NumberFormat(locale, variant).formatToParts(
        -1234.5,
      );
    } catch {
      continue;
    }
    for (const part of variantParts) {
      if (
        ['currency', 'percentSign', 'unit', 'literal', 'compact'].includes(
          part.type,
        )
      ) {
        literals.add(part.value.trim());
      }
    }
  }
  literals.delete('');
  found = {
    digits,
    decimal,
    group,
    literals: [...literals].sort((a, b) => b.length - a.length),
    percent: style === 'percent',
  };
  symbolsCache.set(formatter, found);
  return found;
}

const MINUS_SIGNS = /[-−﹣－]/;
const SPACES = /[\s\u00A0\u202F]/g;

/**
 * What was typed, as a number — null when empty, NaN when it isn't one.
 * A percent format reads "50 %" as 0.5.
 */
export function parseNumber(
  text: string,
  formatter: Intl.NumberFormat,
): number | null {
  const { digits, decimal, group, literals, percent } = symbols(formatter);
  let value = text;
  for (const literal of literals) value = value.split(literal).join('');
  value = value.replace(SPACES, '');
  if (!value) return null;
  const negative = MINUS_SIGNS.test(value) || /^\(.*\)$/.test(value);
  value = value
    .replace(new RegExp(MINUS_SIGNS.source, 'g'), '')
    .replace(/[()+]/g, '');
  // The other usual separator, once, not before 3 digits ("1234.5" in
  // German, "1,5" in English): a decimal separator, as React Aria reads it.
  if (!value.includes(decimal)) {
    const other = /^[^.,]*([.,])([^.,]*)$/.exec(value);
    if (other && other[2].length !== 3) {
      value = value.replace(other[1], decimal);
    }
  }
  // Grouping out, the decimal separator as a dot, the digits as ASCII.
  if (group) value = value.split(group).join('');
  value = value.split(decimal).join('.');
  value = value.replace(/./g, (char) => {
    const index = digits.indexOf(char);
    return index >= 0 ? String(index) : char;
  });
  if (!/^(\d+\.?\d*|\.\d+)$/.test(value)) return Number.NaN;
  const number = Number(value) * (negative ? -1 : 1);
  return percent ? number / 100 : number;
}

/** Whether a character can be part of a number in this format. */
export function isNumberCharacter(
  char: string,
  formatter: Intl.NumberFormat,
): boolean {
  const { digits, decimal, group, literals } = symbols(formatter);
  return (
    /[\d.,+()]/.test(char) ||
    MINUS_SIGNS.test(char) ||
    /[\s\u00A0\u202F]/.test(char) ||
    digits.includes(char) ||
    char === decimal ||
    char === group ||
    literals.some((literal) => literal.includes(char))
  );
}

/** How many decimals a number has (for steps like 0.1 + 0.2). */
export function decimalPlaces(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const [base, exponent] = value.toString().toLowerCase().split('e');
  const decimals = (base.split('.')[1] ?? '').length;
  return Math.max(0, decimals - (exponent ? Number(exponent) : 0));
}
