import type {
  ScEmojiData,
  ScEmojiDataCategory,
  ScEmojiDataEmoji,
  ScEmojiSkinTone,
} from './emoji-picker-types';

/**
 * Emoji data from Emojibase, as Frimousse loads it: fetched once per locale,
 * kept in `localStorage` (checked for updates once per session), with the
 * emojis this system can't draw left out.
 */

/** Where Emojibase's data is fetched from by default. */
export const SC_EMOJIBASE_URL = 'https://cdn.jsdelivr.net/npm/emojibase-data';

/** The locales Emojibase has data for. */
const EMOJIBASE_LOCALES = [
  'bn',
  'da',
  'de',
  'en-gb',
  'en',
  'es-mx',
  'es',
  'et',
  'fi',
  'fr',
  'hi',
  'hu',
  'it',
  'ja',
  'ko',
  'lt',
  'ms',
  'nb',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'th',
  'uk',
  'vi',
  'zh-hant',
  'zh',
];

/** Emojis are drawn with these fonts (the system's colour emoji font). */
export const SC_EMOJI_FONT_FAMILY =
  "'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Android Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', EmojiSymbols, sans-serif";

/** Skin tones, in Emojibase's order (its `tone` 1–5). */
export const SC_EMOJI_SKIN_TONES: ScEmojiSkinTone[] = [
  'none',
  'light',
  'medium-light',
  'medium',
  'medium-dark',
  'dark',
];

const STORAGE_KEY = 'sc-emoji-picker';

interface ScEmojibaseEmoji {
  emoji: string;
  label: string;
  group?: number;
  subgroup?: number;
  order?: number;
  tags?: string[];
  version: number;
  skins?: { emoji: string; tone?: number | number[] }[];
}

interface ScEmojibaseMessages {
  groups: { key: string; message: string; order: number }[];
  subgroups: { key: string; message: string; order: number }[];
  skinTones: { key: string; message: string }[];
}

interface ScEmojiPickerCachedData {
  etags: [string | null, string | null];
  data: ScEmojiData;
}

/** The locale, if Emojibase has it — otherwise English. */
export function emojibaseLocale(locale: string): string {
  const lower = locale.toLowerCase();
  if (EMOJIBASE_LOCALES.includes(lower)) return lower;
  const language = lower.split('-')[0];
  return EMOJIBASE_LOCALES.includes(language) ? language : 'en';
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function readStorage<T>(storage: () => Storage, key: string): T | null {
  try {
    const value = storage().getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage(storage: () => Storage, key: string, value: unknown) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Full or unavailable: it's only a cache.
  }
}

/** Emojibase's data, in the picker's shape. */
function toEmojiData(
  locale: string,
  emojis: ScEmojibaseEmoji[],
  messages: ScEmojibaseMessages,
): ScEmojiData {
  const flags = new Set(
    messages.subgroups
      .filter((s) => s.key === 'country-flag' || s.key === 'subdivision-flag')
      .map((s) => s.order),
  );
  const categories: ScEmojiDataCategory[] = messages.groups
    .filter((group) => group.key !== 'component')
    .map((group) => ({
      index: group.order,
      key: group.key,
      label: capitalize(group.message),
    }));
  const skinTones: ScEmojiData['skinTones'] = {};
  for (const tone of messages.skinTones) {
    skinTones[tone.key as Exclude<ScEmojiSkinTone, 'none'>] = capitalize(
      tone.message,
    );
  }
  const list: ScEmojiDataEmoji[] = [];
  for (const emoji of [...emojis].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  )) {
    // Skin tone modifiers and other components aren't picked on their own.
    if (emoji.group === undefined || emoji.group === 2) continue;
    let skins: ScEmojiDataEmoji['skins'];
    for (const skin of emoji.skins ?? []) {
      if (typeof skin.tone !== 'number') continue;
      const tone = SC_EMOJI_SKIN_TONES[skin.tone];
      if (tone && tone !== 'none') (skins ??= {})[tone] = skin.emoji;
    }
    list.push({
      emoji: emoji.emoji,
      label: capitalize(emoji.label),
      category: emoji.group,
      tags: emoji.tags ?? [],
      version: emoji.version,
      ...(emoji.subgroup !== undefined &&
        flags.has(emoji.subgroup) && { countryFlag: true }),
      ...(skins && { skins }),
    });
  }
  return { locale, emojis: list, categories, skinTones };
}

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal,
): Promise<{ json: T; etag: string | null }> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return {
    json: (await response.json()) as T,
    etag: response.headers.get('etag'),
  };
}

async function fetchEtag(url: string, signal?: AbortSignal) {
  try {
    return (await fetch(url, { method: 'HEAD', signal })).headers.get('etag');
  } catch {
    return null;
  }
}

/** One load per data set at a time, shared by the pickers that need it. */
const pending = new Map<string, Promise<ScEmojiData>>();

/** Emojibase's data for a locale: cached, revalidated once per session. */
function loadEmojibaseData(
  baseUrl: string,
  locale: string,
): Promise<ScEmojiData> {
  const key = `${STORAGE_KEY}/${baseUrl}/${locale}`;
  let load = pending.get(key);
  if (!load) {
    load = readEmojibaseData(baseUrl, locale, key).finally(() =>
      pending.delete(key),
    );
    pending.set(key, load);
  }
  return load;
}

