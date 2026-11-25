import type {
  ScEmojiData,
  ScEmojiDataCategory,
  ScEmojiDataEmoji,
  ScEmojiSkinTone,
} from './emoji-picker-types';

/**
 * Emoji data from Emojibase (the `emojibase-data` package, a peer of this
 * entry point): bundled with your app, each locale's a chunk of its own,
 * loaded the first time a picker needs it — no CDN, nothing to host, and the
 * data your app was built and tested with. The emojis this system can't draw
 * are left out.
 */

/** A locale's Emojibase data: its emojis and their names. */
type ScEmojibaseLoad = () => Promise<
  [{ default: unknown }, { default: unknown }]
>;

/**
 * Emojibase's locales, each loaded by its own imports: the bundler makes a
 * chunk of each, so an app only downloads the locales it shows. (Written out
 * one by one: a bundler can't split an import whose path is computed.)
 */
const EMOJIBASE_DATA: Record<string, ScEmojibaseLoad> = {
  bn: () =>
    Promise.all([
      import('emojibase-data/bn/data.json'),
      import('emojibase-data/bn/messages.json'),
    ]),
  da: () =>
    Promise.all([
      import('emojibase-data/da/data.json'),
      import('emojibase-data/da/messages.json'),
    ]),
  de: () =>
    Promise.all([
      import('emojibase-data/de/data.json'),
      import('emojibase-data/de/messages.json'),
    ]),
  'en-gb': () =>
    Promise.all([
      import('emojibase-data/en-gb/data.json'),
      import('emojibase-data/en-gb/messages.json'),
    ]),
  en: () =>
    Promise.all([
      import('emojibase-data/en/data.json'),
      import('emojibase-data/en/messages.json'),
    ]),
  'es-mx': () =>
    Promise.all([
      import('emojibase-data/es-mx/data.json'),
      import('emojibase-data/es-mx/messages.json'),
    ]),
  es: () =>
    Promise.all([
      import('emojibase-data/es/data.json'),
      import('emojibase-data/es/messages.json'),
    ]),
  et: () =>
    Promise.all([
      import('emojibase-data/et/data.json'),
      import('emojibase-data/et/messages.json'),
    ]),
  fi: () =>
    Promise.all([
      import('emojibase-data/fi/data.json'),
      import('emojibase-data/fi/messages.json'),
    ]),
  fr: () =>
    Promise.all([
      import('emojibase-data/fr/data.json'),
      import('emojibase-data/fr/messages.json'),
    ]),
  hi: () =>
    Promise.all([
      import('emojibase-data/hi/data.json'),
      import('emojibase-data/hi/messages.json'),
    ]),
  hu: () =>
    Promise.all([
      import('emojibase-data/hu/data.json'),
      import('emojibase-data/hu/messages.json'),
    ]),
  it: () =>
    Promise.all([
      import('emojibase-data/it/data.json'),
      import('emojibase-data/it/messages.json'),
    ]),
  ja: () =>
    Promise.all([
      import('emojibase-data/ja/data.json'),
      import('emojibase-data/ja/messages.json'),
    ]),
  ko: () =>
    Promise.all([
      import('emojibase-data/ko/data.json'),
      import('emojibase-data/ko/messages.json'),
    ]),
  lt: () =>
    Promise.all([
      import('emojibase-data/lt/data.json'),
      import('emojibase-data/lt/messages.json'),
    ]),
  ms: () =>
    Promise.all([
      import('emojibase-data/ms/data.json'),
      import('emojibase-data/ms/messages.json'),
    ]),
  nb: () =>
    Promise.all([
      import('emojibase-data/nb/data.json'),
      import('emojibase-data/nb/messages.json'),
    ]),
  nl: () =>
    Promise.all([
      import('emojibase-data/nl/data.json'),
      import('emojibase-data/nl/messages.json'),
    ]),
  pl: () =>
    Promise.all([
      import('emojibase-data/pl/data.json'),
      import('emojibase-data/pl/messages.json'),
    ]),
  pt: () =>
    Promise.all([
      import('emojibase-data/pt/data.json'),
      import('emojibase-data/pt/messages.json'),
    ]),
  ru: () =>
    Promise.all([
      import('emojibase-data/ru/data.json'),
      import('emojibase-data/ru/messages.json'),
    ]),
  sv: () =>
    Promise.all([
      import('emojibase-data/sv/data.json'),
      import('emojibase-data/sv/messages.json'),
    ]),
  th: () =>
    Promise.all([
      import('emojibase-data/th/data.json'),
      import('emojibase-data/th/messages.json'),
    ]),
  uk: () =>
    Promise.all([
      import('emojibase-data/uk/data.json'),
      import('emojibase-data/uk/messages.json'),
    ]),
  vi: () =>
    Promise.all([
      import('emojibase-data/vi/data.json'),
      import('emojibase-data/vi/messages.json'),
    ]),
  'zh-hant': () =>
    Promise.all([
      import('emojibase-data/zh-hant/data.json'),
      import('emojibase-data/zh-hant/messages.json'),
    ]),
  zh: () =>
    Promise.all([
      import('emojibase-data/zh/data.json'),
      import('emojibase-data/zh/messages.json'),
    ]),
};

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

/** The session's check of the emojis this system draws. */
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

/** The locale, if Emojibase has it — otherwise English. */
export function emojibaseLocale(locale: string): string {
  const lower = locale.toLowerCase();
  if (lower in EMOJIBASE_DATA) return lower;
  const language = lower.split('-')[0];
  return language in EMOJIBASE_DATA ? language : 'en';
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

/** Each locale's data, loaded once and shared by the pickers that need it. */
const loaded = new Map<string, Promise<ScEmojiData>>();

/** Emojibase's data for a locale, in the picker's shape. */
function loadEmojibaseData(locale: string): Promise<ScEmojiData> {
  let load = loaded.get(locale);
  if (!load) {
    load = EMOJIBASE_DATA[locale]().then(([emojis, messages]) =>
      toEmojiData(
        locale,
        emojis.default as ScEmojibaseEmoji[],
        messages.default as ScEmojibaseMessages,
      ),
    );
    // A failed load (offline) is tried again next time.
    load.catch(() => loaded.delete(locale));
    loaded.set(locale, load);
  }
  return load;
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
 * The picker's data for a locale, from Emojibase: without the emojis newer
 * than `emojiVersion` — by default, than the system draws.
 */
export async function loadEmojiData(
  locale: string,
  emojiVersion?: number | null,
): Promise<ScEmojiData> {
  const data = await loadEmojibaseData(emojibaseLocale(locale));
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