async function readEmojibaseData(
  baseUrl: string,
  locale: string,
  key: string,
): Promise<ScEmojiData> {
  const emojisUrl = `${baseUrl}/${locale}/data.json`;
  const messagesUrl = `${baseUrl}/${locale}/messages.json`;
  const sessionKey = `${STORAGE_KEY}/revalidated`;
  const revalidated =
    readStorage<string[]>(() => sessionStorage, sessionKey) ?? [];
  const cached = readStorage<ScEmojiPickerCachedData>(() => localStorage, key);

  if (cached) {
    if (revalidated.includes(key)) return cached.data;
    // Unchanged since cached? (If the check fails, the cache will do.)
    const etags = await Promise.all([
      fetchEtag(emojisUrl),
      fetchEtag(messagesUrl),
    ]);
    const unchanged =
      !etags[0] ||
      !etags[1] ||
      (etags[0] === cached.etags[0] && etags[1] === cached.etags[1]);
    if (unchanged) {
      writeStorage(() => sessionStorage, sessionKey, [...revalidated, key]);
      return cached.data;
    }
  }

  const [emojis, messages] = await Promise.all([
    fetchJson<ScEmojibaseEmoji[]>(emojisUrl),
    fetchJson<ScEmojibaseMessages>(messagesUrl),
  ]);
  const data = toEmojiData(locale, emojis.json, messages.json);
  writeStorage(() => localStorage, key, {
    etags: [emojis.etag, messages.etag],
    data,
  } satisfies ScEmojiPickerCachedData);
  writeStorage(() => sessionStorage, sessionKey, [...revalidated, key]);
  return data;
}

let context: CanvasRenderingContext2D | null | undefined;

/**
 * Whether the system draws this emoji (not as boxes or separate emojis):
 * an emoji has its own colours, so it looks the same drawn in blue or red.
 */
export function isEmojiSupported(emoji: string): boolean {
  const size = 2;
  try {
    context ??= document
      .createElement('canvas')
      .getContext('2d', { willReadFrequently: true });
  } catch {
    context = null;
  }
  if (!context) return false;
  context.canvas.width = size;
  context.canvas.height = size;
  context.font = `2px ${SC_EMOJI_FONT_FAMILY}`;
  context.textBaseline = 'middle';
  // An unsupported sequence is drawn as several emojis: wider.
  if (context.measureText(emoji).width >= size * 2) return false;
  context.fillStyle = '#00f';
  context.fillText(emoji, 0, 0);
  const blue = context.getImageData(0, 0, size, size).data;
  context.clearRect(0, 0, size, size);
  context.fillStyle = '#f00';
  context.fillText(emoji, 0, 0);
  const red = context.getImageData(0, 0, size, size).data;
  for (let i = 0; i < blue.length; i += 4) {
    if (
      blue[i] !== red[i] ||
      blue[i + 1] !== red[i + 1] ||
      blue[i + 2] !== red[i + 2]
    ) {
      return false;
    }
  }
  return true;
}

interface ScEmojiSupport {
  version: number;
  countryFlags: boolean;
}

/** The newest Emoji version this system draws (checked once per session). */
function emojiSupport(emojis: ScEmojiDataEmoji[]): ScEmojiSupport {
  const sessionKey = `${STORAGE_KEY}/support`;
  const known = readStorage<ScEmojiSupport>(() => sessionStorage, sessionKey);
  if (known) return known;
  const byVersion = new Map<number, string>();
  for (const emoji of emojis) {
    if (!byVersion.has(emoji.version))
      byVersion.set(emoji.version, emoji.emoji);
  }
  const versions = [...byVersion.keys()].sort((a, b) => b - a);
  const version =
    versions.find((v) => isEmojiSupported(byVersion.get(v) as string)) ??
    versions[0] ??
    0;
  const support = { version, countryFlags: isEmojiSupported('🇪🇺') };
  writeStorage(() => sessionStorage, sessionKey, support);
  return support;
}

/**
 * The picker's data for a locale, from Emojibase at `baseUrl`: without the
 * emojis newer than `emojiVersion` — by default, than the system draws.
 */
export async function loadEmojiData(
  locale: string,
  baseUrl = SC_EMOJIBASE_URL,
  emojiVersion?: number | null,
): Promise<ScEmojiData> {
  const data = await loadEmojibaseData(
    baseUrl.replace(/\/$/, ''),
    emojibaseLocale(locale),
  );
  const support = emojiSupport(data.emojis);
  const version = emojiVersion ?? support.version;
  return {
    ...data,
    emojis: data.emojis.filter(
      (emoji) =>
        emoji.version <= version &&
        // Windows has no flags: they'd show as letters.
        (!emoji.countryFlag || support.countryFlags),
    ),
  };
}

const ZWJ = '‍';
const MODIFIER_BASE = /\p{Emoji_Modifier_Base}/u;
const SKIN_TONE_MODIFIERS = /[\u{1F3FB}-\u{1F3FF}]/gu;
const MODIFIERS: Record<Exclude<ScEmojiSkinTone, 'none'>, string> = {
  light: '\u{1F3FB}',
  'medium-light': '\u{1F3FC}',
  medium: '\u{1F3FD}',
  'medium-dark': '\u{1F3FE}',
  dark: '\u{1F3FF}',
};

/** An emoji in a skin tone (itself if it has none), as Frimousse does. */
export function skinToneVariation(
  emoji: string,
  skinTone: ScEmojiSkinTone,
): string {
  const segments = emoji.split(ZWJ);
  if (!segments.some((segment) => MODIFIER_BASE.test(segment))) return emoji;
  const base = segments.map((segment) =>
    segment.replace(SKIN_TONE_MODIFIERS, ''),
  );
  if (skinTone === 'none') return base.join(ZWJ);
  return base
    .map((segment) =>
      // 🤝 isn't toned within a sequence (🧑‍🤝‍🧑).
      !MODIFIER_BASE.test(segment) || (base.length > 1 && segment === '🤝')
        ? segment
        : segment.replace(/️$/, '') + MODIFIERS[skinTone],
    )
    .join(ZWJ);
}
